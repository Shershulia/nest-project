import Link from "next/link";
import {CalendarIcon, LocationIcon} from "@/components";
import {format} from "date-fns";
import React from "react";

const DocumentsDisplayRow = ({document,key}) => {
    return (
        <Link href={`/documents/${document._id}`} className={"md:max-w-full max-w-[250px] p-2 border border-blue-300 rounded-xl flex"}
         key={key}>
            <div className={"w-9/12 ml-2"}>
                <p className={"font-bold text-lg truncate overflow-hidden w-full"}>{document.title}</p>
                <p className={"truncate overflow-hidden w-full"}>{document.description}</p>
                {document.date &&
                    (<div className={"flex justify-center items-center gap-1"}>
                        <CalendarIcon className={"w-5 h-5"}/>
                        <p className={"truncate overflow-hidden w-full"}>{format(new Date(document.date), 'MMMM do yyyy hh:mm a')}</p>
                    </div>)}
            </div>
        </Link>
    );
};

export default DocumentsDisplayRow;