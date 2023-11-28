import {mongooseConnect} from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from "micro";
import {EventReceipt} from "@/models/EventReceipt";
import {Event} from  "@/models/Event";
const endpointSecret = "whsec_1b8e3daaa245372703c900a53881fceb7d89e2aa4506fac56c67abac57fce889";

export default async function handler(req,res){
    await mongooseConnect();

    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const data = event.data.object;
            const receiptId= data.metadata.receiptId;
            const eventId= data.metadata.eventId;
            console.log(data);
            const paid = data.payment_status === "paid";
            if(receiptId && paid && eventId){
                await EventReceipt.findByIdAndUpdate(receiptId,{
                    paid:true
                })
                const event = await Event.findById(eventId)
                await Event.findByIdAndUpdate(eventId,{participants:[...event.participants,data.customer_email]})

            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).json("ok")
}

export const config = {
    api:{bodyParser: false}
}