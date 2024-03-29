import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import {User} from "@/models/User";

export default async function handler(req, res) {
    try {
        await mongooseConnect();
        await isAdminRequest(req,res);


        if (req.method === "GET") {
            res.json(await User.find({ emailVerified: "confirmed" }));
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}