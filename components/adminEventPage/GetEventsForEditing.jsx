import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Spinner} from "@/components";

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
        <div>
            {isLoading && <Spinner/>}
            {allEvents.length>0 && (
                <div>{
                    allEvents.map((event,index) => (
                        <div key={index}>
                            {event.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GetEventsForEditing;