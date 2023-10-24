import React from 'react';
import {AdminNavBar} from "@/components";
import {isAdminEmail} from "@/pages/api/auth/[...nextauth]";
import {useSession} from "next-auth/react";

const Admin = () => {
    const { data: session } = useSession();
    console.log(session);
    // isAdminEmail(data.)
    return (
        <div>
            <AdminNavBar/>
        </div>
    );
};

export default Admin;