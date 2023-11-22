import React from 'react';
import {CalendarIcon, LocationIcon} from "@/components";
import {format} from "date-fns";
import Link from "next/link";

const EventDisplayRow = ({event}) => {
    return (
        <Link href={`/event/${event._id}`} className={"w-full p-2 border border-blue-300 rounded-xl flex"}>
            {event.images &&
                (<div className={"h-[101px] w-2/12 ml-2"}>
                    {event.images[0] ? (<img src={event.images[0]}
                          className={"rounded-lg h-full w-full object-cover"}/>):
                        (<p/>)}
            </div>
            )}
            <div className={"w-[4px] h-[101px] flex items-center rounded-full ml-2 border-[3px] border-blue-300 opacity-50 h-full"}/>
            <div className={"w-9/12 ml-2"}>
                <p className={"font-bold text-lg"}>{event.name}</p>
                <p className={"truncate overflow-hidden w-full"}>{event.description}</p>
                {event.date &&
                    (<div className={"flex justify-center items-center gap-1"}>
                    <CalendarIcon className={"w-5 h-5"}/>
                    <p className={"truncate overflow-hidden w-full"}>{format(new Date(event.date), 'MMMM do yyyy hh:mm a')}</p>
                </div>)}
                {event.place &&
                    (<div className={"flex justify-center items-center gap-1"}>
                        <LocationIcon className={"w-5 h-5"}/>
                        <p className={"truncate overflow-hidden w-full"}>{event.place}</p>
                    </div>)}
            </div>
        </Link>
    );
};

export default EventDisplayRow;