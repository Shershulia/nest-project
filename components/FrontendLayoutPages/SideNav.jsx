import React, {useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import { getAdminServerSideProps } from "@/utils/adminUtils";
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";
import {RevealWrapper} from "next-reveal";

const SideNav = ({showNav,setShowNav}) => {

    const router = useRouter();
    const {pathname} = router;
    const [isAdmin, setIsAdmin] = useState(false)
    const { data: session } = useSession();

    useEffect(()=>{

        axios.get("/api/checkAdmin").then((res)=>{
            setIsAdmin(res.data)
        })

    },[])

  return (
      <>
          <RevealWrapper origin={'right'} delay={300} className={`flex flex-col 
          h-screen p-4 w-screen md:w-max items-center ${showNav? "block" : "hidden"} md:block`}>
              <Link
                  href="/"
                  className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg duration-300 ${
                      pathname==="/" ? "text-customPurple" : "text-white"
                  }`}
              >
                  <i className="bi bi-house text-3xl"></i>
                  <label className="opacity-0 group-hover:opacity-100">Home</label>
              </Link>

              {session &&
                  (<Link
                      href={`${isAdmin ? ("/admin") : ("/account")}`}
                      className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg duration-300 ${
                          (pathname === "/account" || pathname === "/admin") ? "text-customPurple" : "text-white"
                      }`}
                  >
                      <i className="bi bi-person text-3xl"></i>
                      <label className="opacity-0 group-hover:opacity-100">{isAdmin ? ("Admin") : ("Account")}</label>
                  </Link>)}


              <Link
                  href="/calendar"
                  className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg duration-300 ${
                      pathname==="/calendar" ? "text-customPurple" : "text-white"
                  }`}
              >
                  <i className="bi bi-calendar4-week text-3xl"></i>
                  <label className="opacity-0 group-hover:opacity-100">Calendar</label>
              </Link>
              <Link
                  href="/events"
                  className={`group px-1 py-2 hover:bg-gray-800 flex flex-col duration-300 items-center w-full rounded-lg ${
                      pathname==="/events" ? "text-customPurple" : "text-white"
                  }`}
              >
                  <i className="bi bi-balloon text-3xl"></i>
                  <label className="opacity-0 group-hover:opacity-100">Events</label>
              </Link>

              {session && (<Link
                  href="/documents"
                  className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center duration-300 w-full rounded-lg ${
                      pathname === "/documents" ? "text-customPurple" : "text-white"
                  }`}
              >
                  <i className="bi bi-file-earmark-pdf text-3xl"></i>
                  <label className="opacity-0 group-hover:opacity-100">Docs</label>
              </Link>)}

          </RevealWrapper>

              <button className={`md:hidden ${!showNav? "left-[30px] top-[30px]" : "left-1/2 top-3/4"} absolute`}
              onClick={()=>{
                  setShowNav(prev=>!prev)
              }}>
                  <i className="bi bi-list text-2xl"></i>
              </button>
      </>
  );
};

export default SideNav;

