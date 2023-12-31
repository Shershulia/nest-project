import {Admin} from "@/models/Admin";
import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {NotificationSuggestion} from "@/models/NotificationSuggestion";

export default async function handler(req, res) {
    try {


        await mongooseConnect();

        const {user} = await getServerSession(req,res,authOptions);
        if (req.method === "POST") {
            const {text} = req.body;
            res.json(await NotificationSuggestion.create({text:text,email:user.email}));
        }
        if (req.method === "GET") {
            res.json(await NotificationSuggestion.find());
        }
        if (req.method === "DELETE") {
            console.log(req.query?.id)
            res.json(await NotificationSuggestion.deleteOne({_id:req.query?.id}));
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}