import React from 'react';
import {format} from "date-fns";
import {PaperClipIcon} from "@/components";

const ReceiptRow = ({receipt,index}) => {
    const {_id,description,date,amount,contactPerson,paid,files} = receipt
    return (
        <div className={`flex w-full justify-between items-center border-x border-b border-black bg-opacity-30 ${paid ? "bg-green-400" : "bg-red-400"}`}>
            <div className={"flex gap-10 w-2/3"}>
                <p>{format(new Date(date), 'do MMMM yyyy hh:mm')}</p>
                <p>{description}</p>
                <p className={"font-bold"}>{amount},-</p>
                <p>{contactPerson}</p>
            </div>
            {paid ? (
                <button className={"flex w-1/3 h-full justify-center items-center border-x border-black p-2 hover:bg-green-400 transition-all duration-500 gap-2"}>
                    <p>See payments</p>
                    <PaperClipIcon/>
                </button>
            ):(
                <button className={"flex w-1/3 h-full justify-center items-center border-x border-black p-2 hover:bg-red-400 transition-all duration-500"}>Pay</button>
            )}
        </div>
    );
};

export default ReceiptRow;