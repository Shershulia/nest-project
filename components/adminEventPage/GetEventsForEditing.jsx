import React, {useEffect, useState} from 'react';
import axios from "axios";
import {EventEditRow, SearchBar, Spinner, Title} from "@/components";
import Image from "next/image";
import Swal from "sweetalert2";

const GetEventsForEditing = ({isMeetingForm = false}) => {
    const [allEvents, setAllEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [fetchedData, setFetchedData] = useState([])

    const loadEvents  = () =>{
        setIsLoading(true);
        axios.get(isMeetingForm ? "/api/documents" :"/api/events").then(response=>{
            setAllEvents(response.data)
            console.log(response.data)

            setFetchedData(response.data)
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        loadEvents()
    },[])

    const deleteEvent = (_id,name) =>{
        Swal.fire({
            title: `Do you want to delete the ${isMeetingForm ? "document" :"event"} ${name}?`,
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`/api/${isMeetingForm ? "documents" :"events"}/?id=${_id}`);
                await Swal.fire('Deleted!', '', 'success');
                loadEvents();
            }
        })
    }

    return (
        <div className={"w-full"}>
            <SearchBar data={allEvents} setData={setAllEvents} originalData={fetchedData} title={`Search for ${isMeetingForm ? "document" :"event"}`} isDocuments={isMeetingForm}/>
            {isLoading && <Spinner fullWidth={true}/>}
            {( allEvents.length>0 && !isLoading ) && (
                <>
                    <div className={"w-full"}>{
                        allEvents.map((event,index) => (
                            <div key={index} className={"w-full flex justify-between border border-y-black border-r-black rounded-lg"}>
                                <EventEditRow event={event} deleteEvent={deleteEvent} isDocument={isMeetingForm}/>
                            </div>
                        ))}
                    </div>
                </>

            )}
            {( allEvents.length===0 && !isLoading ) && (
                <div>No {isMeetingForm ? "documents" :"events"} found</div>
            )}
        </div>
    );
};

export default GetEventsForEditing;