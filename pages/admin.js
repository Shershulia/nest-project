import React, {useEffect, useState} from 'react';
import {AddAdminComponent, AdminLayout, Input, Title} from "@/components";
import {useSession} from "next-auth/react";
import {Admin} from "@/models/Admin";
import {mongooseConnect} from "@/lib/mongoose";
import {checkIfUserIsAdmin} from "@/utils/adminUtils";


const AdminPage = ({admins}) => {
    const { data: session } = useSession();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect( () => {
        if (session) {
            const userIsAdmin = checkIfUserIsAdmin(session.user.email, admins);
            setIsAdmin( userIsAdmin);
        }
    },[session])

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

export async function getServerSideProps(){
    await mongooseConnect();
    const admins = await Admin.find({}, { email: 1 })
    return{
        props:{
            admins:JSON.parse(JSON.stringify(admins)),
        }
    }
}