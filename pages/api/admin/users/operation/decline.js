import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import {User} from "@/models/User";

export default async function handler(req, res) {
    try {
        await mongooseConnect();
        await isAdminRequest(req,res);


        if (req.method === "POST") {
            const{email,reason} = req.body;
            return res.json(await User.findOneAndUpdate(
                { email: email },
                { $set: { emailVerified: `declined:${reason}` } },
                { returnDocument: "after" }
            ));
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}