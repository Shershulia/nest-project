import React, {useState} from 'react';
import Input from "@/components/Input";

const AddAdminComponent = () => {
    const [addUser, setAddUser] = useState("");
    console.log(addUser)
    return (
        <div className={"flex flex-col justify-center items-center w-full"}>
            <h1>Give user admin privilege</h1>
            <Input value={addUser} onChange={setAddUser} label={"Input his email"} className={"w-1/3"}></Input>
        </div>
    );
};

export default AddAdminComponent;