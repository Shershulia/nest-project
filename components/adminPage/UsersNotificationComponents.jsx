import React, {useEffect, useState} from 'react';
import {Input, Spinner, Title} from "@/components";
import axios from "axios";

const UsersNotificationComponents = ({socket}) => {
    const [notificationToSend, setNotificationToSend]= useState("")
    const [suggestionIndex,setSuggestionIndex] = useState(0);
    const [suggestions,setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=> {
        setIsLoading(true);
        axios.get("/api/notifications").then(res => {
            setSuggestions(res.data)
            setNotificationToSend(res?.data[0].text)
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
        })
    },[]);
    const sendNotification = (event)=>{
        event.preventDefault();
    }
    const nextNotification = () =>{
        if (suggestionIndex===suggestions.length-1){
            setSuggestionIndex(0);
            setNotificationToSend(suggestions[0].text)
        }else{
            setSuggestionIndex(prevState => prevState+1);
            setNotificationToSend(suggestions[suggestionIndex+1].text)

        }
    }
    const previousNotification = () =>{
        if (suggestionIndex===0){
            setSuggestionIndex(suggestions.length-1);
            setNotificationToSend(suggestions[suggestions.length-1].text)
        }else{
            setSuggestionIndex(prevState => prevState-1);
            setNotificationToSend(suggestions[suggestionIndex-1].text)

        }
    }

    return (
        <div className={"flex flex-col justify-center w-full items-center"}>
            {isLoading ? (<Spinner/>) : (
                <>
                    <div className={"flex justify-center items-center gap-4"}>
                        <Title text={"Users notification"}></Title>
                        <div className={"flex justify-center items-center gap-4"}>
                            <button onClick={previousNotification}>
                                <i class="bi bi-arrow-left-square text-xl"></i>
                            </button>
                            <button onClick={nextNotification}>
                                <i class="bi bi-arrow-right-square text-xl"></i>
                            </button>
                        </div>
                    </div>
                    <p>By user : {suggestions[suggestionIndex].email}</p>

                    <Input value={notificationToSend}
                           onChange={setNotificationToSend}
                           className={"w-1/3 p-2 rounded-t-lg"} />
                    <button className={"bg-green-600 text-lg font-bold p-2 w-1/3 rounded-b-lg border-black"}
                            onClick={(event)=>sendNotification(event)}>Send notification</button>
                </>
            )}
        </div>
    );
};

export default UsersNotificationComponents;