import { getSession } from "next-auth/react";
import { Admin } from "@/models/Admin";
import { mongooseConnect } from "@/lib/mongoose";

export async function getAdminServerSideProps(ctx) {
    await mongooseConnect();
    const admins = await Admin.find({}, { email: 1 });
    const userInformation = await getSession(ctx);
    let userIsAdmin = false;
    if (userInformation) {
        userIsAdmin = await checkIfUserIsAdmin(userInformation.user.email, admins);
    }
    return {
        props: {
            userInformation: JSON.parse(JSON.stringify(userInformation)),
            isAdmin: JSON.parse(JSON.stringify(userIsAdmin))
        }
    };
}

export async function checkIfUserIsAdmin(email, admins) {
    if (email){
        const arrayOfEmails = admins.map(obj => obj.email);
        return arrayOfEmails.includes(email);
    }else return false;

}