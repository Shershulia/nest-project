import React from 'react';
import {AdminNavBar} from "@/components";

const AdminLayout = ({children}) => {
    return (
        <div className={'flex h-full w-full my-4 bg-blue-600 h-full min-h-screen '}>

            <AdminNavBar></AdminNavBar>
            <div className={'bg-white flex-grow h-full md:mr-2 mr-2 rounded-lg min-h-screen'}>{children}</div> <br/>
        </div>
    );
};

export default AdminLayout;