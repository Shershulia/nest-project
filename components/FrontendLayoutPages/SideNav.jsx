import React, {useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import { getAdminServerSideProps } from "@/utils/adminUtils";
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";

const SideNav = () => {

    const router = useRouter();
    const {pathname} = router;
    const [isAdmin, setIsAdmin] = useState(false)
    const { data: session } = useSession();

    useEffect(()=>{
        if (session){
            axios.get("/api/checkAdmin").then((res)=>{
                setIsAdmin(res.data)
            })
        }
    },[])

  return (
    <div className="flex flex-col h-screen p-4 w-max items-center">
      <Link
        href="/"
        className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg ${
          pathname==="/" ? "text-customPurple" : "text-white"
        }`}
      >
        <i class="bi bi-house text-3xl"></i>
        <label className="opacity-0 group-hover:opacity-100">Home</label>
      </Link>

        {session &&
            (<Link
            href={`${isAdmin ? ("/admin") : ("/account")}`}
            className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg ${
                (pathname === "/account" || pathname === "/admin") ? "text-customPurple" : "text-white"
            }`}
        >
            <i class="bi bi-person text-3xl"></i>
            <label className="opacity-0 group-hover:opacity-100">{isAdmin ? ("Admin") : ("Account")}</label>
        </Link>)}


      <Link
        href="/calendar"
        className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg ${
            pathname==="/calendar" ? "text-customPurple" : "text-white"
        }`}
      >
        <i class="bi bi-calendar4-week text-3xl"></i>
        <label className="opacity-0 group-hover:opacity-100">Calendar</label>
      </Link>
      <Link
        href="/events"
        className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg ${
            pathname==="/events" ? "text-customPurple" : "text-white"
        }`}
      >
        <i class="bi bi-balloon text-3xl"></i>
        <label className="opacity-0 group-hover:opacity-100">Events</label>
      </Link>

        {session && (<Link
            href="/documents"
            className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg ${
                pathname === "/documents" ? "text-customPurple" : "text-white"
            }`}
        >
            <i class="bi bi-file-earmark-pdf text-3xl"></i>
            <label className="opacity-0 group-hover:opacity-100">Docs</label>
        </Link>)}

    </div>
  );
};

export default SideNav;

