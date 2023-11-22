import React, {useEffect, useState} from 'react';
import axios from "axios";
import {EventDisplayRow, SearchBar, Spinner, WhiteBox} from "@/components";
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
        <div className={"bg-white h-screen w-full"}>
            <RevealWrapper>
                <div className={"md:py-12 py-6 md:pl-60 w-1/2"}>
                        {eventsLoading ? (<Spinner fullWidth={true}/>) : (
                            <div className={"w-full flex flex-col gap-2"}>
                                {events.length ?
                                    events.map((event,index)=>(
                                        <EventDisplayRow event={event} key={index}/>
                                    )) : (<p>No events found with search option {filter}</p>)}
                            </div>
                        )
                        }
                </div>

            </RevealWrapper>
            <p>Events</p>
            <SearchBar searchValue={filter} setSearchValue={setFilter}/>

        </div>
    );
};

export default Events;