import {mongooseConnect} from "@/lib/mongoose";
import {Event} from "@/models/Event";

export default async function handler(req, res) {
    try {

        await mongooseConnect();

        if (req.method==='GET'){
            const {search} = req.query;
            const events = await Event.find({ name: { $regex: new RegExp(search, 'i') } })
                .sort({ date: 'asc' })
                .limit(10);
            ;
            res.json(events)
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}