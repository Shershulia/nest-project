import {Settings} from "@/models/Settings";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    try {
        await mongooseConnect();
        await isAdminRequest(req,res);

        if (req.method==='PUT'){
            const {_id ,images} = req.body;
            await Settings.updateOne({_id},{images: images})
            res.json({_id ,images});
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}