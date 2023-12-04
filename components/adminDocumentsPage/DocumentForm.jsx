import React, {useEffect, useState} from 'react';
import {TextArea, Input, TimePicker, Title, RadioButton, ImageUploadComponent, Switcher} from "@/components";
import axios from "axios";
import Swal from "sweetalert2";

const DocumentForm = ({
                      _id,
                      title : existingTitle,
                      description: existingDescription,
                      date : existingDate,
                      documents: existingDocuments,
                      closeEvent,
                      }) => {
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [date, setDate] = useState(existingDate ? new Date(existingDate) : new Date());
    const [documents,setDocuments] = useState(existingDocuments || []);
    const [addToGoogle,setAddToGoogle] = useState(false);
    const [fromGoogleDrive, setFromGoogleDrive] = useState(true);
    const getGoogleDriveFiles = async ()=>{
        if (fromGoogleDrive){

        }
        setFromGoogleDrive(prevState => !prevState)
    }

    const createAndUploadFile = async () => {
        try {
            // Create a blob with text content
            const fileBlob = new Blob([
                title ? `Title of meeting : ${title} \n` : "",
                date ? `Date of meeting : ${date} \n` : "",
                description ? `Description : ${description} \n` : "",
                documents ? `Links to attached files : \n ${documents.map(document=>(`${document} \n`))} \n` : ""
            ], { type: 'application/msword' });
            fileBlob.name = `$meeting-${title}.txt`;

            // Create a file from the blob
            const file = new File([fileBlob], `meeting-${title}.txt`, { type: 'application/msword' });

            // Create FormData and append the file
            const formData = new FormData();
            formData.append('file', file);

            // Make the axios request
            const response = await axios.post('/api/google/drive/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        } catch (error) {
            console.error("Error uploading file:", error.message);
        }
    };

    const saveToDrive = ()=>{
        createAndUploadFile().then(res=>{
            console.log(res)
        })
    }
    const closeForm = () =>{
        closeEvent(false);
    }
    const addRefer = ()=>{
        const data = {title,description,date: new Date(date),documents}
        if (existingTitle){
            const dataToEdit ={_id,...data}
            axios.put("/api/admin/documents",dataToEdit).then(res=>{
                Swal.fire(
                    'Good job!',
                    `Document with title ${data.title} was edited successfully`,
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
            if(addToGoogle) {
                createAndUploadFile().then(res => {
                    const data = {title, description, date: new Date(date), documents: [`https://docs.google.com/document/d/${res.data}`]}
                    axios.post("/api/admin/documents", data).then(res => {
                        Swal.fire(
                            'Good job!',
                            `Document with title ${res.data.title} was added successfully`,
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
                })
            }else{
                axios.post("/api/admin/documents",data).then(res=>{
                    Swal.fire(
                        'Good job!',
                        `Document with title ${res.data.title} was added successfully`,
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

    }
    const clearAll = ()=>{
        setTitle("");
        setDescription("");
        setDate(new Date);
        setDocuments([]);
    }

    return (
        <div className={"flex flex-col justify-evenly w-full  h-full bg-white pb-4 border border-x-black border-t-black"}>
            <div>
                <Title text={"Create meeting document"}/>
                <Input label={"Title of the meeting"} value={title} onChange={setTitle} className={'rounded-md w-1/2'}></Input>
                <TextArea label={"Write in some extra details about the meeting"} value={description} onChange={setDescription} className={'rounded-md w-1/2'}></TextArea>
                <div className={"flex gap-6 flex-col justify-center items-center"}>
                    <TimePicker label={"Select the date of the meeting"} value={date} setValue={setDate} />
                    <div>
                        <Switcher title={"Add to Google Drive"} value={addToGoogle} setValue={setAddToGoogle}/>
                    </div>

                </div>

                <div className={"flex flex-col justify-center items-center"}>
                    <Title text={"Select documents"}/>
                    {
                        fromGoogleDrive ? (
                            <div className={"flex justify-center items-center"}>
                            <ImageUploadComponent images={documents} setImages={setDocuments} isDocuments={true} isTitle={false}/>
                            <h1 className={"mx-2 font-bold"}>OR </h1>
                            <div className={"mb-2"}>
                                <button className={"p-2 rounded-md relative border h-24 w-24 bg-gray-200"} onClick={getGoogleDriveFiles}>
                                    <p className={"text-xs font-bold text-center absolute bottom-0"}>Upload using</p>
                                    <img src={"/Google_Drive.png"} alt={"Google Drive logo"}/>
                                </button>
                            </div>
                        </div>) : (
                            <div className={"flex justify-center items-center"}>
                                <div className={"mb-2"}>
                                    <button className={"p-2 rounded-md  border bg-gray-200 flex items-center justify-center"} onClick={getGoogleDriveFiles}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                                        </svg>
                                        <p className={"text-xs font-bold text-center bottom-0"}>Upload using local files</p>

                                    </button>
                                </div>
                            </div>
                        )
                    }

                </div>
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