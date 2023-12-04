import { drive } from "@/utils/googleDriveApi";
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

export default async function handler(req, res) {
    try {
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

                    res.json(response.data.id);
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