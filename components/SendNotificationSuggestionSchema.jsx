import React, {useState} from 'react';
import {Input} from "@/components/index";
import axios from "axios";
import Swal from "sweetalert2";

const SendNotificationSuggestionSchema = () => {
    const [suggestion,setSuggestion] = useState("");
    const sendSuggestion = () =>{
        if(suggestion!==""){
         axios.post("/api/notify",{text:suggestion}).then(res=>{

             Swal.fire(
                 'Good job!',
                 `Your suggestion was send, now wait for admin approval`,
                 'success'
             ).then(res=>{
                 setSuggestion("")
             })
         }).catch((error) => {
             Swal.fire(
                 'Error',
                 "Hm... Something went wrong, please contact support with your case. " + error.message,
                 'error'
             )
         })
        }else{
            Swal.fire(
                'Error',
                "Notification is empty",
                'error'
            )
        }
    }
    return (
        <div className={"text-white w-full text-center text-xl flex flex-col gap-2 justify-center items-center"}>
            <h1>Send notification to all user</h1>
            <Input onChange={setSuggestion} value={suggestion} className={"w-1/2 rounded-lg bg-transparent border-white"}/>
            <button onClick={sendSuggestion}
                className={"bg-transparent border-white border p-2 rounded-md hover:bg-purple-500 active:bg-purple-700 duration-700 w-full md:w-1/4"}>
                Send</button>
        </div>
    );
};

export default SendNotificationSuggestionSchema;