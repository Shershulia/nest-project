import React, {useEffect, useState} from 'react';
import {Input, Spinner, Title} from "@/components";
import axios from "axios";
import Swal from "sweetalert2";

const UsersNotificationComponents = ({socket}) => {
    const [notificationToSend, setNotificationToSend]= useState("")
    const [suggestionIndex,setSuggestionIndex] = useState(0);
    const [suggestions,setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const loadNotifications = () =>{
        setIsLoading(true);
        axios.get("/api/notifications").then(res => {
            setSuggestions(res.data)
            setNotificationToSend(res?.data[0].text)
        }).catch((error) => {
            console.log(error);
        })
        setIsLoading(false);

    }
    useEffect(()=> {
        loadNotifications()
    },[]);
    const sendNotification = async (event)=> {
        event.stopPropagation();
        event.preventDefault();
        // Send the message to the server
        const stringToSend = `${suggestions[suggestionIndex].email},\n${notificationToSend}`
        if (socket) {
            socket.emit('message', stringToSend);
        }
        axios.delete(`/api/notifications?id=${suggestions[suggestionIndex]._id}`).then(
            res => {
                setNotificationToSend('');
                Swal.fire(
                    'Good job!',
                    `Notification ${stringToSend} was send`,
                    'success'
                ).then(async res => {
                    await loadNotifications();
                })
            }
        ).catch((error) => {
            Swal.fire(
                'Error',
                "Hm... Something went wrong, please contact support with your case. " + error.message,
                'error'
            )
        })
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
                        <Title text={"Users notification"} className={"text-white"}></Title>
                        <div className={"flex justify-center items-center gap-4"}>
                            <button onClick={previousNotification}>
                                <i class="bi bi-arrow-left-square text-xl text-white"></i>
                            </button>
                            <button onClick={nextNotification}>
                                <i class="bi bi-arrow-right-square text-xl text-white"></i>
                            </button>
                        </div>
                    </div>
                    {suggestions.length ? (<>
                        <p className={"text-white"}>By user : {suggestions[suggestionIndex].email}</p>

                        <Input value={notificationToSend}
                               onChange={setNotificationToSend}
                               className={"w-1/3 p-2 rounded-t-lg"} />

                        <button className={"bg-customLightPurple hover:bg-violet-700 transition-all duration-500" +
                            " text-lg font-bold p-2 w-1/3 rounded-b-lg border-black"}
                                onClick={(event)=>sendNotification(event)}>Send notification</button>
                    </>) : (<p>No suggestions found</p>)}

                </>
            )}
        </div>
    );
};

export default UsersNotificationComponents;