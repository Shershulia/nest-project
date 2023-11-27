export default function handler(req,res){
    if(req.method!=="POST"){
        res.json("Should be a POST request")
    }
    const {email} = req.body;


}