import axios from "axios";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Receipt} from "@/models/Receipt";
import {User} from "@/models/User";

export default async function handler(req, res) {
    try{
        const {user} = await getServerSession(req,res,authOptions);

        if (req.method === 'GET') {

            const token = await axios.post(
                'https://apitest.vipps.no/accessToken/get',
                '',
                {
                    headers: {
                        'client_id': process.env.VIPPS_CLIENT_ID,
                        'client_secret':  process.env.VIPPS_CLIENT_SECRET,
                        'Ocp-Apim-Subscription-Key':  process.env.VIPPS_SUBSCRIPTION_KEY,
                        'Merchant-Serial-Number': process.env.VIPPS_MERCHANT_SERIAL_NUMBER,
                        'Vipps-System-Name': 'acme',
                        'Vipps-System-Version': '3.1.2',
                        'Vipps-System-Plugin-Name': 'acme-webshop',
                        'Vipps-System-Plugin-Version': '4.5.6',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            const searchString = `Subscription of ${user.email} `;
            const receiptBefore = await Receipt.findOne({
                description: { $regex: new RegExp(searchString), $options: 'i' }, // Case-insensitive search
                paid: false
            });
            if (!receiptBefore){
                res.json(false)
            }
            const reference = receiptBefore.description.split("Ref: ")[1];
            const response = await axios.get(
                `https://apitest.vipps.no/epayment/v1/payments/${reference}/events`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`Bearer ${token.data.access_token}`,
                        'Ocp-Apim-Subscription-Key':  process.env.VIPPS_SUBSCRIPTION_KEY,
                        'Merchant-Serial-Number': process.env.VIPPS_MERCHANT_SERIAL_NUMBER,
                    }
                }
            ).catch(err=>{
                console.log(err.response.data)
            });
            if(response.data.some(item => item.name.includes("AUTHORIZED"))){
                await Receipt.findByIdAndUpdate(receiptBefore._id, { paid: true });
                res.json(await User.findOneAndUpdate({ email: user.email },
                    { $set: { subscription: new Date() } }));
            }
            res.json(response.data.some(item => item.name.includes("AUTHORIZED")))

        }else {
            res.json("Should be a POST request")

        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}