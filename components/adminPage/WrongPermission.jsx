import React from 'react';
import {ArrowLeftIcon, Title} from "@/components";
import {useRouter} from "next/router";

const WrongPermission = () => {
    const router = useRouter();

    async function goToMainPage(){
        await router.push('/');
    }
    return (
        <div className="h-screen flex flex-col bg-blue-600 w-full items-center justify-center">
            <Title text={"Wrong permission level"} className={"text-white text-2xl"}/>

            <button onClick={goToMainPage} className={"flex justify-center items-center px-2 py-4 gap-4 border rounded-md " +
                "hover:bg-blue-800 hover:text-white hover:border-white duration-300 text-lg font-semibold transition border-black "}>
                <ArrowLeftIcon/>
                <span>
                     Go to main page
                 </span>
            </button>
        </div>
    );
};

export default WrongPermission;