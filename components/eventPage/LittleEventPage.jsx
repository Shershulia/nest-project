import React from 'react';
import Link from "next/link";

const LittleEventPage = ({event}) => {
    return (
        <div>
            <Link href={`/events/${event._id}`} className={"w-[140px] h-[100px] p-[1px] border border-blue-300 rounded-xl flex relative"}>
                <img src={event.images[0]} className={"rounded-lg h-full w-full rounded-xl object-cover"}/>
            </Link>
            {event.name && (<p className={"truncate overflow-hidden text-center px-2 w-[140px] " +
                "bg-white rounded-sm bottom-[10px] "}>{event.name}</p>)}
        </div>

    );
};

export default LittleEventPage;