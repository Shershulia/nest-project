import React from 'react';
import {AdminLayout} from "@/components";


const Admin = () => {
    // const { data: session } = useSession();
    // console.log(session);
    // isAdminEmail(data.)
    return (
        <div className="h-screen flex">
            <AdminLayout>
                <div>Hello admin</div>
            </AdminLayout>
        </div>
    );
};

export default Admin;