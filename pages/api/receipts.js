import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {NotificationSuggestion} from "@/models/NotificationSuggestion";
import {Receipt} from "@/models/Receipt";

export default async function handler(req, res) {
    try {


        await mongooseConnect();

        const {user} = await getServerSession(req,res,authOptions);
        if (req.method === "POST") {
            const {description,amount,images} = req.body;
            res.json(await Receipt.create({description,date:new Date(),
                amount,contactPerson:user.email,
                paid:false,files:images}));
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}