import {generatePublicUrl} from "@/pages/api/google/drive/upload";

export default async function handler(req, res) {
    try {


        if (req.method === "POST") {
            const {id} = req.body;
            const publicUrl = await generatePublicUrl(id)
            res.json(publicUrl)

        } else {
            res.status(405).json({ msg: "Method Not Allowed" });
        }
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}
