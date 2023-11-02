import React from 'react';
import {AddAdminComponent, AdminLayout, DeleteAdmin} from "@/components";

const AdminsAdminPage = () => {
    return (
        <div className="h-full flex bg-blue-600">
            <AdminLayout>
                <AddAdminComponent></AddAdminComponent>
                <DeleteAdmin></DeleteAdmin>
            </AdminLayout>
        </div>
    );
};

export default AdminsAdminPage;