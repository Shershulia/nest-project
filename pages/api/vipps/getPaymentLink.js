import axios from "axios";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import createIdempotencyKey from "@/utils/createIdempotencyKey";
import {Receipt} from "@/models/Receipt";

export default async function handler(req, res) {
    try{
        const {user} = await getServerSession(req,res,authOptions);

        if (req.method === 'POST') {
            const {event} = req.body;
            const {_id,numberOfPeople,price,name,participants} = event

            const idempotencyKey = createIdempotencyKey(user.email,_id);

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
            )
            const nowDate = new Date();
            const originalString = `${nowDate.getMinutes()}-${nowDate.getSeconds()}-${nowDate.getMilliseconds()}-${user.email.split("@")[0]}`;
            const response = await axios.post(
                'https://apitest.vipps.no/epayment/v1/payments',
                {
                    'amount': {
                        'currency': 'NOK',
                        'value': price * 100
                    },
                    'paymentMethod': {
                        'type': 'WALLET'
                    },
                    'reference': `${originalString.substring(0,45)}`,
                    'returnUrl': `${process.env.NEXT_PUBLIC_INTERNAL_URI}/events/${_id}?check=true`,
                    'userFlow': 'WEB_REDIRECT',
                    'paymentDescription': `Event ${name}, Nickname ${user.email} `
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`Bearer ${token.data.access_token}`,
                        'Ocp-Apim-Subscription-Key':  process.env.VIPPS_SUBSCRIPTION_KEY,
                        'Merchant-Serial-Number': process.env.VIPPS_MERCHANT_SERIAL_NUMBER,
                        'Idempotency-Key': `${idempotencyKey}`
                    }
                }
            ).catch(err=>{
                console.log(err.response.data)
            });
            // Find unpaid receipt with a description containing the specified string
            const searchString = `Vipps Event ${name}, Nickname ${user.email} `;
            const receiptBefore = await Receipt.findOne({
                description: { $regex: new RegExp(searchString), $options: 'i' }, // Case-insensitive search
                paid: false
            });
            if (receiptBefore){
                await Receipt.findByIdAndUpdate(receiptBefore._id,
                    {description: `Vipps Event ${name}, Nickname ${user.email}. Ref:${originalString.substring(0,45)}`,
                        date: new Date(),
                        amount: price})
            }else {
                await Receipt.create({
                    description: `Vipps Event ${name}, Nickname ${user.email}. Ref:${originalString.substring(0,45)}`,
                    date: new Date(),
                    amount: price,
                    contactPerson:user.email,
                    paid:false
                })
            }

            res.json(response.data.redirectUrl)

        }else {
            res.json("Should be a POST request")

        }

    }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error" });
    }
}