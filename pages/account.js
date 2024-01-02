
import { useSession } from "next-auth/react";



import "swiper/css/bundle";
import {
    FrontendLayout,
    IsWaitingCase,
    NewUserCase,
    PaymentSubscriptionModal, SendNotificationSuggestionSchema, SendReceiptToAdmin,
    UserWasConfirmed,
    UserWasDeclined
} from "@/components";

import axios from "axios";
import { useRouter } from 'next/router';
import React, {useEffect, useState} from "react";

export default function AccountPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [modal,setModal] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [showSubscription,setShowSubscription] = useState(true);

    const checkSubscription = () =>{
        axios.get("/api/subscription/checkSubscriptionStatus").then(res => {
            setPaymentStatus(res.data)
        })
    }
    const setInWaiting = ()=>{
        axios.get("/api/verifyEmail").then(res=>{
            if(res.data.emailVerified==="waiting"){
                router.reload();
            }
        })
    }
    return (
        <>
            <FrontendLayout>
                {session ? (
                    <div className={"flex flex-col-reverse md:flex-row justify-around items-start w-full text-white "}>

                        {session?.user.emailVerified==="confirmed" &&

                            (<div className={"flex flex-col items-center justify-center gap-4 w-full"}>
                                <div
                                    className={"flex gap-4 justify-center items-center flex-col w-11/12 border border-white p-2 rounded-lg"}>
                                    <SendNotificationSuggestionSchema/>
                                </div>
                                <div
                                    className={"flex gap-4 justify-center items-center flex-col w-11/12 border border-white p-2 rounded-lg"}>
                                    <SendReceiptToAdmin/>
                                </div>
                            </div>)}
                        <div className={`flex flex-col text-center my-4 justify-center items-center 
                  ${session?.user.emailVerified==="confirmed" ? "w-full" : "md:w-1/3"}`}>
                            <h1 className={"text-xl text-white md:block hidden"}>Hello, {session?.user?.name}</h1>
                            <div className={"rounded-lg md:block hidden"}>
                                <img src={session?.user?.image} alt={"Users avatar"} className={"object-fit"}/>
                            </div>
                            <div className={"flex gap-4 justify-center items-center flex-col w-11/12 border border-white p-2 rounded-lg cursor-pointer duration-300 transition-all"}
                                onClick={()=>{setShowSubscription(prev=>!prev)}}>
                                <h1 className={"text-xl text-white"}>Information about subscription</h1>
                                <div className={`${showSubscription ? "block" : "hidden"}`}>
                                    {session?.user.emailVerified==="waiting" &&
                                        (
                                            <IsWaitingCase/>
                                        )}
                                    {session?.user.emailVerified==="confirmed" &&
                                        (
                                            <UserWasConfirmed subscription={session.user.subscription} setModal={setModal}/>
                                        )}
                                    {session?.user.emailVerified?.includes("declined:") &&
                                        (
                                            <UserWasDeclined message={session.user.emailVerified}/>
                                        )}
                                    {session?.user.emailVerified===null &&
                                        (
                                            <NewUserCase sendVerification={setInWaiting}/>
                                        )
                                    }
                                </div>
                                {!session.user.subscription &&
                                    (<div class={"w-full flex items-center flex-col justify-center"}>
                                        <p>If you have paid - check status</p>
                                        <button onClick={checkSubscription} className={"p-2 m-2 bg-blue-600 text-white rounded-md"}
                                        >Check payment
                                        </button>
                                        <div>
                                            {paymentStatus !== null && (
                                                <>
                                                    {paymentStatus ? (
                                                        <p>Subscription was paid</p>
                                                    ) : (
                                                        <p className={"text-center text-wrap"}>Subscription was not paid. If you paid
                                                            - wait til 5 minutes and check it again <br/> Or write to admin if error
                                                            continues</p>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div>) : (
                    <div>
                        Log in to use that page
                    </div>
                )
                }
            </FrontendLayout>
            {modal && <PaymentSubscriptionModal setModal={setModal}/>}
        </>
    );
}
