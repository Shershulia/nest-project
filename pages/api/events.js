import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import {Event} from "@/models/Event"
import {Admin} from "@/models/Admin";
import {Receipt} from "@/models/Receipt";
export default async function handler(req, res) {
    try {

        await mongooseConnect();
        await isAdminRequest(req,res);

        if (req.method==="POST"){
            const {name, description,date,contactPerson,place,price,numberOfPeople,images} = req.body;
                await Receipt.create({description:"Test paid",date:new Date(),amount:50,contactPerson:"krol31072002@gmail.com",paid:true,files:[]})
                res.json(await Event.create({name, description,date,contactPerson,place,price,numberOfPeople,images}));
        }
        if (req.method === "GET") {
            res.json(await Event.find());
        }
        if (req.method==="DELETE"){
            res.json(await Event.deleteOne({_id:req.query?.id}))
        }
        if (req.method==='PUT'){
            const {_id,name, description,date,contactPerson,place,price,numberOfPeople,images} = req.body;
            await Event.updateOne({_id},{name, description,date,contactPerson,place,price,numberOfPeople,images})
            res.json(true);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}