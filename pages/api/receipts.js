import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import {Receipt} from "@/models/Receipt";

export default async function handler(req, res) {
    try {

        await mongooseConnect();
        await isAdminRequest(req,res);

        if (req.method === "GET") {
            const paid = req.query?.nav;
            if(paid === "confirmed"){
                res.json(await Receipt.find({paid:true}));
            }else if (paid === "all"){
                res.json(await Receipt.find());
            }else{
                res.json(await Receipt.find({paid:false}));
            }

        }
        if (req.method==="DELETE"){
            res.json(await Receipt.deleteOne({_id:req.query?.id}))
        }
        if (req.method==='PUT'){
            const {_id,name, description,date,contactPerson,place,price,numberOfPeople,images} = req.body;
            await Receipt.updateOne({_id},{name, description,date,contactPerson,place,price,numberOfPeople,images})
            res.json(true);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}