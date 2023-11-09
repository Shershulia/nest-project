import React, {useState} from 'react';
import {format} from "date-fns";
import {TextArea, Input, TimePicker, Title} from "@/components";

const DocumentForm = ({
                      _id,
                      title : existingTitle,
                      description: existingDescription,
                      date : existingDate,
                      documents: existingDocuments,
                      isDownloadable: existingIsDownloadable,
                      }) => {
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [date, setDate] = useState(existingDate ? format(new Date(existingDate), 'MMMM do yyyy hh:mm a') : new Date());
    const [documents,setDocuments] = useState(existingDocuments || []);
    const [isDownloadable, setIsDownloadable] = useState(existingIsDownloadable || false);

    //#TODO: add documents picker add option button to set setIsDownloadable
    return (
        <div className={"flex flex-col justify-evenly w-full  h-full bg-white py-8 border border-x-black border-t-black"}>
            <Title text={"Create meeting document"}/>
            <Input label={"Title of the meeting"} value={title} onChange={setTitle}></Input>
            <TextArea label={"Write in some extra details about the meeting"} value={description} onChange={setDescription}></TextArea>
            <TimePicker label={"Select the date of the meeting"} value={date} setValue={setDate}/>
        </div>
    );
};

export default DocumentForm;