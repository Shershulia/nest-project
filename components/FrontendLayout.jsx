import React from 'react';
import {signIn, signOut, useSession} from "next-auth/react";
import NavBar from "@/components/NavBar";
import SideNav from "@/components/SideNav";
import ParticlesBackground from "@/components/ParticlesBackground";

const FrontendLayout = ({children}) => {
    const { data: session } = useSession();

    return (
    <div className="flex flex-col h-screen overflow-hidden">
        <ParticlesBackground />
        {session && <NavBar />}
        <div className="flex flex-1 justify-center items-center">
            {!session ? (
                <div className="bg-red-500 flex justify-center items-center p-2 flex-1">
                    <div className="text-center w-full">
                        <button
                            className="bg-white p-2 rounded-md"
                            onClick={() => signIn("google")}
                        >
                            Login with Google
                        </button>
                        <button
                            className="bg-white p-2 rounded-md"
                            onClick={() => signOut()}
                        >
                            Log out
                        </button>
                    </div>
                </div>
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