import React, {useEffect, useState} from 'react';
import {AddAdminComponent, AdminLayout, DeleteAdmin, Title} from "@/components";
import {mongooseConnect} from "@/lib/mongoose";
import {Admin} from "@/models/Admin";
import {useSession} from "next-auth/react";
import {checkIfUserIsAdmin} from "@/utils/adminUtils";

const AdminsAdminPage = ({admins}) => {

    const { data: session } = useSession();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect( () => {
        if (session) {
            const userIsAdmin = checkIfUserIsAdmin(session.user.email, admins);
            setIsAdmin( userIsAdmin);
        }else {

        }
    },[session])

    return (
        isAdmin ? (
        <div className="h-full flex bg-blue-600">
            <AdminLayout>
                <AddAdminComponent></AddAdminComponent>
                <DeleteAdmin></DeleteAdmin>
            </AdminLayout>
        </div>):
            (
                <div className="h-screen flex bg-blue-600 w-full">
                    <Title text={"Wrong permission level"}/>
                </div>
            )
    );
};

export default AdminsAdminPage;

export async function getServerSideProps(){
    await mongooseConnect();
    const admins = await Admin.find({}, { email: 1 })
    return{
        props:{
            admins:JSON.parse(JSON.stringify(admins)),
        }
    }
}