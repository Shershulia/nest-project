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
            try {
                await uploadFile();
                res.json("ok"); // Assuming response is an Axios response object
            } catch (error) {
                console.error("Error uploading file:", error.message);
                res.status(500).json({ msg: "Error uploading file" });
            }
        }
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}
