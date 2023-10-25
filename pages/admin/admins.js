import React from 'react';
import {AddAdminComponent, AdminLayout} from "@/components";

const AdminsAdminPage = () => {
    return (
        <div className="h-screen flex">
            <AdminLayout>
                <div>Admin Events</div>
                <AddAdminComponent></AddAdminComponent>
            </AdminLayout>
        </div>
    );
};

export default AdminsAdminPage;