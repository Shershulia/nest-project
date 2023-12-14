import React from 'react';
import {useRouter} from "next/router";

const LoginButton = ({nav = false,className = ""}) => {
    const router = useRouter()
    const goToLoginPage = () => {
        router.push("/login")
    }
    return (
        <button type="button" onClick={goToLoginPage}
                className={`text-white duration-500
                hover:bg-gray-700 ${className}`}>
           <div className={"flex gap-2 justify-center items-center"}>
               <i class="bi bi-google text-xl text-white-800"></i>
               {!nav && (<p>Sign With Google</p>)}
           </div>
        </button>
    );
};

export default LoginButton;