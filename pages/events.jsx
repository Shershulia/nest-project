import React, {useEffect, useState} from 'react';
import axios from "axios";
import {EventDisplayRow, FrontendLayout, LittleEventPage, SearchBar, Spinner, Switcher, WhiteBox} from "@/components";
import {RevealWrapper} from "next-reveal";

const Events = () => {
    const [events,setEvents] = useState([]);
    const [eventsLoading,setEventsLoading] = useState(true);
    const [filter, setFilter] = useState("");

    const [beforeFlag, setBeforeFlag] = useState(false)
    const [freePlacesFlag, setFreePlacesFlag] = useState(false)

    const getEvents = () =>{
        setEventsLoading(true)
        axios.get(`/api/events?search=${filter}&before=${beforeFlag}&freePlacesFlag=${freePlacesFlag}`)
            .then(res=>{
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

            <RevealWrapper className={"sm:w-3/12 w-2/3 h-full mb-4 sm:mb-0"}>
                <WhiteBox>
                    <div className={"p-4"}>
                        <div className={"mb-2 flex flex-col items-center justify-center"}>
                            <SearchBar searchValue={filter} setSearchValue={setFilter}
                                       className={"w-full"} placeholder={"Search for event"}
                                       title={"Search"}/>
                        </div>


                        <div className={"flex flex-col"}>
                            <Switcher value={beforeFlag} setValue={setBeforeFlag} title={"Previous events"} className={"my-2"} />
                            <Switcher value={freePlacesFlag} setValue={setFreePlacesFlag} title={"Free places"} className={"mb-2"} />
                        </div>


                        <hr className={"rounded-lg w-11/12 m-auto bg-gray-300 h-[4px] mb-2"}/>
                        <button onClick={getEvents}
                                className={"m-auto w-full bg-blue-600 border rounded-lg text-white flex " +
                                    "justify-center items-center py-2 transition-all duration-500 font-semibold " +
                                    "hover:bg-white hover:text-blue-600 hover:border-blue-600 mb-2"}>Search</button>
                        <button onClick={()=>{setFilter("")}}
                                className={"m-auto w-full border rounded-lg text-white flex " +
                                    "justify-center items-center hover:bg-red-300 hover:opacity-50 hover:border-white " +
                                    "py-2 transition-all duration-500 font-semibold " +
                                    "bg-white text-red-600 border-red-600 hover:text-white"}>Clear</button>
                    </div>
                </WhiteBox>
            </RevealWrapper>

            <RevealWrapper className={"w-2/3"}>
                <WhiteBox>
                    {eventsLoading ? (
                        <div className={"w-full flex flex-col gap-2 p-6"}>
                            <Spinner fullWidth={true}/>
                        </div>
                        ) : (
                        <div className={"w-full flex flex-col gap-2 p-4"}>
                            {events.length ?
                                events.map((event,index)=>(
                                    <>
                                        <EventDisplayRow event={event} key={index}/>
                                        <LittleEventPage event={event}/>
                                    </>
                                )) : (<p>No events found with search option {filter}</p>)}
                        </div>
                    )
                    }
                </WhiteBox>
            </RevealWrapper>
        </FrontendLayout>
    );
};

export default Events;