import React, {useState} from 'react';
import {getAdminServerSideProps} from "@/utils/adminUtils";
import {AdminLayout, ReceiptRow, Spinner, TopMenu, WrongPermission} from "@/components";

const ConfirmationsPage = ({isAdmin}) => {
    const [navState, setNavState] = useState("New users")
    return (
        isAdmin ? (
                <div className="h-full flex bg-blue-600">
                    <AdminLayout>
                        <TopMenu options={["New users","Confirmed users","Declined User"]}
                                 setNavigationState={setNavState}
                                 navigationState={navState}
                        />
                        <div className={"w-full h-full"}>
                            {/*{isLoading ?*/}
                            {/*    (<Spinner fullWidth={true}/>)*/}
                            {/*    :*/}
                            {/*    (<div className={"h-full flex justify-center items-center"}>*/}
                            {/*            {receipts?.length>0 ?*/}
                            {/*                (<div className={"w-full"}>*/}
                            {/*                    {receipts.map((receipt, index)=>(*/}
                            {/*                        <ReceiptRow receipt={receipt} index={index} key={index}/>*/}
                            {/*                    ))}*/}
                            {/*                </div>)*/}
                            {/*                : (<p>No receipts found</p>)}*/}
                            {/*        </div>*/}

                            {/*    )}*/}

                        </div>
                    </AdminLayout>
                </div>):
            (
                <WrongPermission/>
            )
    );
};

export default ConfirmationsPage;

export async function getServerSideProps(ctx){
    return await getAdminServerSideProps(ctx);
}