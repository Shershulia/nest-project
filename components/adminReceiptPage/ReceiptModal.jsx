import React, {useEffect, useState} from 'react';
import {ImageUploadComponent, PaperClipIcon} from "@/components";
import axios from "axios";
import Swal from "sweetalert2";


const overlayStyles = "w-screen h-screen top-0 left-0 right-0 left-0 fixed transition-all duration-300 ";


const ReceiptModal = ({receipt}) => {
    const [modal, setModal] = useState(false);
    const {_id,description,amount,paid,files} = receipt
    const [documents, setDocuments] = useState([]);

    const [confirmation, setConfirmation] = useState(null);
    if (paid){
        useEffect(()=>{
            axios.get("/api/admin/confirmPayment/?id="+_id).then(
                res=>setConfirmation(res.data)
            )
        },[modal])
    }

    const confirmAsPaid = async () => {
        const dataToEdit = { orderId: _id, files };

        try {
            const result = await Swal.fire({
                title: 'Do you want to confirm this payment',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
            });

            if (result.isConfirmed) {
                const response = await axios.post("/api/admin/confirmPayment", dataToEdit);
                Swal.fire(
                    'Good job!',
                    'Was successfully paid',
                    'success'
                );
            }
        } catch (error) {
            console.error(error);
            Swal.fire(
                'Error',
                'Hm... Something went wrong, please contact support with your case.',
                'error'
            );
        }
    };


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
                                        (<p>{confirmation?.orderId} Order Id</p>)
                                        :
                                        (
                                            <div className={"flex flex-col h-full w-full justify-center items-center"}>
                                                <p className={"text-center text-lg text-bold font-bold"}>To pay : {amount},-</p>
                                                <p className={"text-center text-lg text-bold mt-2"}>{description}</p>
                                                <ImageUploadComponent title={"Upload screenshots of payments"} images={documents} setImages={setDocuments}/>
                                                <button onClick={confirmAsPaid}
                                                    className={"w-1/3 bg-green-500 p-2 rounded-lg text-white hover:bg-green-700 transition-all duration-500 mt-6"}>Confirm as paid</button>

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

