import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Spinner, Title} from "@/components";
import Image from "next/image";
import Swal from "sweetalert2";

const GetEventsForEditing = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true)


    const loadEvents  = () =>{
        setIsLoading(true);
        axios.get("/api/events").then(response=>{
            setAllEvents(response.data)
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        loadEvents()
    },[])

    const deleteEvent = (_id,name) =>{
        Swal.fire({
            title: `Do you want to delete the event ${name}?`,
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`/api/events/?id=${_id}`);
                await Swal.fire('Deleted!', '', 'success');
                loadEvents();
            }
        })
    }

    
    return (
        <div className={"w-full"}>
            {isLoading && <Spinner fullWidth={true}/>}
            {( allEvents.length>0 && !isLoading ) && (
                <div className={"w-full"}>{
                    allEvents.map((event,index) => (
                        <div key={index} className={"w-full flex justify-between border border-b-black border-x-black"}>
                            <div className={"flex w-2/3 items-center justify-start gap-10"}>
                                <Image src={event.images[0]} width={100} height={100} className={"ml-2"}/>
                                <h1 className={"text-lg font-bold"}>{event.name}</h1>
                                <h2 className={"max-w-1/3"}>{event.description}</h2>
                                <h2 className={"max-w-1/3"}>{event.place}</h2>

                            </div>
                            <div className={"flex w-1/3 p-6 gap-6"}>
                                <button className={"bg-yellow-600 text-lg font-bold p-2 rounded-lg border-black w-full"}
                                        onClick={()=>{}}>Edit</button>
                                <button className={"bg-red-600 text-lg font-bold p-2 rounded-lg border-black w-full"}
                                        onClick={()=>{deleteEvent(event._id,event.name)}}>Delete</button>

                            </div>

                        </div>
                    ))}
                </div>
            )}
            {( allEvents.length===0 && !isLoading ) && (
                <div>No events found</div>
            )}
        </div>
    );
};

export default GetEventsForEditing;