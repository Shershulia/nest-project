import {mongooseConnect} from "@/lib/mongoose";
import {Event} from "@/models/Event";

export default async function handler(req, res) {
    try {

        await mongooseConnect();

        if (req.method === 'GET') {
            try {
                    const events = await Event.find();
                    res.json(events);
            } catch (error) {
                // Handle any errors that may occur during database query or processing
                console.error(error);
                res.status(500).json({error: 'Internal Server Error'});
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}