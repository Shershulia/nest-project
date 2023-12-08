import {getSession, useSession} from "next-auth/react";


import "swiper/css/bundle";
import {FrontendLayout, IsWaitingCase, NewUserCase} from "@/components";
import {mongooseConnect} from "@/lib/mongoose";
import {User} from "@/models/User";
import axios from "axios";
import { useRouter } from 'next/router';

export default function AccountPage({userInfo}) {
  const { data: session } = useSession();
    const router = useRouter();

    const setInWaiting = ()=>{
      axios.get("/api/verifyEmail").then(res=>{
          if(res.data.emailVerified==="waiting"){
              router.reload();
          }
      })
  }
  return (
      <FrontendLayout>
          {session ? (
              <div className={"flex flex-col-reverse md:flex-row justify-around items-start w-full text-white "}>
                  <div className={"flex gap-4 justify-center items-center flex-col md:w-1/2 w-11/12 border border-white p-2 rounded-lg"}>
                      <h1 className={"text-xl text-white"}>Information about subscription</h1>
                      <div>
                          {session.user.emailVerified==="waiting" &&
                              (
                                  <IsWaitingCase/>
                              )}
                          {session.user.emailVerified===null &&
                              (
                                  <NewUserCase sendVerification={setInWaiting}/>
                              )
                          }
                      </div>
                  </div>
                  <div className={"flex gap-4 justify-center items-center md:w-1/3 w-11/12"}>
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