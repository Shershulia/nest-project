import {mongooseConnect} from "@/lib/mongoose";
import {Settings} from "@/models/Settings";

export default async function handler(req, res) {
    try {

        await mongooseConnect();

        if (req.method==="GET"){
            res.json(await Settings.find())

        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}