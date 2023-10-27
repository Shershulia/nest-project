import React from 'react';
import {AddAdminComponent, AdminLayout, DeleteAdmin} from "@/components";

const AdminsAdminPage = () => {
    return (
        <div className="h-screen flex">
            <AdminLayout>
                <AddAdminComponent></AddAdminComponent>
                <DeleteAdmin></DeleteAdmin>
            </AdminLayout>
        </div>
    );
};

export default AdminsAdminPage;