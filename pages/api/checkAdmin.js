import {Admin} from "@/models/Admin";
import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import {User} from "@/models/User";
import {checkIfUserIsAdmin} from "@/utils/adminUtils";

export default async function handler(req, res) {
    try {


        await mongooseConnect();
        const session = await getServerSession(req, res, authOptions);


        if (req.method === "GET") {
            const admins = await Admin.find({}, { email: 1 });
            res.json(await checkIfUserIsAdmin(session.user.email, admins))
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}