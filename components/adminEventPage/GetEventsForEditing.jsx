import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Spinner, Title} from "@/components";
import Image from "next/image";

const GetEventsForEditing = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        axios.get("/api/events").then(response=>{
            setAllEvents(response.data)
            setIsLoading(false)
        })

    },[])
    return (
        <div className={"w-full"}>
            {isLoading && <Spinner fullWidth={true}/>}
            {allEvents.length>0 && (
                <div className={"w-full border border-b-black border-x-black"}>{
                    allEvents.map((event,index) => (
                        <div key={index} className={"w-full flex justify-between"}>
                            <div className={"flex w-2/3 items-center justify-start gap-10"}>
                                <Image src={event.images[0]} width={100} height={100}/>
                                <h1 className={"text-lg font-bold"}>{event.name}</h1>
                                <h2 className={"max-w-1/3"}>{event.description}</h2>
                                <h2 className={"max-w-1/3"}>{event.place}</h2>

                            </div>
                            <div className={"flex w-1/3 p-6 gap-6"}>
                                <button className={"bg-yellow-600 text-lg font-bold p-2 rounded-lg border-black w-full"}
                                        onClick={()=>{}}>Edit</button>
                                <button className={"bg-red-600 text-lg font-bold p-2 rounded-lg border-black w-full"}
                                        onClick={()=>{}}>Delete</button>

                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GetEventsForEditing;