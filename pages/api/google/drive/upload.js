import { GoogleDrive } from "@/utils/googleDriveApi";
import multiparty from "multiparty";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            try {
                const form = new multiparty.Form();

                const { fields, files } = await new Promise((resolve, reject) => {
                    form.parse(req, async (err, fields, files) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ fields, files });
                        }
                    });
                });

                const file = files[0];

                const requestBody = {
                    name: file.name, // or file.name, depending on multiparty version
                    fields: 'id',
                };

                const response = await GoogleDrive.files.create({
                    requestBody,
                    media: {
                        mimeType: file.headers['content-type'],
                        body: file,
                    },
                });

                res.json(response.data); // Assuming response is an Axios response object

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
