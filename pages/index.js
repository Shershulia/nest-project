import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
    const { data: session } = useSession()
    if (!session){
        return (
            <div className="bg-red-500 flex justify-center items-center p-2 h-screen">
                <div className={"text-center w-full"}>
                    <button className={"bg-white p-2 rounded-md"} onClick={()=>signIn("google")}>Login with Google</button>
                </div>
            </div>)
    }
    return (
            <div className="bg-red-500 flex justify-center items-center p-2 h-screen">
                <div className={"text-center w-full"}>
                    <div>Logged in {session.user.email}</div>
                    {/*<button className={"bg-white p-2 rounded-md"}>Logged in</button>*/}
                </div>
            </div>
        )


}
