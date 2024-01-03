import React, { useState } from 'react';
import {AdminNavBar} from "@/components";
import { ParticlesBackground } from '@/components';

const AdminLayout = ({children, backgroundColor, backgroundOpacity}) => {
    const [bg] = useState([backgroundColor ? "bg-" + backgroundColor : "bg-white"]);
    const [showNav, setShowNav] = useState(false);

    return (
        <div className={'flex h-full w-full my-4 min-h-screen '}>
            <ParticlesBackground />
            <AdminNavBar  showNav={showNav} setShowNav={setShowNav}/>
            <div className={`${bg} flex flex-col md:w-[75%] h-full md:mr-2 m-auto rounded-lg min-h-screen
                ${showNav? "hidden" : "block"} md:block mt-10 w-11/12 `}
                 style={{backgroundColor: `rgba(113, 84, 224, ${backgroundOpacity})`}}>
                {children}</div> <br/>
        </div>
    );
};

export default AdminLayout;