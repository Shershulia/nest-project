import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import {MeetingDocument} from "@/models/MeetingDocument";
export default async function handler(req, res) {
    try {

        await mongooseConnect();
        await isAdminRequest(req,res);

        if (req.method==="POST"){
            const {title, description,date,documents} = req.body;

            res.json(await MeetingDocument.create({title, description,date, documents }));
        }
        if (req.method === "GET") {
            res.json(await MeetingDocument.find());
        }
        if (req.method==="DELETE"){
            res.json(await MeetingDocument.deleteOne({_id:req.query?.id}))
        }
        if (req.method==='PUT'){
            const {_id,title, description,date,documents} = req.body;
            await MeetingDocument.updateOne({_id},{title, description,date,documents})
            res.json(true);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}