import React, {useEffect, useState} from 'react';
import {TextArea, Input, TimePicker, Title, RadioButton, ImageUploadComponent, Switcher, Spinner} from "@/components";
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

    const [fromGoogleDrive, setFromGoogleDrive] = useState(false);

    const [googleFilesLoading,setGoogleFilesLoading]= useState(false);
    const [googleDriveFiles, setGoogleDriveFiles] = useState([]);
    const [choosenGoogleDriveFile,setChoosenGoogleDriveFile] = useState("");

    const getGoogleDriveFiles = async ()=>{
        if (!fromGoogleDrive){
            setGoogleFilesLoading(true)
            axios.get("/api/google/drive/upload").then(res=>{
                setGoogleDriveFiles(res.data)
                setGoogleFilesLoading(false)
            })
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
                    documents.length ? `Links to attached files:\n${documents.map(document => (`${document}\n`)).filter(Boolean).join("")}\n` : ""
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


    const closeForm = () =>{
        closeEvent(false);
    }
    const addRefer = async () => {
        const data = {title, description, date: new Date(date), documents}
        if (existingTitle) {
            const dataToEdit = {_id, ...data}
            axios.put("/api/admin/documents", dataToEdit).then(res => {
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
        } else {
            if (addToGoogle) {
                createAndUploadFile().then(res => {
                    const data = {title, description, date: new Date(date), documents: [`${res.data}`, ...documents]}
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
            } else {
                if (fromGoogleDrive && choosenGoogleDriveFile!=="") {
                    const response = await axios.post("/api/google/drive/getUri", {id: choosenGoogleDriveFile})
                    const data = {title, description, date: new Date(date), documents: [response.data]}
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
                } else if (fromGoogleDrive && choosenGoogleDriveFile==="") {
                    alert("You should choose file from Drive to publish")
                    return
                }
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
        <div className={"flex flex-col justify-evenly w-full  h-full bg-white " +
            "pb-4 border border-x-black border-t-black ease-in-out duration-300"}>
            <div>
                <Title text={"Create meeting document"}/>
                <Input label={"Title of the meeting"} value={title} onChange={setTitle} className={'rounded-md w-1/2'}></Input>
                <TextArea label={"Write in some extra details about the meeting"} value={description} onChange={setDescription} className={'rounded-md w-1/2'}></TextArea>
                <div className={"flex gap-6 flex-col justify-center items-center"}>
                    <TimePicker label={"Select the date of the meeting"} value={date} setValue={setDate} />
                    {!fromGoogleDrive && !existingTitle && <div>
                        <Switcher title={"Add to Google Drive"} value={addToGoogle} setValue={setAddToGoogle}/>
                    </div>}


                </div>

                <div className={"flex flex-col justify-center items-center"}>
                    <Title text={"Select documents"}/>
                    {
                        !fromGoogleDrive ? (
                            <div className={"flex flex-col justify-center items-center"}>
                            <ImageUploadComponent images={documents} setImages={setDocuments} isDocuments={true} isTitle={false}/>
                            <div className={"mb-2 flex flex-col items-center"}>
                                <h1 className={"mx-2 font-bold"}>OR </h1>
                                <button className={"p-2 rounded-md border h-24 w-24 bg-gray-200"} onClick={getGoogleDriveFiles}>
                                    <p className={"text-xs font-bold text-center bottom-0"}>Upload using</p>
                                    <img src={"/Google_Drive.png"} alt={"Google Drive logo"}/>
                                </button>
                            </div>
                        </div>) : (
                            <div className={"flex justify-center items-center"}>
                                <div className={"mb-2 flex gap-2 flex-wrap justify-center items-center"}>
                                    <div className={"my-2"}>
                                        {googleFilesLoading ? (<Spinner/>) :
                                            (<select className={"border border-black text-center rounded-lg p-2 w-full"}
                                                     value={choosenGoogleDriveFile}
                                                     onChange={event => setChoosenGoogleDriveFile(event.target.value)}
                                                >
                                                    <option value={""} className={"p-4"}>Choose filename</option>
                                                    {googleDriveFiles?.map((file,index)=>(
                                                            <option key={index} value={file.id} className={"p-4"}>{file.name}</option>
                                                        )
                                                    )}
                                                </select>
                                            )}
                                    </div>
                                    <h2 className={"font-bold text-xl"}>OR</h2>
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