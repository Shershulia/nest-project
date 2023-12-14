import React from 'react';
import {signIn, signOut, useSession} from "next-auth/react";
import NavBar from "@/components/NavBar";
import SideNav from "@/components/SideNav";

const FrontendLayout = ({children}) => {
    const { data: session } = useSession();

    return (
    <div className="flex flex-col h-screen overflow-hidden">
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