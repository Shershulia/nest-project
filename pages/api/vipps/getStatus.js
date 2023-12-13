import axios from "axios";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import createIdempotencyKey from "@/utils/createIdempotencyKey";

export default async function handler(req, res) {
    try{
        const {user} = await getServerSession(req,res,authOptions);

        if (req.method === 'GET') {

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
                    'returnUrl': `${process.env.NEXT_PUBLIC_INTERNAL_URI}/events/${_id}`,
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