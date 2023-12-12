import React, {useEffect, useState} from 'react';
import {getAdminServerSideProps} from "@/utils/adminUtils";
import {AdminLayout, Spinner, TopMenu, UserCardComponent, WrongPermission} from "@/components";
import axios from "axios";
import Swal from "sweetalert2";

const ConfirmationsPage = ({isAdmin}) => {
    const [navState, setNavState] = useState("New users")
    const [isLoading,setIsLoading] = useState(true);
    const [users,setUsers] = useState([]);


    const confirmUser = (user)=>{
        axios.post("/api/admin/users/operation/confirm",{email:user.email}).then(res=>{
            loadUsers();
        })
    }
    const declineUser = async (user) => {
        await Swal.fire({
            title: "Enter reason",
            input: "text",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!";
                }
            }
        }).then(res=>{
            axios.post("/api/admin/users/operation/decline", {email: user.email, reason:res.value}).then(res => {
                loadUsers();
            })
        });

    }

    const loadUsers = () =>{
        setIsLoading(true)
        if (navState==="New users"){
            axios.get("/api/admin/users/new").then(res=>{
                setUsers(res.data)
                setIsLoading(false)
            })
        }else if (navState==="Confirmed users"){
            axios.get("/api/admin/users/confirmed").then(res=>{
                setUsers(res.data)
                setIsLoading(false)
            })
        }else if (navState==="Declined User"){
            axios.get("/api/admin/users/declined").then(res=>{
                setUsers(res.data)
                setIsLoading(false)
            })
        }
    }


    useEffect(()=>{
        loadUsers()
    },[navState])
    return (
        isAdmin ? (
                <div className="h-full flex bg-blue-600">
                    <AdminLayout>
                        <TopMenu options={["New users","Confirmed users","Declined User"]}
                                 setNavigationState={setNavState}
                                 navigationState={navState}
                        />
                        <div className={"w-full h-full"}>
                            {isLoading ?
                                (<Spinner fullWidth={true}/>)
                                :
                                (<div className={"h-full flex justify-center items-center"}>
                                        {users?.length>0 ?
                                            (<div className={"w-full"}>
                                                {users.map((user, index)=>(
                                                    <div className={"flex"}>
                                                        <UserCardComponent key={index} user={user}/>
                                                            <div className={`bg-opacity-30 border-r border-b 
                                                             ${navState==="New users" && "bg-yellow-400 " }
                                                             ${navState==="Confirmed users" && "bg-green-400 " }
                                                             ${navState==="Declined User" && "bg-red-400 " }
                                                             border-black flex `}>
                                                               {navState==="New users"
                                                                   &&
                                                                   (
                                                                       <div className={"w-full flex flex-col"}>
                                                                           <div className={"w-full h-full flex"}>
                                                                               <button className={"w-full m-4 font-bold whitespace-nowrap rounded-lg bg-green-400 hover:bg-green-600 duration-500 p-2"}
                                                                                       onClick={()=>{confirmUser(user)}}>Confirm</button>
                                                                               <button className={"w-full m-4 font-bold whitespace-nowrap rounded-lg bg-red-400 hover:bg-red-600 duration-500 p-2"}
                                                                                       onClick={()=>{declineUser(user)}}
                                                                               >Decline</button>
                                                                           </div>
                                                                       </div>

                                                                   )}
                                                                {navState==="Declined User"
                                                                    &&
                                                                    (
                                                                        <div className={"w-full flex"}>
                                                                                <button className={"w-full m-4 font-bold whitespace-nowrap rounded-lg bg-green-400 hover:bg-green-600 duration-500 p-2"}
                                                                                        onClick={()=>{confirmUser(user)}}>Change decision</button>
                                                                        </div>

                                                                    )}
                                                                {navState==="Confirmed users"
                                                                    &&
                                                                    (
                                                                        <div className={"w-full flex"}>
                                                                            <button className={"w-full m-4 font-bold p-2 whitespace-nowrap rounded-lg bg-red-400 hover:bg-red-600 duration-500"}
                                                                                    onClick={()=>{declineUser(user)}}
                                                                            >Change decision</button>
                                                                        </div>

                                                                    )}
                                                            </div>
                                                    </div>
                                                ))}
                                            </div>)
                                            : (<p>No users found</p>)}
                                    </div>

                                )}

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