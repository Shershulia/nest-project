import {AdminLayout, ReceiptRow, Spinner, TopMenu, WrongPermission} from "@/components";
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
                    <TopMenu options={["All","Confirmed","New"]}
                             setNavigationState={setNavigationState}
                             navigationState={navigationState} />
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
