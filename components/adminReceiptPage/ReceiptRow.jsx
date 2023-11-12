import React from 'react';
import {format} from "date-fns";
import {PaperClipIcon, ReceiptModal} from "@/components";

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
            <ReceiptModal receipt={receipt}></ReceiptModal>
        </div>
    );
};

export default ReceiptRow;