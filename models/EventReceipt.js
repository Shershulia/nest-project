import {model, Schema,models} from "mongoose";

const EventReceiptSchema = new Schema({
    description:String,
    date:Date,
    amount:{
        type: Number,
        required: true
    },
    contactPerson:String,
    paid:Boolean,

});
export const EventReceipt = models?.EventReceipt || model('EventReceipt',EventReceiptSchema)