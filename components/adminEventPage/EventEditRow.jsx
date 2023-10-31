import React, {useState} from 'react';
import Image from "next/image";
import {EventForm} from "@/components";

const EventEditRow = ({event,deleteEvent}) => {
    const [editMode, setEditMode] = useState(false);
    const {_id , name , description, date, contactPerson, place , price, numberOfPeople, images} = event
    return (
        <div className={"w-full flex"}>
            {!editMode && (
                <>
                    <div className={"flex w-2/3 items-center justify-start gap-10"}>
                        <Image src={event.images[0]} width={100} height={100} className={"ml-2"}/>
                        <h1 className={"text-lg font-bold"}>{event.name}</h1>
                        <h2 className={"max-w-1/3"}>{event.description}</h2>
                        <h2 className={"max-w-1/3"}>{event.place}</h2>
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