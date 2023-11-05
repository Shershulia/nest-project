import React from 'react';
import {AdminLayout, Title} from "@/components";
import {getSession, useSession} from "next-auth/react";
import {Admin} from "@/models/Admin";
import {mongooseConnect} from "@/lib/mongoose";
import {checkIfUserIsAdmin} from "@/utils/adminUtils";


const AdminPage = ({isAdmin}) => {
    const { data: session } = useSession();

    return (
        isAdmin ? (
            <div className="h-screen flex bg-blue-600">
                <AdminLayout>
                    <Title text={`${session?.user.name}, welcome to admin page`} />
                </AdminLayout>
            </div>
        ) : (
            <div className="h-screen flex bg-blue-600 w-full">
            <Title text={"Wrong permission level"}/>
            </div>
        )
    );

};

export default AdminPage;

//Check of admin permission happens on server side
export async function getServerSideProps(ctx){
    await mongooseConnect();
    const admins = await Admin.find({}, { email: 1 })
    const userInformation = await getSession(ctx);
    let userIsAdmin=false;
    if (userInformation){
        userIsAdmin = checkIfUserIsAdmin(userInformation.user.email,admins)
    }
    return{
        props:{
            isAdmin: JSON.parse(JSON.stringify(userIsAdmin))
        }
    }
}