import React, {useState} from 'react';
import Image from "next/image";
import {DocumentForm, EventForm} from "@/components";
import {format} from "date-fns";

const EventEditRow = ({event,deleteEvent, isDocument}) => {
    const [editMode, setEditMode] = useState(false);
    const arrayWithDocumentsOrImages = isDocument ? event.documents : event.images
    return (
        <div className={"w-full flex"}>
            {!editMode && (
                <>
                    <div className={"flex w-2/3 items-center justify-start gap-10"}>
                        {arrayWithDocumentsOrImages.length>0 ? (
                                <div className={"h-[100px] w-[100px] ml-2"}>
                                    {isDocument ? (
                                        <label className={"rounded-lg h-full w-full flex justify-center items-center border rounded-lg"}>{arrayWithDocumentsOrImages[0].split(".com/")[1]}</label>
                                    ) : (
                                        <img src={arrayWithDocumentsOrImages[0]} alt={"Uploaded image"} className={"rounded-lg h-full w-full object-cover"}/>
                                    )
                                    }
                                </div>
                            ) :
                            (<div className={"h-[100px] w-[100px] ml-2"}></div>)}
                        <h1 className={"text-lg font-bold w-[10%] truncate"}>{!isDocument ? event.name: event.title}</h1>
                        <p className={"w-[50px] truncate"}>{event.description}</p>
                        {event.date !==null && (<p className={"max-w-1/3"}>{format(new Date(event.date), 'MMMM do yyyy hh:mm a')}</p>)}
                    </div>
                    <div className={"flex w-1/3 p-6 gap-6"}>
                        <button className={"bg-yellow-600 text-lg font-bold p-2 rounded-lg border-black w-full"}
                                onClick={()=>{setEditMode(prevState => !prevState)}}>Edit</button>
                        <button className={"bg-red-600 text-lg font-bold p-2 rounded-lg border-black w-full"}
                                onClick={()=>{deleteEvent(event._id,event.name)}}>Delete</button>
                    </div>
                </>

            )
            }
            {(editMode && !isDocument) && (<EventForm _id={event._id} description={event.description} title={event.name}
                                     date={event.date} contactPerson={event.contactPerson} place={event.place}
                                     price={event.price} numberOfPeople={event.numberOfPeople} images={event.images}
            />)}
            {(editMode && isDocument) && (<DocumentForm _id={event._id} description={event.description} title={event.title}
                                                      date={event.date} isDownloadable={event.isDownloadable} documents={event.documents}
            />)}
        </div>
    );
};

export default EventEditRow;