import React, {useEffect, useState} from 'react';
import {Input, Spinner, TextArea, TimePicker, Title} from "@/components";
import axios from "axios";
const styles = "rounded-md mb-2 text-center";
const EventForm = () => {
    const [name,setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());

    const [contactPerson, setContactPerson] = useState("");
    const [allUsers,setAllUsers]=useState([]);

    const [place, setPlace] = useState("");
    const [price, setPrice] = useState(0);
    const [numberOfPeople, setNumberOfPeople] = useState(0);

    useEffect(()=> {
        axios.get("/api/users").then(res => {
            const arrayOfEmails = res.data.map(obj => obj.email);
            setAllUsers(arrayOfEmails)
        }).catch((error) => {
            console.log(error);
        })
    },[]);
    return (
        <div className={"shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-xl flex flex-col justify-evenly  h-full"}>
            <form className={"mb-10"}>
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
                    <Input label={"Price"} value={price} onChange={setPrice}  className={styles}></Input>
                    <Input label={"Number of people"} value={numberOfPeople} onChange={setNumberOfPeople}  className={styles}></Input>

                </div>
            </form>
            <div className={"flex items-center justify-center"}>
                <button className={"bg-green-600 hover:bg-green-700 text-lg font-bold p-2 rounded-md border-black mx-4"}>Save</button>
                <button className={"bg-yellow-600 hover:bg-yellow-700 text-lg font-bold p-2 rounded-md border-black mx-4"}>Clear</button>

            </div>

        </div>
    );
};

export default EventForm;