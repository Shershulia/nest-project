import {Admin} from "@/models/Admin";
import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req,res,authOptions);


        await mongooseConnect();

        if (req.method === "GET") {
            res.status(200).json("created");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}