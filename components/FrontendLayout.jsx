import React from 'react';
import {useSession} from "next-auth/react";
import {NavBar, ParticlesBackground, SideNav} from "@/components/index";

const FrontendLayout = ({children}) => {
    const { data: session } = useSession();

    return (
    <div className="flex flex-col h-screen overflow-hidden">
        <ParticlesBackground />
        <NavBar />
        <div className="flex flex-1 justify-center items-center">
            <div className="flex flex-row w-full">
                <SideNav />
                <div className={" w-11/12 flex sm:flex-row flex-col gap-10"}>
                    {children}
                </div>
            </div>
        </div>

    </div>
    );
};

export default FrontendLayout;