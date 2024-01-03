import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Spinner, Title} from "@/components";
import Swal from "sweetalert2";

const DeleteAdmin = () => {
    const [deleteAdmin, setDeleteAdmin] = useState("");
    const [allAdmins,setAllAdmins]=useState([]);

    useEffect(()=> {
        axios.get("/api/admin/admin").then(res => {
            setAllAdmins(res.data)
        }).catch((error) => {
            console.log(error);
        })
    },[]);
    const deleteAdminFun = () =>{
        axios.delete(`/api/admin/admin/?id=${deleteAdmin}`).then(res=>{
            Swal.fire(
                'Good job!',
                `Admin was deleted successfully`,
                'success'
            )
        }).catch((error) => {
            Swal.fire(
                'Error',
                "Hm... Something went wrong, please contact support with your case. " + error.message,
                'error'
            )
        })
    }

    return (
        <div className={"flex flex-col justify-center items-center w-full"}>
            <Title text={"Delete admin by mail"} color={"text-white"}/>
            <div className={"flex flex-col justify-center items-center md:w-1/3 w-3/4"}>
                {allAdmins.length ?
                    (<>
                            <select className={"border-2 border-black text-center rounded-t-lg p-2 w-full border-white"}
                                    value={deleteAdmin} onChange={event => setDeleteAdmin(event.target.value)}
                            >
                                <option value={""} className={"p-4"}>Choose email</option>
                                {allAdmins?.map((user,index)=>(
                                        <option key={index} value={user._id} className={"p-4"}>{user.email}</option>
                                    )
                                )}
                            </select>
                            <button className={"bg-rose-700 hover:bg-rose-800 duration-500" +
                                " transition-all text-lg font-bold p-2 w-full rounded-b-lg border-black"}
                                    onClick={deleteAdminFun}>-</button>
                    </>
                        ) :
                    (<Spinner fullWidth={true}/>)
                }


            </div>



        </div>
    );
};

export default DeleteAdmin;