import React from 'react';
import {AdminLayout, Title, WrongPermission} from "@/components";
import {getAdminServerSideProps} from "@/utils/adminUtils";



const AdminPage = ({userInformation,isAdmin}) => {
    return (
        isAdmin ? (
            <div className="h-screen flex bg-blue-600">
                <AdminLayout>
                    <Title text={`${userInformation?.user.name}, welcome to admin page`} />
                </AdminLayout>
            </div>
        ) : (
            <WrongPermission/>
        )
    );

};

export default AdminPage;

//Check of admin permission happens on server side
export async function getServerSideProps(ctx){
    return await getAdminServerSideProps(ctx);
}