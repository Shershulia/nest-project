import {getSession, useSession} from "next-auth/react";


import "swiper/css/bundle";
import {FrontendLayout} from "@/components";
import {mongooseConnect} from "@/lib/mongoose";
import {User} from "@/models/User";
import {useEffect} from "react";
import axios from "axios";
export default function AccountPage({userInfo}) {
  const { data: session } = useSession();
  const verify = ()=>{
      axios.get("/api/verifyEmail").then(res=>{
          console.log(res.data)
      })
  }
  return (
      <FrontendLayout>
          {session ? (
              <div className={"flex justify-around items-start w-full"}>
                  <div className={"flex gap-4 justify-center items-center flex-col"}>
                      <h1 className={"text-xl text-white"}>Information about subscription</h1>
                      <button onClick={verify} className={"p-2 bg-green-600 text-white"}>Verify Account</button>
                  </div>
                  <div className={"flex gap-4 justify-center items-center"}>
                      <h1 className={"text-xl text-white"}>Hello, {session?.user?.name}</h1>
                      <div className={"rounded-lg"}>
                          <img src={session?.user?.image} alt={"Users avatar"} className={"object-fit"}/>
                      </div>
                  </div>
              </div>) : (
              <div>
                  Log in to use that page
              </div>
              )
          }
      </FrontendLayout>
      );
}
export async function getServerSideProps(ctx){
    await mongooseConnect();
    const userInformation = await getSession(ctx);
    const userInfo = await User.find({email:userInformation?.user?.email}, { emailVerified: 1 });
    return {
        props: {
            userInfo: JSON.parse(JSON.stringify(userInfo)),
        }
    };
}