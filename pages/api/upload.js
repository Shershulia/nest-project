import multiparty from "multiparty"
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3"
import fs from "fs"
import mime from "mime-types"


const bucketName = "nest-test-next"

export default async function handle(req,res){
    const form = new multiparty.Form();
    const {fields,files} = await new Promise((resolve,reject)=>{
        form.parse(req,async (err,fields, files)=>{
            if (err) reject(err);
            resolve({fields, files})
        })
    })

    const client = new S3Client({
        region:"eu-north-1",
        credentials:{
            accessKeyId:process.env.S3_ACCESS_KEY,
            secretAccessKey:process.env.S3_SECRET_KEY,
        }
    })
    const links = []
    for (const file of files.file){
        const extension = file.originalFilename.split(".").pop();

        const newFileName = ((extension==="pdf") || (extension==="doc") || (extension==="docx"))
            ?
            file.originalFilename
            :
            Date.now() + "." + extension;
        await client.send(new PutObjectCommand({
            Bucket:bucketName,
            Key:newFileName,
            Body: fs.readFileSync(file.path),
            ACL:"public-read",
            ContentType:mime.lookup(file.path),

        }))
        const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`
        links.push(link)
    }

    return res.json({links})



}
//We want to parse req ourselves
export const config = {
    api: {bodyParser: false}
}