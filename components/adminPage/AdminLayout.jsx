import React, { useState } from 'react';
import {AdminNavBar} from "@/components";
import { ParticlesBackground } from '@/components';

const AdminLayout = ({children, backgroundColor, backgroundOpacity}) => {
    const [bg] = useState([backgroundColor ? "bg-" + backgroundColor : "bg-white"]);

    return (
        <div className={'flex h-full w-full my-4 min-h-screen '}>
            <ParticlesBackground />
            <AdminNavBar />
            <div className={`${bg} flex flex-col w-[75%] h-full md:mr-2 mr-2 rounded-lg min-h-screen`} style={{backgroundColor: `rgba(113, 84, 224, ${backgroundOpacity})`}}>{children}</div> <br/>
        </div>
    );
};

export default AdminLayout;