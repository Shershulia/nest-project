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
        }else if (navState==="Declined users"){
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
                <div className="h-full flex">
                    <AdminLayout backgroundColor={"transparent"}>
                        <div className={"w-full flex text-white"}>
                            <button onClick={()=>{setNavState("New users")}}
                                    className={`w-1/3 border pointer border-white py-4 rounded-t-full text-center transition-all duration-500 bg-opacity-70 ${navState==="New users" ? "bg-customPurple" : "bg-customDarkPurple"}`}>
                                <p>All receipts</p>
                            </button>
                            <button onClick={()=>{setNavState("Confirmed users")}}
                                    className={`w-1/3 border pointer border-white py-4 rounded-t-full text-center transition-all duration-500 bg-opacity-70 ${navState==="Confirmed users" ? "bg-customPurple" : "bg-customDarkPurple"}`} >
                                <p>List of confirmed</p>
                            </button>
                            <button onClick={()=>{setNavState("Declined users")}}
                                    className={`w-1/3 border pointer border-white py-4 rounded-t-full text-center transition-all duration-500 bg-opacity-70 ${navState==="Declined users" ? "bg-customPurple" : "bg-customDarkPurple"}`}>
                                <p>New receipts</p>
                            </button>
                        </div>
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
                                                            <div className={`bg-opacity-30 w-1/3 border-r border-b 
                                                             ${navState==="New users" && "bg-yellow-400 " }
                                                             ${navState==="Confirmed users" && "bg-green-400 " }
                                                             ${navState==="Declined users" && "bg-red-400 " }
                                                             border-black flex `}>
                                                               {navState==="New users"
                                                                   &&
                                                                   (
                                                                       <div className={"w-full flex flex-col"}>
                                                                           <div className={"w-full h-full flex"}>
                                                                               <button className={"w-11/12 m-4 font-bold truncate rounded-lg bg-green-400 hover:bg-green-600 duration-500 p-2"}
                                                                                       onClick={()=>{confirmUser(user)}}>Confirm</button>
                                                                               <button className={"w-11/12 m-4 font-bold truncate rounded-lg bg-red-400 hover:bg-red-600 duration-500 p-2"}
                                                                                       onClick={()=>{declineUser(user)}}
                                                                               >Decline</button>
                                                                           </div>
                                                                       </div>

                                                                   )}
                                                                {navState==="Declined users"
                                                                    &&
                                                                    (
                                                                        <div className={"w-full flex"}>
                                                                                <button className={"w-11/12 m-4 font-bold truncate rounded-lg bg-green-400 hover:bg-green-600 duration-500 p-2"}
                                                                                        onClick={()=>{confirmUser(user)}}>Change decision</button>
                                                                        </div>

                                                                    )}
                                                                {navState==="Confirmed users"
                                                                    &&
                                                                    (
                                                                        <div className={"w-full flex"}>
                                                                            <button className={"w-11/12 m-4 font-bold p-2 truncate rounded-lg bg-red-400 hover:bg-red-600 duration-500"}
                                                                                    onClick={()=>{declineUser(user)}}
                                                                            >Change decision</button>
                                                                        </div>

                                                                    )}
                                                            </div>
                                                    </div>
                                                ))}
                                            </div>)
                                            : (<p className={"text-white"}>No users found</p>)}
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