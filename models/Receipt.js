import {model, Schema,models} from "mongoose";

const ReceiptSchema = new Schema({
    description:String,
    date:Date,
    amount:{
        type: Number,
        required: true
    },
    contactPerson:String,
    paid:Boolean,
    files:[{
        type: String
    }],
}, {
    timestamps:true,
});
export const Receipt = models?.Receipt || model('Receipt',ReceiptSchema)