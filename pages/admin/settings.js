import React from 'react';
import {AdminLayout, WrongPermission} from "@/components";
import {getAdminServerSideProps} from "@/utils/adminUtils";

const SettingsAdminPage = ({isAdmin}) => {
    return (
        isAdmin ? (
        <div className="h-full flex bg-blue-600">
            <AdminLayout>
                <div>Admin Settings</div>
            </AdminLayout>
        </div>
    ):
    (
        <WrongPermission/>
    ));
};

export default SettingsAdminPage;

//Check of admin permission happens on server side
export async function getServerSideProps(ctx){
    return await getAdminServerSideProps(ctx);
}