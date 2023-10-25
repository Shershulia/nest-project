import React, {useEffect, useState} from 'react';
import Input from "@/components/Input";
import axios from "axios";
import {Spinner} from "@/components/index";

const AddAdminComponent = () => {
    const [addUser, setAddUser] = useState("");
    const [allUsers,setAllUsers]=useState([]);
    console.log(addUser)
    useEffect(()=>{
        axios.get("/api/users").then(res=> {
            const arrayOfEmails = res.data.map(obj => obj.email);
            setAllUsers(arrayOfEmails)
        })
        }
        ,[])
    return (
        <div className={"flex flex-col justify-center items-center w-full"}>
            <h1>Give user admin privilege</h1>
            <Input value={addUser} onChange={setAddUser} label={"Input his email"} className={"w-1/3 p-2"}></Input>
            <h1 className={"py-4"}>OR</h1>
            <h2>Find user by mail</h2>
            {allUsers.length ?
                (<select className={"border-2 border-black text-center rounded-lg p-2"}>
                    {allUsers?.map((user,index)=>(
                            <option key={index} value={user} className={"p-4"}>{user}</option>
                        )
                    )}
                </select>) :
                (<Spinner/>)
            }


        </div>
    );
};

export default AddAdminComponent;