import React, {useState} from 'react';
import {Input} from "@/components";
import ImageUploadComponent from "../ImageUploadComponent";
import axios from "axios";
import Swal from "sweetalert2";

const SendReceiptToAdmin = () => {
    const [description,setDescription] = useState("");
    const [sendDetails,setSendDetails] = useState("");
    const [amount,setAmount] = useState(0);
    const [showReceipt,setShowReceipt] = useState(true);


    const [images, setImages] = useState([])

    const sendReceipt = () =>{
        const stringDesctiption = "Send to: "+sendDetails +"\n Description: " + description;
        axios.post("/api/receipts",{description:stringDesctiption,amount,images}).then(
            res=>{
                Swal.fire(
                    'Good job!',
                    `Receipt was send to admin`,
                    'success'
                ).then(res=>{
                    setDescription("");
                    setSendDetails("");
                    setAmount(0);
                    setImages([])

                })
            }
        )
    }

    return (
        <div className={"text-white w-full text-center text-xl flex flex-col gap-2 justify-center items-center cursor-pointer"}
            onClick={()=>{setShowReceipt(prevState => !prevState)}}>
            <h1>Send finance report to admin</h1>
            <div className={`${showReceipt ? "block" : "hidden"}`}>
                <div className={`w-full flex items-center justify-center`}>
                    <div className={"w-full"}>
                        <Input label={"Description"}
                               onChange={setDescription} value={description}
                               className={"w-3/4 rounded-lg bg-transparent border-white text-white"}/>
                        <Input label={"Send to :"}
                               onChange={setSendDetails} value={sendDetails}
                               className={"w-3/4 rounded-lg bg-transparent border-white text-white"}/>
                        <Input label={"Amount :"} isDigits={true}
                               onChange={setAmount} value={amount}
                               className={"w-3/4 rounded-lg bg-transparent border-white text-white"}/>
                    </div>
                    <div className={"w-full"}>
                        <ImageUploadComponent title={"Photos"} images={images} setImages={setImages}
                                              color={"white"}/>
                    </div>

                </div>

                <button onClick={sendReceipt}
                        className={"bg-transparent border-white border p-2 mt-2 rounded-md hover:bg-purple-500 active:bg-purple-700 duration-700 w-full md:w-1/4"}>
                    Send</button>
            </div>
        </div>
    );
};

export default SendReceiptToAdmin;