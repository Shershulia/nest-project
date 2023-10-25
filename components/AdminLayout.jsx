import React from 'react';
import {AdminNavBar} from "@/components/index";

const AdminLayout = ({children}) => {
    return (
        <div className={'flex h-full w-full bg-blue-600 h-screen'}>
            <AdminNavBar></AdminNavBar>
            <div className={'bg-white flex-grow my-4 h-[95%] md:mr-2 mr-2 rounded-lg p-8'}>{children}</div> <br/>
        </div>
    );
};

export default AdminLayout;