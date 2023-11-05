import React from 'react';
import {AddAdminComponent, AdminLayout, DeleteAdmin, WrongPermission} from "@/components";
import { getAdminServerSideProps} from "@/utils/adminUtils";

const AdminsAdminPage = ({isAdmin}) => {

    return (
        isAdmin ? (
        <div className="h-full flex bg-blue-600">
            <AdminLayout>
                <AddAdminComponent></AddAdminComponent>
                <DeleteAdmin></DeleteAdmin>
            </AdminLayout>
        </div>):
            (
                <WrongPermission/>
            )
    );
};

export default AdminsAdminPage;

export async function getServerSideProps(ctx){
    return await getAdminServerSideProps(ctx);
}