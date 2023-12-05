import { useSession, signIn, signOut } from "next-auth/react";
import NavBar from "@/components/NavBar";
import SideNav from "@/components/SideNav";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
  Mousewheel,
} from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

import "swiper/css/bundle";
import { Spinner } from "@/components";
import Link from "next/link";
export default function Home() {
  const { data: session } = useSession();

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEvents = () => {
    setIsLoading(true);
    axios.get(`/api/events`).then((res) => {
      setEvents(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {session && <NavBar />}

      <div className="flex flex-1 justify-center items-center">
        {!session ? (
          <div className="bg-red-500 flex justify-center items-center p-2 flex-1">
            <div className="text-center w-full">
              <button
                className="bg-white p-2 rounded-md"
                onClick={() => signIn("google")}
              >
                Login with Google
              </button>
              <button
                className="bg-white p-2 rounded-md"
                onClick={() => signOut()}
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row w-full">
            <SideNav currentPage="Home" />
            
          </div>
        )}
      </div>
    </div>
  );
}
