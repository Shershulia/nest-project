import {mongooseConnect} from "@/lib/mongoose";
import {Event} from "@/models/Event"
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
export default async function handler(req, res) {
    try {

        await mongooseConnect();

        const {user} = await getServerSession(req,res,authOptions);
        if (req.method==='PUT'){
            const {_id,numberOfPeople,participants,flag} = req.body;
            if(flag==="a"){
                const newParticipants =[...participants,user.email]
                if ((newParticipants.length>=numberOfPeople) || newParticipants.includes(user.email)){
                    res.json(false)
                }
                await Event.updateOne({_id},{participants:newParticipants})
                res.json(true);
            }else {
                const newParticipants = participants.filter(e => e !== user.email);
                await Event.updateOne({_id},{participants:newParticipants})
                res.json(true)
            }

        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}