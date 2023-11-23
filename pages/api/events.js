import {mongooseConnect} from "@/lib/mongoose";
import {Event} from "@/models/Event";

export default async function handler(req, res) {
    try {

        await mongooseConnect();

        if (req.method === 'GET') {
            try {
                const {search, before, freePlacesFlag} = req.query;
                let query = {name: {$regex: new RegExp(search, 'i')}};

                if (before==="true") {
                    // If 'before' is true, return events before today
                    query.date = {$lt: new Date()};
                } else {
                    // If 'before' is false, return events after now
                    query.date = {$gte: new Date()};
                }
                if (freePlacesFlag === 'true') {
                    // If 'freePlacesFlag' is true, add a condition for available places
                    query.$expr = { $lt: ["$participants.length", "$numberOfPeople"] };
                }


                const events = await Event.find(query).sort({date: 'asc'}).limit(10);
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