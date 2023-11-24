import {Admin} from "@/models/Admin";
import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import {User} from "@/models/User";

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
        if (req.method === "GET") {
            res.json(await Admin.find({}, { email: 1 }));
        }
        if (req.method === "DELETE") {
            res.json(await Admin.deleteOne({_id:req.query?.id}));
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}