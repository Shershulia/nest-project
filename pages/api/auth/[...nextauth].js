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
            clientSecret: process.env.GOOGLE_SECRET,
            profile(profile) {
                return {
                    // Return the default fields
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    // Add a new one
                    subscription:profile.subscription,
                };
            },
        }),
    ],
    callbacks: {
        async session({session, user}) {
            session.user.id = user.id;
            session.user.email = user.email;
            session.user.image=user.image;
            session.user.subscription = user.subscription;
            return session;
        },
    },
    adapter: MongoDBAdapter(clientPromise), //reuse an active connection to the database
}
export default NextAuth(authOptions);