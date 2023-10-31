import React, {useEffect, useState} from 'react';
import {Input, Spinner, TextArea, TimePicker, Title} from "@/components";
import axios from "axios";
import Swal from "sweetalert2";
const styles = "rounded-md mb-2 text-center";
const EventForm = ({
    _id,
    title : existingTitle,
    description: existingDescription,
    date : existingDate,
    contactPerson: existingContactPerson,
    place: existingPlace,
    price: existingPrice,
    numberOfPeople: existingNumberOfPeople,
    images:existingImages
                   }) => {
    const [name,setName] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [date, setDate] = useState(existingDate || new Date());

    const [contactPerson, setContactPerson] = useState(existingContactPerson || "");

    const [allUsers,setAllUsers]=useState([]);

    const [place, setPlace] = useState(existingPlace || "");
    const [price, setPrice] = useState(existingPrice || 0);
    const [numberOfPeople, setNumberOfPeople] = useState(existingNumberOfPeople || 0);
    const [images, setImages] = useState(existingImages || [])

    useEffect(()=> {
        axios.get("/api/users").then(res => {
            const arrayOfEmails = res.data.map(obj => obj.email);
            setAllUsers(arrayOfEmails)
        }).catch((error) => {
            console.log(error);
        })
    },[]);

    const addEvent = ()=>{
        const data = {name,description,date,contactPerson,place,price,numberOfPeople,images}
        axios.post("/api/events",data).then(res=>{
            Swal.fire(
                'Good job!',
                `Event with name ${res.data.name} was added successfully`,
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
    const clearAll = ()=>{
        setName("");
        setDescription("");
        setDate(new Date);
        setContactPerson("");
        setPlace("");
        setPrice(0);
        setNumberOfPeople(0);
        setImages([]);
    }
    async function uploadImages(event){
        const files = event.target?.files;
        if(files?.length>0){
            const data= new FormData();
            for (const file of files){
                data.append("file",file)
            }
            const response = await axios.post("/api/upload",data, {
                headers:{"Content-Type": "multipart/form-data"}
            });
            setImages(oldImages =>{
                return [...oldImages, ...response.data.links];
            })
            console.log(response.data)
        }

    }
    return (
        <div className={"flex flex-col justify-evenly w-full  h-full bg-white py-8"}>
            <div className={"mb-10"}>
                <Input label={"Name"} value={name} onChange={setName} className={styles}></Input>
                <TextArea label={"Description"} value={description} onChange={setDescription} className={"w-3/4 rounded-md"}></TextArea>
                <TimePicker label={"Choose date"} value={date} setValue={setDate}></TimePicker>
                <div className={"flex justify-center items-center"}>
                    <div className={"w-full"}>
                        <Title text={"Contact person"}/>
                        {allUsers.length ?
                            (<div className={"flex justify-center"}>
                                <select className={"border-2 border-black text-center rounded-md p-2 w-max"}
                                        value={contactPerson} onChange={event => setContactPerson(event.target.value)}
                                >
                                    <option value={""} className={"p-4"}>Choose email</option>
                                    {allUsers?.map((user,index)=>(
                                            <option key={index} value={user} className={"p-4"}>{user}</option>
                                        )
                                    )}
                                </select>
                            </div>) :
                            (<Spinner fullWidth={true}/>)
                        }
                    </div>
                    <Input label={"Place"} value={place} onChange={setPlace} className={styles}/>
                </div>
                <div className={"flex justify-center items-center"}>
                    <Input label={"Price"} value={price} onChange={setPrice}  className={styles} isDigits={true}></Input>
                    <Input label={"Number of people"} value={numberOfPeople} onChange={setNumberOfPeople}  className={styles} isDigits={true}></Input>

                </div>
                <div className={"flex flex-col items-center"}>
                    <Title text={"Photos"}/>
                    <div className={"mb-2 flex flex-wrap gap-2"}>
                        {!!images?.length && images.map(link=>(
                                <div key={link} className={" h-24 w-24"}>
                                    <img src={link} alt={""} className={"rounded-lg"}/>
                                </div>
                            )
                        )}
                        <label className={"inline-block w-24 h-24 text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 cursor-pointer"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                            </svg>
                            <div>
                                Upload
                            </div>
                            <input type="file" className={"hidden"}
                            onChange={(event)=>uploadImages(event)}/>

                        </label>
                        {!images?.length && (
                            <div>No photos</div>
                        )}
                    </div>
                </div>
            </div>
            <div className={"flex items-center justify-center"}>
                <button className={"bg-green-600 hover:bg-green-700 text-lg font-bold p-2 rounded-md border-black mx-4"}
                onClick={addEvent}>Save</button>
                <button className={"bg-yellow-600 hover:bg-yellow-700 text-lg font-bold p-2 rounded-md border-black mx-4"}
                        onClick={clearAll}>Clear</button>
            </div>

        </div>
    );
};

export default EventForm;