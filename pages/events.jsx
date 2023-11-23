import React, {useEffect, useState} from 'react';
import axios from "axios";
import {EventDisplayRow, FrontendLayout, SearchBar, Spinner, WhiteBox} from "@/components";
import {RevealWrapper} from "next-reveal";

const Events = () => {
    const [events,setEvents] = useState([]);
    const [eventsLoading,setEventsLoading] = useState(true);
    const [filter, setFilter] = useState("");

    const getEvents = () =>{
        setEventsLoading(true)
        axios.get(`/api/events?search=${filter}`).then(res=>{
            setEvents(res.data)
            setEventsLoading(false)
        })
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getEvents()
        }, 1000)
        //every filter change will clear previous timer and restart the timer
        return () => clearTimeout(delayDebounceFn)
    }, [filter])

    return (
        <FrontendLayout>
            <RevealWrapper className={"w-full"}>
                <div className={"mb-8 flex flex-col items-center justify-center"}>
                    <p>Events</p>
                    <SearchBar searchValue={filter} setSearchValue={setFilter}
                               fullWidth={true} placeholder={"Search for event"}
                                title={"Search"}/>
                </div>
                        {eventsLoading ? (<Spinner fullWidth={true}/>) : (
                            <div className={"w-full flex flex-col gap-2"}>
                                {events.length ?
                                    events.map((event,index)=>(
                                        <EventDisplayRow event={event} key={index}/>
                                    )) : (<p>No events found with search option {filter}</p>)}
                            </div>
                        )
                        }
            </RevealWrapper>


        </FrontendLayout>
    );
};

export default Events;