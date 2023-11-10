import React, {useState} from 'react';
import {format} from "date-fns";
import {TextArea, Input, TimePicker, Title, RadioButton, ImageUploadComponent} from "@/components";

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
    const [date, setDate] = useState(existingDate ? format(new Date(existingDate), "DD MMM YYYY ,") : new Date());
    const [documents,setDocuments] = useState(existingDocuments || []);
    const [isDownloadable, setIsDownloadable] = useState(existingIsDownloadable || "No");


    const addRefer = () =>{
        console.log(date)
    }
    const clearAll = () =>{

    }

    return (
        <div className={"flex flex-col justify-evenly w-full  h-full bg-white py-8 border border-x-black border-t-black"}>
            <div>
                <Title text={"Create meeting document"}/>
                <Input label={"Title of the meeting"} value={title} onChange={setTitle} className={'rounded-md w-1/2'}></Input>
                <TextArea label={"Write in some extra details about the meeting"} value={description} onChange={setDescription} className={'rounded-md w-1/2'}></TextArea>
                <div className={"flex gap-6 justify-center"}>
                    <TimePicker label={"Select the date of the meeting"} value={date} setValue={setDate} />
                    <RadioButton title={"Are you allow to download file?"} options={["Yes", "No"]} state={isDownloadable} onChange={setIsDownloadable}/>

                </div>
                <ImageUploadComponent title={"Select files for meeting"} images={documents} setImages={setDocuments} isDocuments={true}/>
            </div>
            <div className={"flex items-center justify-center mt-6"}>
                <button className={"bg-green-600 hover:bg-green-700 text-lg font-bold p-2 rounded-md border-black mx-4"}
                        onClick={addRefer}>Save</button>
                <button className={"bg-yellow-600 hover:bg-yellow-700 text-lg font-bold p-2 rounded-md border-black mx-4"}
                        onClick={clearAll}>Clear</button>
                <button className={"bg-red-600 hover:bg-red-700 text-lg font-bold p-2 rounded-md border-black mx-4"}
                        onClick={clearAll}>Cancel</button>
            </div>

        </div>
    );
};

export default DocumentForm;