import {Settings} from "@/models/Settings";

export default async function handler(req, res) {
    try {
        if (req.method==='PUT'){
            const {_id,value} = req.body;
            res.json(await Settings.updateOne({_id},{value:value}));
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}