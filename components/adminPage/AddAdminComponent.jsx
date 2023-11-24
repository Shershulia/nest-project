import React, {useEffect, useState} from 'react';
import Input from "@/components/Input";
import axios from "axios";
import {Spinner, Title} from "@/components";
import Swal from "sweetalert2";

const AddAdminComponent = () => {
    const [addUser, setAddUser] = useState("");
    const [allUsers,setAllUsers]=useState([]);

    useEffect(()=> {
        axios.get("/api/admin/users").then(res => {
            const arrayOfEmails = res.data.map(obj => obj.email);
            setAllUsers(arrayOfEmails)
        }).catch((error) => {
            console.log(error);
        })
    },[]);
    const addUserFun = () =>{
        axios.post("/api/admin/admin",{email:addUser}).then(res=>{

            Swal.fire(
                'Good job!',
                `Admin with email ${res.data.email} was added successfully`,
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
            <Title text={"Add admin"}></Title>
            <Input value={addUser} onChange={setAddUser} className={"w-1/3 p-2 rounded-t-lg"}></Input>
            <button className={"bg-green-600 text-lg font-bold p-2 w-1/3 rounded-b-lg border-black"}
                    onClick={addUserFun}>+</button>
            <h1 className={"py-4 font-semibold"}>OR</h1>
            <div className={"flex flex-col justify-center items-center w-1/3"}>
                {allUsers.length ?
                    (<>
                        <select className={"border-2 border-black text-center rounded-t-lg p-2 w-full"}
                                value={addUser} onChange={event => setAddUser(event.target.value)}
                        >
                            <option value={""} className={"p-4"}>Choose email</option>
                            {allUsers?.map((user,index)=>(
                                    <option key={index} value={user} className={"p-4"}>{user}</option>
                                )
                            )}
                        </select>
                        <button className={"bg-green-600 text-lg font-bold p-2 w-full rounded-b-lg border-black"}
                                onClick={addUserFun}>+</button>
                    </>) :
                    (<Spinner fullWidth={true}/>)
                }


            </div>



        </div>
    );
};

export default AddAdminComponent;