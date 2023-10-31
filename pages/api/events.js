import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import {Event} from "@/models/Event"
export default async function handler(req, res) {
    try {


        await mongooseConnect();
        await isAdminRequest(req,res);

        if (req.method==="POST"){
            const {name, description,date,contactPerson,place,price,numberOfPeople,images} = req.body;
            res.json(await Event.create({name, description,date,contactPerson,place,price,numberOfPeople,images}));


        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}