import axios from "axios";

export default async function handler(req, res) {
    try{

        if (req.method === 'POST') {
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
            console.log(token)
            const response = await axios.post(
                'https://apitest.vipps.no/epayment/v1/payments',
                {
                    'amount': {
                        'currency': 'NOK',
                        'value': 100
                    },
                    'paymentMethod': {
                        'type': 'WALLET'
                    },
                    'customer': {
                        'phoneNumber': '4796221395'
                    },
                    'reference': 'acme-shop-123-order123abc',
                    'returnUrl': 'https://yourwebsite.come/redirect?reference=abcc123',
                    'userFlow': 'WEB_REDIRECT',
                    'paymentDescription': 'One pair of socks'
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`Bearer ${token.data.access_token}`,
                        'Ocp-Apim-Subscription-Key':  process.env.VIPPS_SUBSCRIPTION_KEY,
                        'Merchant-Serial-Number': process.env.VIPPS_MERCHANT_SERIAL_NUMBER,
                        'Vipps-System-Name': 'acme',
                        'Vipps-System-Version': '3.1.2',
                        'Vipps-System-Plugin-Name': 'acme-webshop',
                        'Vipps-System-Plugin-Version': '4.5.6',
                        'Idempotency-Key': '49ca711a-acee-4d01-993b-9487112e1def'
                    }
                }
            );
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