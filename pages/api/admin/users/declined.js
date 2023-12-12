import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import {User} from "@/models/User";

export default async function handler(req, res) {
    try {
        await mongooseConnect();
        await isAdminRequest(req,res);


        if (req.method === "GET") {
            res.json(await User.find({ emailVerified: /declined/ }));
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}