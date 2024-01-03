import React from 'react';
import {ArrowLeftIcon, ParticlesBackground, Title} from "@/components";
import {useRouter} from "next/router";

const WrongPermission = () => {
    const router = useRouter();

    async function goToMainPage(){
        await router.push('/');
    }
    return (
        <div className="flex flex-col justify-center items-center h-full w-full min-h-screen">
            <ParticlesBackground />

            <Title text={"Wrong permission level"} className={"text-white text-2xl"}/>

            <button onClick={goToMainPage} className={"flex justify-center items-center px-2 py-4 gap-4 border rounded-md " +
                "border-white text-white hover:bg-purple-600  duration-300 text-lg font-semibold transition border-black "}>
                <ArrowLeftIcon/>
                <span>
                     Go to main page
                 </span>
            </button>
        </div>
    );
};

export default WrongPermission;