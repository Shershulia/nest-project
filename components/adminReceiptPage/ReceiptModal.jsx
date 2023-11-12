import React, {useState} from 'react';
import {ImageUploadComponent, PaperClipIcon} from "@/components";
const overlayStyles = "w-screen h-screen top-0 left-0 right-0 left-0 fixed transition-all duration-300 ";
const ReceiptModal = ({receipt}) => {
    const [modal, setModal] = useState(false);
    const {_id,description,date,amount,contactPerson,paid,files} = receipt
    const [documents, setDocuments] = useState([]);
    return (
        <div className={"w-1/3 h-full flex justify-center items-center"}>
            <button
                className={" border w-full h-full rounded-lg"}
                onClick={()=>setModal(true)}
            >{paid ? (
                <button className={"flex w-full h-full justify-center items-center border-x border-black p-2 hover:bg-green-400 transition-all duration-500 gap-2"}>
                    <p>See payments</p>
                    <PaperClipIcon/>
                </button>
            ):(
                <button className={"flex w-full h-full justify-center items-center border-x border-black p-2 hover:bg-red-400 transition-all duration-500"}>Pay</button>
            )}</button>
            {modal && (
                <div className={overlayStyles} onClick={()=>setModal(false)}>
                    <div className={overlayStyles + "bg-gray-900 bg-opacity-50"}>
                        <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 leading-4 bg-white p-4 rounded-md w-1/2 h-1/2"}>
                            <button className={"absolute top-0 right-0 p-2 border-black rounded-lg bg-white"} onClick={()=>setModal(false)}>Close</button>
                                {
                                    paid ?
                                        (<p>Show images + was paid (timestamp)</p>)
                                        :
                                        (
                                            <div className={"flex flex-col h-full w-full justify-center items-center"}>
                                                <p className={"text-center text-lg text-bold font-bold"}>To pay : {amount},-</p>
                                                <ImageUploadComponent title={"Upload screenshots of payments"} images={documents} setImages={setDocuments}/>
                                                <button className={"w-1/3 bg-green-500 p-2 rounded-lg text-white hover:bg-green-700 transition-all duration-500 mt-6"}>Confirm as paid</button>

                                            </div>)
                                }

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ReceiptModal;

