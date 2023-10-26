import {Admin} from "@/models/Admin";
import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    try {


        await mongooseConnect();
        await isAdminRequest(req,res);


        if (req.method === "POST") {
            const {email} = req.body;
            if(await Admin.findOne({email})){
                res.state(400).json({message:'already exsists!'})
            }else {
                res.json(await Admin.create({email}));
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}