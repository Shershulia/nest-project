import React, {useState} from 'react';
import {TextArea, Input, TimePicker, Title, RadioButton, ImageUploadComponent} from "@/components";
import axios from "axios";
import Swal from "sweetalert2";

const DocumentForm = ({
                      _id,
                      title : existingTitle,
                      description: existingDescription,
                      date : existingDate,
                      documents: existingDocuments,
                      isDownloadable: existingIsDownloadable,
                      closeEvent,
                      }) => {
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [date, setDate] = useState(existingDate ? new Date(existingDate) : new Date());
    const [documents,setDocuments] = useState(existingDocuments || []);
    const [isDownloadable, setIsDownloadable] = useState(existingIsDownloadable===true ? "Yes":"No");


    const closeForm = () =>{
        closeEvent(false);
    }
    const addRefer = ()=>{
        const data = {title,description,date: new Date(date),documents,isDownloadable: isDownloadable !== "No"}
        if (existingTitle){
            const dataToEdit ={_id,...data}
            axios.put("/api/admin/documents",dataToEdit).then(res=>{
                Swal.fire(
                    'Good job!',
                    `Document with title ${data.t} was edited successfully`,
                    'success'
                )
            }).catch((error) => {
                Swal.fire(
                    'Error',
                    "Hm... Something went wrong, please contact support with your case. " + error.message,
                    'error'
                )
            })
        }
        else {
            axios.post("/api/admin/documents",data).then(res=>{
                Swal.fire(
                    'Good job!',
                    `Document with title ${res.data.name} was added successfully`,
                    'success'
                ).then(() => {
                    closeForm();
                })
            }).catch((error) => {
                Swal.fire(
                    'Error',
                    "Hm... Something went wrong, please contact support with your case. " + error.message,
                    'error'
                )
            })
        }

    }
    const clearAll = ()=>{
        setTitle("");
        setDescription("");
        setDate(new Date);
        setIsDownloadable("No");
        setDocuments([]);
    }

    return (
        <div className={"flex flex-col justify-evenly w-full  h-full bg-white pb-4 border border-x-black border-t-black"}>
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
                        onClick={closeForm}>Cancel</button>
            </div>

        </div>
    );
};

export default DocumentForm;