import { useSession, signIn, signOut } from "next-auth/react";
import NavBar from "@/components/FrontendLayoutPages/NavBar";
import SideNav from "@/components/FrontendLayoutPages/SideNav";

import { useEffect, useState } from "react";
import axios from "axios";

import "swiper/css/bundle";
import {FrontendLayout} from "@/components";
export default function Home() {
  const { data: session } = useSession();

  return (
      <FrontendLayout>
          <h1 className={"text-xl text-white"}>Hello</h1>
      </FrontendLayout>
      );
}
