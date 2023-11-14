import {AdminLayout, ReceiptRow, Spinner, WrongPermission} from "@/components";
import React, {useEffect, useState} from "react";
import {getAdminServerSideProps} from "@/utils/adminUtils";
import axios from "axios";

const FinanceAdminPage = ({isAdmin}) => {
    const [navigationState, setNavigationState] = useState("All")
    const [receipts, setReceipts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadReceipts = () =>{
        setIsLoading(true);
        if (navigationState==="Confirmed"){
            axios.get("/api/admin/receipts/?nav=confirmed").then(res=>{
                setReceipts(res.data);
                setIsLoading(false)
            })
        }else if (navigationState==="All"){
            axios.get("/api/admin/receipts/?nav=all").then(res=>{
                setReceipts(res.data);
                setIsLoading(false)
            })
        }else{
            axios.get("/api/admin/receipts/?nav=new").then(res=>{
                setReceipts(res.data);
                setIsLoading(false)
            })
        }

    }

    useEffect(()=>{
        loadReceipts();
    },[navigationState])
    return (
        isAdmin ? (
            <div className="h-full flex bg-blue-600">
                <AdminLayout>
                    <div className={"w-full flex bg-blue-600"}>
                        <button onClick={()=>{setNavigationState("All")}}
                                className={`w-1/2 border pointer border-black py-4 rounded-t-full text-center transition-all duration-500 ${navigationState==="All" ? "bg-gray-200" : "bg-white"}`}>
                            <p>All receipts</p>
                        </button>
                        <button onClick={()=>{setNavigationState("Confirmed")}}
                            className={`w-1/2 border pointer border-black py-4 rounded-t-full text-center transition-all duration-500 ${navigationState==="Confirmed" ? "bg-gray-200" : "bg-white"}`} >
                            <p>List of confirmed</p>
                        </button>
                        <button onClick={()=>{setNavigationState("New")}}
                            className={`w-1/2 border pointer border-black py-4 rounded-t-full text-center transition-all duration-500 ${navigationState==="New" ? "bg-gray-200" : "bg-white"}`}>
                            <p>New receipts</p>
                        </button>
                    </div>
                    <div className={"w-full h-full"}>
                        {isLoading ?
                            (<Spinner fullWidth={true}/>)
                            :
                            (<div className={"h-full flex justify-center items-center"}>
                                    {receipts?.length>0 ?
                                        (<div className={"w-full"}>
                                            {receipts.map((receipt, index)=>(
                                                <ReceiptRow receipt={receipt} index={index} key={index}/>
                                            ))}
                                        </div>)
                                        : (<p>No receipts found</p>)}
                            </div>

                            )}

                    </div>
                </AdminLayout>
            </div>)
            :
            (<WrongPermission/>)
    )
}
export default FinanceAdminPage;

export async function getServerSideProps(ctx){
    return await getAdminServerSideProps(ctx);
}
