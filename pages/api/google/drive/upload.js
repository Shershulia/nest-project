import { drive } from "@/utils/googleDriveApi";
import multiparty from "multiparty";
import fs from "fs";
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the file path of the current module
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = dirname(__filename);

// Construct the file path using the correct directory
const filePath = path.join(__dirname, "vipps-icon.png");

async function uploadFile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: "example.jpg",
                mimeType: "image/png",
            },
            media: {
                mimeType: "image/png",
                body: fs.createReadStream(filePath),
            },
        });
        console.log(response.data);
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

                    // Handle the file as needed, for example, log its details
                    console.log("Received file:", file.originalFilename, file.path);

                    // Handle the file upload logic (you may need to modify this)
                    // Example: await uploadFile(file);

                    res.json({ msg: "File uploaded successfully" });
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