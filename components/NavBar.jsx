import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import {LoginButton} from "@/components/index";

const NavBar = () => {
  const { data: session } = useSession();
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    <div className="w-full flex justify-between p-4">
      <Link href="/" className="px-5">
        <i class="bi bi-app text-3xl"></i>
      </Link>
      <div className={"flex gap-4 justify-center items-center"}>
        <Link href="/" className="hover:bg-gray-700 px-4 py-3 rounded-lg">
          <i class="bi bi-gear text-2xl text-white-800"></i>
        </Link>
        {session ? (<button
            className="hover:bg-gray-700 rounded-lg px-4 py-2"
            onClick={() => signOut()}
        >
          <i class="bi bi-box-arrow-right text-2xl text-white-800"></i>
        </button>) : (
            <LoginButton className={"hover:bg-gray-700 rounded-lg px-4 py-2"} nav={true}/>
        )}
        <button
          className="hover:bg-gray-700 rounded-lg px-4 py-2"
          onClick={toggleFullscreen}
        >
          <i
            className={`bi ${
              isFullscreen ? "bi-fullscreen-exit" : "bi-fullscreen"
            } text-xl`}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
