import React, {useEffect, useState} from 'react';
import {Input, Spinner, TextArea, TimePicker, Title} from "@/components";
import axios from "axios";
import Swal from "sweetalert2";
import {format} from "date-fns";
import ImageUploadComponent from "@/components/ImageUploadComponent";

const styles = "rounded-md mb-2 text-center w-1/2";
const EventForm = ({
    _id,
    title : existingTitle,
    description: existingDescription,
    date : existingDate,
    contactPerson: existingContactPerson,
    place: existingPlace,
    price: existingPrice,
    numberOfPeople: existingNumberOfPeople,
    images:existingImages,
    closeEvent
                   }) => {
    const [name,setName] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");

    const [date, setDate] = useState(existingDate ? new Date(existingDate) : new Date());

    const [contactPerson, setContactPerson] = useState(existingContactPerson || "");

    const [allUsers,setAllUsers]=useState([]);

    const [place, setPlace] = useState(existingPlace || "");
    const [price, setPrice] = useState(existingPrice || 0);
    const [numberOfPeople, setNumberOfPeople] = useState(existingNumberOfPeople || 0);
    const [images, setImages] = useState(existingImages || [])

    useEffect(()=> {
        axios.get("/api/admin/users").then(res => {
            const arrayOfEmails = res.data.map(obj => obj.email);
            setAllUsers(arrayOfEmails)
        }).catch((error) => {
            console.log(error);
        })
    },[]);
    const closeForm = () =>{
        closeEvent(false);
    }
    const addEvent = ()=>{
        const data = {name,description,date: new Date(date),contactPerson,place,price,numberOfPeople,images}
        if (existingTitle){
            const dataToEdit ={_id,...data}
            axios.put("/api/admin/events",dataToEdit).then(res=>{
                Swal.fire(
                    'Good job!',
                    `Event with name ${data.name} was edited successfully`,
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
            axios.post("/api/admin/events",data).then(res=>{
                Swal.fire(
                    'Good job!',
                    `Event with name ${res.data.name} was added successfully`,
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
        setName("");
        setDescription("");
        setDate(new Date);
        setContactPerson("");
        setPlace("");
        setPrice(0);
        setNumberOfPeople(0);
        setImages([]);
    }


    return (
        <div className={"flex flex-col justify-evenly w-full  h-full bg-white py-8 border border-x-black border-t-black"}>
            <div className={"mb-10"}>
                <div className={"flex"}>

                    <Input label={"Name"} value={name} onChange={setName} className={styles}></Input>
                    <div className={"w-full flex justify-center items-center"}>
                        <div className={"w-1/2 h-full"}>
                            <TimePicker label={"Choose date"} value={date} setValue={setDate}></TimePicker>

                        </div>
                    </div>

                </div>
                <TextArea label={"Description"} value={description} onChange={setDescription} className={"w-3/4 rounded-md"}></TextArea>
                <div className={"flex justify-center items-center"}>
                    <div className={"w-full"}>
                        <Title text={"Contact person"}/>
                        {allUsers.length ?
                            (<div className={"flex justify-center"}>
                                <select className={"border-2 border-black text-center rounded-md p-2 w-1/2"}
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
                <ImageUploadComponent title={"Photos"} images={images} setImages={setImages}></ImageUploadComponent>

            </div>
            <div className={"flex items-center justify-center"}>
                <button className={"bg-green-600 hover:bg-green-700 text-lg font-bold p-2 rounded-md border-black mx-4"}
                onClick={addEvent}>Save</button>
                <button className={"bg-yellow-600 hover:bg-yellow-700 text-lg font-bold p-2 rounded-md border-black mx-4"}
                        onClick={clearAll}>Clear</button>
                <button className={"bg-red-600 hover:bg-red-700 text-lg font-bold p-2 rounded-md border-black mx-4"}
                        onClick={closeForm}>Cancel</button>
            </div>

        </div>
    );
};

export default EventForm;