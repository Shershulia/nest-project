import React, {useEffect, useState} from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {LoginButton} from "@/components/index";
import io from "socket.io-client";
let socket
const NavBar = () => {
  const { data: session } = useSession();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications]  = useState(false);

    useEffect(() => socketInitializer(), [])
    const socketInitializer = () => {
        fetch('/api/socket')
            .then(() => {
                socket = io();

                socket.on('connect', () => {
                    console.log('connected');
                });
                socket.on('update-input', msg => {
                    setNotifications(prevState => [...prevState,msg])
                })
            })
            .catch((error) => {
                console.error('Error initializing socket:', error);
            });
    };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
          .requestFullscreen()
          .then(() => {
            setIsFullscreen(true);
          })
          .catch((err) => {
            console.error(
                `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
            );
          });
    } else {
      if (document.exitFullscreen) {
        document
            .exitFullscreen()
            .then(() => {
              setIsFullscreen(false);
            })
            .catch((err) => {
              console.error(
                  `Error attempting to disable full-screen mode: ${err.message} (${err.name})`
              );
            });
      }
    }
  };

  return (
      <div className="w-full flex justify-between p-4 text-white">
        <Link href="/" className="px-5">
          <i className="bi bi-app text-3xl"></i>
        </Link>
        <div className={"flex gap-4 justify-center items-center"}>
          <div className={`hover:bg-gray-700 px-4 py-2 rounded-lg duration-300 relative ${showNotifications && "bg-gray-700"}`}
               onClick={()=>{setShowNotifications(prevState => !prevState)}}>
            {notifications.length ? (
                <>
                    <i className="bi bi-bell-fill text-2xl text-white-800">
                    </i>
                    <div className="m-3 top-0 right-0 h-1/4 w-1/4 flex items-center absolute justify-center rounded-full bg-red-600"></div>
                </>

                ): (<i className="bi bi-bell text-2xl text-white-800 "></i>)}
            {showNotifications && (
                <div className={"absolute w-[200px] rounded-xl h-[200px] right-[0px] bg-white z-50 duration-300"}>
                  {notifications.map((notification,key)=>(
                          <p key={key} className={"text-black"}>{notification}</p>
                      )
                  )}
                  <button className={"bg-gray-400 absolute " +
                      "bottom-0 w-full rounded-b-lg hover:bg-gray-700 duration-300 py-2"}>Clear all</button>
                </div>
            )}
          </div>
          <Link href="/" className="hover:bg-gray-700 px-4 py-2 rounded-lg duration-300">
            <i className="bi bi-gear text-2xl text-white-800"></i>
          </Link>
          {session ? (<button
              className="hover:bg-gray-700 rounded-lg px-4 py-2 duration-300"
              onClick={() => signOut()}
          >
            <i className="bi bi-box-arrow-right text-2xl text-white-800 "></i>
          </button>) : (
              <LoginButton className={"hover:bg-gray-700 rounded-lg px-4 py-2"} nav={true}/>
          )}
          <button
              className="hover:bg-gray-700 rounded-lg px-4 py-2 duration-300"
              onClick={toggleFullscreen}
          >
            <i
                className={`bi ${
                    isFullscreen ? "bi-fullscreen-exit" : "bi-fullscreen"
                } text-xl `}
            ></i>
          </button>
        </div>
      </div>
  );
};

export default NavBar;