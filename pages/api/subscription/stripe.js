import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Settings} from "@/models/Settings";
import {Receipt} from "@/models/Receipt";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
    try {

        await mongooseConnect();

        const {user} = await getServerSession(req,res,authOptions);
        if (req.method==='GET'){
            const subscription = await Settings.findOne({name:'subscription'});
            const {value : subscriptionPrice} = subscription;
                if(subscriptionPrice){
                    const line_items = [{quantity:1,
                        price_data:{
                            currency:"NOK",
                            product_data: {name:"Monthly subscription"},
                            unit_amount:subscriptionPrice*100,
                        }}]
                    const eventReceiptDoc = await Receipt.create({
                        description: `Subscription of ${user.email} with Vipps`,
                        date: new Date(),
                        amount: subscriptionPrice,
                        contactPerson:user.email,
                        paid:false
                    })
                    const session = await stripe.checkout.sessions.create({
                        line_items,
                        mode:"payment",
                        customer_email:user.email,
                        success_url: `${process.env.NEXT_PUBLIC_INTERNAL_URI}/account?success=true`,
                        cancel_url: `${process.env.NEXT_PUBLIC_INTERNAL_URI}/account?success=false`,
                        metadata:{
                            receiptId: eventReceiptDoc._id.toString(),
                            type:"subscription",
                        }
                    })
                    res.json({
                        url:session.url,
                    });
                }
            }else {
            res.json("Should be a GET request")
        }
        }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}