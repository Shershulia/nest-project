import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import {PaymentConfirmation} from "@/models/PaymentConfirmation";
import receiptModal from "@/components/adminReceiptPage/ReceiptModal";
import {Receipt} from "@/models/Receipt";

export default async function handler(req, res) {
    try {

        await mongooseConnect();
        await isAdminRequest(req, res);

        if (req.method === "POST") {
            const {orderId, files} = req.body;
            await PaymentConfirmation.create({orderId, files})
            await Receipt.updateOne({_id: orderId}, {paid:true})
            res.json(true);
        }
        if (req.method === 'GET') {
            const id = req.query?.id;

            res.json(await PaymentConfirmation.findOne({orderId:id}));
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}