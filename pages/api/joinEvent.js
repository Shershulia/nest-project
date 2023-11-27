import {mongooseConnect} from "@/lib/mongoose";
import {Event} from "@/models/Event"
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Receipt} from "@/models/Receipt";
import {EventReceipt} from "@/models/EventReceipt";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
    try {

        await mongooseConnect();

        const {user} = await getServerSession(req,res,authOptions);
        if (req.method==='POST'){
            const {event,flag} = req.body;
            const {_id,numberOfPeople,price,name,participants} = event
            if(flag==="a"){
                const newParticipants =[...participants,user.email]
                if ((participants.length>=numberOfPeople) || participants.includes(user.email)){
                    res.json(false)
                }
             //   const updatedEvent = await Event.updateOne({_id},{participants:newParticipants})
                const line_items = [{quantity:1,
                        price_data:{
                            currency:"NOK",
                            product_data: {name:name},
                            unit_amount:price*100,
                        }}]
                const eventReceiptDoc = await EventReceipt.create({
                    description: `Payment for event ${name}`,
                    date: new Date(),
                    amount: price,
                    contactPerson:user.email,
                    paid:false
                })
                const session = await stripe.checkout.sessions.create({
                    line_items,
                    mode:"payment",
                    customer_email:user.email,
                    success_url:process.env.NEXT_PUBLIC_INTERNAL_URI,
                    cancel_url: process.env.NEXT_PUBLIC_INTERNAL_URI,
                    metadata:{
                        receiptId: eventReceiptDoc._id.toString()
                    }
                })
                res.json({
                    url:session.url,
                });
            }else {
                const newParticipants = participants.filter(e => e !== user.email);
                await Event.updateOne({_id},{participants:newParticipants})
                res.json(true)
            }

        } else {
            res.json("Should be a POST request")

        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}