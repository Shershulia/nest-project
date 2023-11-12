import mongoose, {model, Schema,models} from "mongoose";

const PaymentConfirmationSchema = new Schema({
    description:String,
    orderId:{
        type:mongoose.Types.ObjectId,
        ref:'Receipt'
    },
    files:[{
        type: String
    }],
}, {
    timestamps:true,
});
export const PaymentConfirmation = models?.PaymentConfirmation || model('PaymentConfirmation',PaymentConfirmationSchema)