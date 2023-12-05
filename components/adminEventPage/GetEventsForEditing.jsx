import React, {useEffect, useState} from 'react';
import axios from "axios";
import {EventOrDocumentEditRow, SearchBarEventOrDocument, Spinner, Title} from "@/components";
import Image from "next/image";
import Swal from "sweetalert2";

const GetEventsForEditing = ({isMeetingForm = false}) => {
    const [allEvents, setAllEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [fetchedData, setFetchedData] = useState([])

    const loadEvents  = () =>{
        setIsLoading(true);
        axios.get(isMeetingForm ? "/api/admin/documents" :"/api/admin/events").then(response=>{
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
                await axios.delete(`/api/admin/${isMeetingForm ? "documents" :"events"}/?id=${_id}`);
                await Swal.fire('Deleted!', '', 'success');
                loadEvents();
            }
        })
    }

    return (
        <div className={"w-full"}>
            <SearchBarEventOrDocument data={allEvents} setData={setAllEvents} originalData={fetchedData} title={`Search for ${isMeetingForm ? "document" :"event"}`} isDocuments={isMeetingForm}/>
            <div
                className={`opacity-0 transition-opacity duration-300 ${
                    isLoading ? '' : 'opacity-100'
                }`}
            >
                {isLoading ? (
                    <Spinner fullWidth={true} />
                ) : (
                    <>
                        {allEvents.length > 0 && !isLoading && (
                            <div className={'w-full '}>
                                {allEvents.map((event, index) => (
                                    <div
                                        key={index}
                                        className={'w-full flex justify-between border border-y-black border-r-black rounded-lg'}
                                    >
                                        <EventOrDocumentEditRow event={event} deleteEvent={deleteEvent} isDocument={isMeetingForm} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {( allEvents.length===0 && !isLoading ) && (
                <div>No {isMeetingForm ? "documents" :"events"} found</div>
            )}
        </div>
    );
};

export default GetEventsForEditing;