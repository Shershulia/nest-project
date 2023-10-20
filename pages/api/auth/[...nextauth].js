import NextAuth, {getServerSession} from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import {Admin} from "@/models/Admin";
import {mongooseConnect} from "@/lib/mongoose";

export async function isAdminEmail(email){
    await mongooseConnect();
    return !! (await Admin.findOne({email:email}));
}
export const isAdminRequest = async (req, res) => {
    try {
        const session = await getServerSession(req, res, authOptions);
        if (!(await isAdminEmail(session?.user?.email))) {
            res.status(401).json({ error: 'Not an admin' });
            return;
        }
        // Continue processing if user is an admin
    } catch (error) {
        console.error('isAdminRequest error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const authOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    adapter: MongoDBAdapter(clientPromise), //reuse an active connection to the database
}
export default NextAuth(authOptions);