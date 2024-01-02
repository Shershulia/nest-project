import React, {useCallback, useEffect, useState} from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {LoginButton} from "@/components/index";
import io from "socket.io-client";
import {RevealWrapper} from "next-reveal";
let socket
const NavBar = ({showNav,setShowNav}) => {
  const { data: session } = useSession();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications]  = useState(false);

    useEffect(() => {
        if (session) {
            socketInitializer();

            return () => {
                // Clean up the socket connection when the component is unmounted
                if (socket) {
                    socket.disconnect();
                }
            };
        }
    }, [session]);


    const clear = () =>{
        setNotifications([]);
    }
    const socketInitializer = useCallback(() => {
        fetch("/api/socket")
            .then(() => {
                socket = io();

                socket.on("connect", () => {
                    console.log("connected");
                });
                socket.on("update-input", (msg) => {
                    console.log(msg);
                    setNotifications((prevState) => [...prevState, msg]);
                });
            })
            .catch((error) => {
                console.error("Error initializing socket:", error);
            });
    }, []);

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
              <RevealWrapper origin={'top'} delay={300} className={`w-screen flex justify-end p-4 text-white 
              ${showNav? "block" : "hidden"} md:block`}>
                  <div className={`flex gap-4 justify-center items-center`}>
                      {session && (<div className={`hover:bg-gray-700 px-4 py-2 rounded-lg duration-300 relative ${showNotifications && "bg-gray-700"}`}
                                        onClick={()=>{setShowNotifications(prevState => !prevState)}}>
                          {notifications.length ? (
                              <>
                                  <i className="bi bi-bell-fill text-2xl text-white-800">
                                  </i>
                                  <div className="m-3 top-0 right-0 h-1/4 w-1/4 flex items-center absolute justify-center rounded-full bg-red-600">
                                      <p className={"text-xs text-bold text-white"}>{notifications.length}</p>
                                  </div>
                              </>

                          ): (<i className="bi bi-bell text-2xl text-white-800 "></i>)}
                          {showNotifications && (
                              <div className={"absolute w-[200px] rounded-sm h-[200px] right-[0px] bg-white z-50 duration-300"}>
                                  <button className={"bg-gray-400 absolute  " +
                                      "bottom-0 w-full rounded-b-sm text-white h-[25px] hover:bg-gray-700 duration-300 text-black z-50"}
                                          onClick={clear}>Clear all</button>
                                  <div className={"overflow-scroll mt-[10px] max-h-[190px] scrollbar mb-[25px]"}>
                                      {notifications.map((notification,key)=>(
                                              <div className={"flex"}>
                                                  <p key={key} className={"text-black flex items-center"}>
                                                      <span className={"font-bold text-black pl-2"}>New:</span> {notification}
                                                  </p>

                                              </div>
                                          )
                                      )}
                                  </div>
                              </div>
                          )}
                      </div>)}
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
              </RevealWrapper>
  );
};

export default NavBar;