import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { User } from "@/models/User";

export default async function handler(req, res) {
    try {
        await mongooseConnect();
        const session = await getServerSession(req, res, authOptions);

        if (req.method === "GET") {
            if (session) {
                    return res.json(await User.findOneAndUpdate(
                        { email: session.user.email },
                        { $set: { subscription: new Date() } },
                        { returnDocument: "after" }
                ));
            } else {
                return res.json(false);
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}
