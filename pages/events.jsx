import React, {useEffect, useState} from 'react';
import axios from "axios";
import {MagnifyingGlass, SearchBar} from "@/components";

const Events = () => {
    const [events,setEvents] = useState([]);
    const [eventsLoading,setEventsLoading] = useState(true);
    const [filter, setFilter] = useState("");

    const getEvents = () =>{
        setEventsLoading(true)
        axios.get(`/api/events?search=${filter}`).then(res=>{
            setEventsLoading(false)
            console.log(res.data)
        })
    }

    useEffect(()=>{
        getEvents()
    },[filter])
    return (
        <div className={"bg-white h-screen w-full"}>
            <p>Events</p>
            <SearchBar searchValue={filter} setSearchValue={setFilter}/>

        </div>
    );
};

export default Events;