import React, {useEffect, useState} from 'react';
import {DeleteButton, DocumentModal, ImageUploadComponent, PaperClipIcon, Spinner} from "@/components";
import axios from "axios";
import Swal from "sweetalert2";
import {format} from "date-fns";
import Link from "next/link";


const overlayStyles = "w-screen h-screen top-0 left-0 right-0 left-0 fixed transition-all duration-300 ";


const ReceiptModal = ({receipt,loadReceipts}) => {
    const [modal, setModal] = useState(false);
    const {_id,description,amount,paid,files} = receipt
    const [documents, setDocuments] = useState([]);
    const [confirmationLoading,setConfirmationLoading] = useState(false);
    const [confirmation, setConfirmation] = useState(null);

    useEffect(()=>{
        if (paid){
            setConfirmationLoading(true)
            axios.get("/api/admin/confirmPayment/?id="+_id).then(
                res=>{
                    console.log(res.data)
                    setConfirmation(res.data)
                    setConfirmationLoading(false)
                }
            )
        }
    },[modal])

    const confirmAsPaid = async () => {
        const dataToEdit = { orderId: _id, files:documents };

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
                setModal(false);
                loadReceipts()
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
                <div className={overlayStyles}>
                    <div className={overlayStyles + "bg-gray-900 bg-opacity-50"}>
                        <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 leading-4 bg-white p-4 rounded-md w-1/2 h-1/2"}>
                            <button className={"absolute top-0 right-0 p-2 border-black rounded-lg bg-white"} onClick={()=>setModal(false)}>Close</button>
                                {
                                    paid ?
                                        (<>
                                                {confirmationLoading ? (
                                                    <Spinner fullWidth={true} />
                                                ) : (
                                                    <>
                                                        <p className={"mb-4"}>Was paid : {format(new Date(confirmation?.date), 'MMMM do yyyy hh:mm a')}</p>
                                                        <p className={"mb-4 text-center truncate leading-6"}>{confirmation.description}</p>
                                                        <p className={"mb-4 truncate text-center font-bold"}>{confirmation.amount},-</p>
                                                        <p className={"mb-4 text-center truncate leading-6"}>Contact person : {confirmation.contactPerson}</p>
                                                        <p className={"mb-4 text-center truncate"}>Unique id: {confirmation._id}</p>

                                                        <div className={"mb-2 flex flex-wrap gap-2 justify-center items-center"}>
                                                            {!!confirmation?.files?.length ? (
                                                                confirmation?.files.map((link, index) => (
                                                                    <Link key={index} href={link} rel="noopener noreferrer" target="_blank" className={"font-bold"}>
                                                                        Attached file {index + 1}
                                                                    </Link>
                                                                ))
                                                            ) : (
                                                                <p>No confirmation screenshots found</p>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                            )
                                        :
                                        (
                                            <div className={"flex flex-col h-full w-full justify-center items-center"}>
                                                <p className={"text-center text-lg text-bold font-bold"}>To pay : {amount},-</p>
                                                <p className={"text-center text-lg text-bold mt-2"}>{description}</p>
                                                <div className={"flex flex-col justify-center items-center gap-2"}>
                                                    <h1 className={"font-bold text-2xl"}>Attached files :</h1>
                                                    {!files.length && (<p>Not found</p>)}
                                                    {files?.length > 0 && (
                                                        files.map((file, index) => (
                                                            <Link href={file} rel="noopener noreferrer" target="_blank"
                                                            > Attached file {index+1}</Link>
                                                        ))
                                                    )}
                                                </div>
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

