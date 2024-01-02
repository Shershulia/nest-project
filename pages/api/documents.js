import {mongooseConnect} from "@/lib/mongoose";
import {MeetingDocument} from "@/models/MeetingDocument";

export default async function handler(req, res) {
    try {

        await mongooseConnect();

        if (req.method === 'GET') {
            const {search} = req.query;
            let query = {title: {$regex: new RegExp(search, 'i')}};

            const documents = await MeetingDocument.find(query).sort({date: 'desc'}).limit(10);
            res.json(documents);

        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}