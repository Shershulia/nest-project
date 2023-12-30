import React from 'react';
import {format} from "date-fns";
import {ReceiptModal} from "@/components";

const ReceiptRow = ({receipt,index}) => {
    const {_id,description,date,amount,contactPerson,paid,files} = receipt
    return (
        <div className={`flex w-full justify-between items-center border-x border-b border-black bg-opacity-60 ${paid ? "bg-green-400" : "bg-red-400"}`}>
            <div className={"flex gap-10 w-2/3"}>
                <p className={"w-1/5 text-center"}>{format(new Date(date), 'do MMMM')}</p>
                <p className={"w-1/5 text-center truncate"}>{description}</p>
                <p className={"w-1/10 truncate text-center font-bold"}>{amount},-</p>
                <p className={"w-1/5 text-center truncate "} >{contactPerson}</p>
            </div>
            <ReceiptModal receipt={receipt}></ReceiptModal>
        </div>
    );
};

export default ReceiptRow;