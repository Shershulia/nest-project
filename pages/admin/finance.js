import {AdminLayout, WrongPermission} from "@/components";
import React, {useState} from "react";
import {getAdminServerSideProps} from "@/utils/adminUtils";

const FinanceAdminPage = ({isAdmin}) => {
    const [navigationState, setNavigationState] = useState("Confirmed")
    return (
        isAdmin ? (
            <div className="h-full flex bg-blue-600">
                <AdminLayout>
                    <div className={"w-full flex bg-blue-600"}>
                        <button onClick={()=>{setNavigationState("Confirmed")}}
                            className={`w-1/2 border pointer border-black py-4 rounded-t-full text-center transition-all duration-500 ${navigationState==="Confirmed" ? "bg-gray-200" : "bg-white"}`} >
                            <p>List of confirmed</p>
                        </button>
                        <button onClick={()=>{setNavigationState("New")}}
                            className={`w-1/2 border pointer border-black py-4 rounded-t-full text-center transition-all duration-500 ${navigationState==="New" ? "bg-gray-200" : "bg-white"}`}>
                            <p>New receipts</p>
                        </button>

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
