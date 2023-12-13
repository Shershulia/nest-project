import React from 'react';
import { useSession } from "next-auth/react";
import { ParticlesBackground, NavBar, SideNav } from '@/components';
import { LoginForm } from '@/components'

const FrontendLayout = ({children}) => {
    const { data: session } = useSession();

    return (
    <div className="flex flex-col h-screen overflow-hidden">
        <ParticlesBackground />
        {session && <NavBar />}
        <div className="flex flex-1 justify-center items-center">
            {!session ? (
                <LoginForm />
            ) : (
                <div className="flex flex-row w-full">
                    <SideNav />
                    <div className={" w-11/12 flex sm:flex-row flex-col gap-10"}>
                        {children}
                    </div>
                </div>
            )}
        </div>

    </div>
    );
};

export default FrontendLayout;