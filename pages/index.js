import { useSession, signIn, signOut } from "next-auth/react"
import {useEffect} from "react";
import axios from "axios";


export default function Home() {
    const { data: session } = useSession()

    if (!session){
        return (
            <div className="bg-red-500 flex justify-center items-center p-2 h-screen">
                <div className={"text-center w-full"}>
                    <button className={"bg-white p-2 rounded-md"} onClick={()=>signIn("google")}>Login with Google</button>
                    <button className={"bg-white p-2 rounded-md"} onClick={()=>signOut()}>Log out</button>

                </div>
            </div>)
    }
    return (
            <div className="bg-red-500 flex justify-center items-center p-2 h-screen">
                <div className={"text-center w-full"}>
                    <div>Logged in {session.user.email}</div>
                    <button className={"bg-white p-2 rounded-md"} onClick={()=>signOut()}>Log out</button>
                </div>
            </div>
        )


}
