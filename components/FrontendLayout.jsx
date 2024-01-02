import React, {useState} from 'react';
import {useSession} from "next-auth/react";
import {NavBar, ParticlesBackground, SideNav} from "@/components/index";

const FrontendLayout = ({children}) => {
    const { data: session } = useSession();
    const [showNav, setShowNav] = useState(false);
    return (
    <div className="flex flex-col h-screen overflow-hidden">
        <ParticlesBackground />
        <NavBar showNav={showNav} setShowNav={setShowNav}/>
        <div className="flex flex-1 justify-center items-center">
            <div className="flex flex-row w-full h-full">
                <SideNav showNav={showNav} setShowNav={setShowNav}/>
                <div className={`w-full md:w-11/12 flex flex-col gap-10 justify-center items-start h-full 
                ${showNav? "hidden" : "block"} md:block`}>
                    {children}
                </div>
            </div>
        </div>

    </div>
    );
};

export default FrontendLayout;