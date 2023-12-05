import {drive, GoogleDrive} from "@/utils/googleDriveApi";
import multiparty from "multiparty";
import fs from "fs";


async function uploadFile(file) {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: file.originalFilename,
                mimeType: "application/msword",
            },
            media: {
                mimeType: "application/msword",
                body: fs.createReadStream(file.path),
            },
        });
        return response;
    } catch (e) {
        console.log(e.message);
    }
}

export async function generatePublicUrl(fileId){
    try{
        await drive.permissions.create({
            fileId:fileId,
            requestBody:{
                role:"reader",
                type:"anyone"
            }
        })
        const result = await drive.files.get({
            fileId:fileId,
            fields: "webViewLink"
        })
        return result.data.webViewLink
    }catch (e){
        console.log(e.message)
    }
}

export default async function handler(req, res) {
    try {
        if (req.method==="GET"){
            try {
                const response = await drive.files.list({
                    'q' : 'trashed = false'
                })
                const files = response.data.files;
                res.json(files)
            } catch (error) {
                console.error("Error fetching files:", error.message)
                return null
            }
        }

        if (req.method === "POST") {
            const form = new multiparty.Form();
            const {fields,files} = await new Promise((resolve,reject)=>{
                form.parse(req,async (err,fields, files)=>{
                    if (err) reject(err);
                    resolve({fields, files})
                })
            })

            try {
                    const file = files.file[0]; // Assuming the file field is named 'file'
                    console.log("Received file:", file.originalFilename, file.path);
                    const response = await uploadFile(file)
                    const publicUrl = await generatePublicUrl(response.data.id)
                    res.json(publicUrl);
                } catch (error) {
                    console.error("Error uploading file:", error);
                    res.status(500).json({ msg: "Error uploading file" });
                }
        } else {
            res.status(405).json({ msg: "Method Not Allowed" });
        }
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}
//We want to parse req ourselves
export const config = {
    api: {bodyParser: false}
}