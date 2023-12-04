import {GoogleDrive} from "@/utils/googleDriveApi";


export default async function handler(req, res) {
    try {
        if (req.method==="GET"){
            try {
                const response = await GoogleDrive.files.list()
                const files = response.data.files
                res.json(files)
            } catch (error) {
                console.error("Error fetching files:", error.message)
                return null
            }
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}