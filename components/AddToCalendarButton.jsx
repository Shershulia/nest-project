import React from 'react';
import {CalendarIcon} from "@/components/index";
import {createEvent} from "ics";
import { saveAs } from "file-saver";

const AddToCalendarButton = ({event : existingEvent}) => {
    const {_id,name, description, date,duration = 120, contactPerson,place}=existingEvent;
    const eventDate = new Date(date);

    const handleSave = () => {
        const event = {
            title: name,
            description: description,
            busyStatus: 'FREE',
            start: [eventDate.getFullYear(), eventDate.getMonth(),eventDate.getDate(), eventDate.getHours(), eventDate.getMinutes()],
            duration: { minutes: duration },
            location: place,
            organizer: { name: "Contact Person", email: contactPerson },
            url:`${process.env.NEXT_PUBLIC_INTERNAL_URI}/event/${_id}`,
        };
        createEvent(event, (error, value) => {
            const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
            saveAs(blob, `${name}_calendar.ics`);
        });
    };
    return (
        <button  onClick={handleSave} className={"w-full border-blue-600 border rounded-full text-blue-600 bg-white " +
            "mt-4 py-2 flex justify-center items-center md:gap-4 hover:bg-blue-600 hover:text-white transition-all duration-500 font-semibold"}>
            <CalendarIcon/>
            <p>Add to calendar</p>
        </button>
    );
};

export default AddToCalendarButton;

