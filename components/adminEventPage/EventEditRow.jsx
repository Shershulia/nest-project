import React, {useState} from 'react';
import Image from "next/image";
import {EventForm} from "@/components";
import {format} from "date-fns";

const EventEditRow = ({event,deleteEvent}) => {
    const [editMode, setEditMode] = useState(false);
    const {_id , name , description, date, contactPerson, place , price, numberOfPeople, images} = event
    console.log({_id , name , description, date, contactPerson, place , price, numberOfPeople, images} )
    return (
        <div className={"w-full flex"}>
            {!editMode && (
                <>
                    <div className={"flex w-2/3 items-center justify-start gap-10"}>
                        {images.length>0 ? (
                                <div className={"h-[100px] w-[100px] ml-2"}>
                                    <img src={event.images[0]} alt={"Uploaded image"} className={"rounded-lg h-full w-full object-cover"}/>
                                </div>
                            ) :
                            (<div className={"h-[100px] w-[100px] ml-2"}></div>)}
                        <h1 className={"text-lg font-bold w-[50px]"}>{event.name}</h1>
                        <p className={"w-[50px] truncate"}>{event.description}</p>
                        <p className={"max-w-1/3"}>{format(new Date(event.date), 'MMMM do yyyy hh:mm a')}</p>
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
            {editMode && (<EventForm _id={_id} description={description} title={name}
                                     date={date} contactPerson={contactPerson} place={place}
                                     price={price} numberOfPeople={numberOfPeople} images={images}
            />)}
        </div>
    );
};

export default EventEditRow;