import React, {useEffect, useState} from 'react';
import Input from "@/components/Input";
import axios from "axios";
import {Spinner, Title} from "@/components";
import Swal from "sweetalert2";

const AddAdminComponent = () => {
    const [deleteAdmin, setDeleteAdmin] = useState("");
    const [allAdmins,setAllAdmins]=useState([]);

    useEffect(()=> {
        axios.get("/api/admin").then(res => {
            const arrayOfEmails = res.data.map(obj => obj.email);
            setAllAdmins(arrayOfEmails)
        }).catch((error) => {
            console.log(error);
        })
    },[]);
    const addUserFun = () =>{
        axios.post("/api/admin",{email:addUser}).then(res=>{

            Swal.fire(
                'Good job!',
                `Admin with email ${res.data.email} was deleted successfully`,
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
            <Title text={"Delete admin by mail"}/>
            <div className={"flex flex-col justify-center items-center w-1/3"}>
                {allAdmins.length ?
                    (<>
                            <select className={"border-2 border-black text-center rounded-t-lg p-2 w-full"}
                                    value={deleteAdmin} onChange={event => setDeleteAdmin(event.target.value)}
                            >
                                <option value={""} className={"p-4"}>Choose email</option>
                                {allAdmins?.map((user,index)=>(
                                        <option key={index} value={user} className={"p-4"}>{user}</option>
                                    )
                                )}
                            </select>
                            <button className={"bg-red-600 text-lg font-bold p-2 w-full rounded-b-lg border-black"}
                                    onClick={addUserFun}>-</button>
                    </>
                        ) :
                    (<Spinner fullWidth={true}/>)
                }


            </div>



        </div>
    );
};

export default AddAdminComponent;