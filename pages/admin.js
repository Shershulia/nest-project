import React, {useState} from 'react';
import {AddAdminComponent, AdminLayout, Input} from "@/components";


const Admin = () => {
    // const { data: session } = useSession();
    // console.log(session);
    // isAdminEmail(data.)
    const [addUser, setAddAdmin] = useState("");
    return (
        <div className="h-screen flex">
            <AdminLayout>
                <div>
                    <h1>Administration page</h1>
                </div>
            </AdminLayout>
        </div>
    );
};

export default Admin;