import {google} from "googleapis";


export default async function handler(req, res) {
    try {
        if (req.method==="GET"){
            const auth = new google.auth.GoogleAuth({
                // your credentials to authenticate
                keyFile: process.cwd() + "/credentials-for-google-drive.json",
                // the actions you are permissed to perform using this API, in this case
                // all CRUD operations are permissed, check out
                // [ https://developers.google.com/drive/api/guides/api-specific-auth ]
                // for more advice on scopes
                scopes: ["https://www.googleapis.com/auth/drive"],
            })
            const drive = google.drive({
                version: "v3",
                auth
            });
            try {
                const response = await drive.files.list()
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