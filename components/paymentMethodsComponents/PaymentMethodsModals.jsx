import React from 'react';
import {CreditCardIcon, Title} from "@/components";
import axios from "axios";
import Swal from "sweetalert2";
const overlayStyles = "w-screen h-screen top-0 left-0 right-0 left-0 fixed transition-all duration-300 ";
const PaymentMethodsModals = ({event,setModal}) => {

    const payWithVipps = () => {
        axios.post("/api/vipps/getPaymentLink",{event}).then(res=>{
            window.location=res.data;
        })
    }

    const payWithCard = () => {
        const dataToEdit = {
                    event,
                    flag: "a"
                }
                axios.post("/api/joinEvent", dataToEdit).then(res => {
                    if (res.data.url){
                        window.location=res.data.url
                    }else {
                        if (res.data) {
                            Swal.fire(
                                'Good job!',
                                `You was assign for this event`,
                                'success'
                            ).then(result => {
                                location.reload();
                            })
                        }
                    }

                }).catch((error) => {
                    Swal.fire(
                        'Error',
                        "Hm... Something went wrong, please contact support with your case. " + error.message,
                        'error'
                    )
                })
    }
    return (
        <div className={"w-full h-full flex justify-center items-center"}>

                <div className={overlayStyles} onClick={()=>setModal(false)}>
                    <div className={overlayStyles + "bg-gray-900 bg-opacity-50"}>
                        <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 " +
                            "-translate-y-1/2 leading-4 bg-white p-4 rounded-md w-1/2 h-1/2 " +
                            "flex justify-center items-center gap-2 flex-col"}>
                            <h1 className={"text-xl font-bold absolute md:visible invisible top-12"}>Choose payment method</h1>
                            <div className={"flex flex-col md:flex-row justify-center items-center w-5/6 gap-4 h-1/3"}>
                                <button className={"p-2 rounded-lg border border-black flex justify-center items-center gap-2 " +
                                    "h-full w-full"} onClick={payWithCard}>
                                    <CreditCardIcon className={"w-6 h-6 sm:w-12 sm:h-12"}/>
                                    <p className={"text-sm md:text-xl"}>Pay with card</p>
                                </button>
                                <button className={"h-full w-full"} onClick={payWithVipps}>
                                    <img src={"/vipps-icon.png"} alt={"vipps logo"} className={"bg-orange-500 border-black object-fit rounded-lg " +
                                        "w-full h-full"}/>
                                </button>
                            </div>

                            <button className={"absolute top-0 right-0 p-2 border-black rounded-lg bg-white"} onClick={()=>setModal(false)}>Close</button>
                        </div>
                    </div>
                </div>

        </div>
    );
};

export default PaymentMethodsModals;