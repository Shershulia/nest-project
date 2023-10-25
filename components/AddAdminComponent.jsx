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
            <Input value={addUser} onChange={setAddUser} label={"Input his email"} className={"w-1/3 p-2 rounded-t-lg"}></Input>
            <button className={"bg-green-600 text-lg font-bold p-2 w-1/3 rounded-b-lg border-black"}>+</button>
            <h1 className={"py-4"}>OR</h1>
            <h2 className={"py-2"}>Find user by mail</h2>
            <div className={"flex flex-col justify-center items-center w-1/3"}>
                {allUsers.length ?
                    (<select className={"border-2 border-black text-center rounded-t-lg p-2 w-full"}>
                        {allUsers?.map((user,index)=>(
                                <option key={index} value={user} className={"p-4"}>{user}</option>
                            )
                        )}
                    </select>) :
                    (<Spinner fullWidth={true}/>)
                }
                <button className={"bg-green-600 text-lg font-bold p-2 w-full rounded-b-lg border-black"}>+</button>

            </div>



        </div>
    );
};

export default AddAdminComponent;