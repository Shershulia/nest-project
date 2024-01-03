import React from 'react';

const UserCardComponent = ({user}) => {
    const {name,email,image,emailVerified} = user
    return (
        <div className={`flex w-2/3 justify-between items-center border-x border-b border-black bg-opacity-30 
        ${emailVerified==="waiting" ? "bg-yellow-400 " : " "}
        ${emailVerified==="confirmed" && "bg-green-400 " }
        ${emailVerified.includes("declined") && "bg-red-400 " }`}>
            <div className={"flex gap-10 w-full items-center items-center"}>
                <img src={image} alt={"Users image"} className={"rounded-lg m-2 h-[50px] w-[50px] hidden md:block"}/>
                <p className={"w-1/5 text-center truncate"}>{name}</p>
                <p className={"w-2/3 truncate text-center font-bold"}>{email}</p>
                { emailVerified.includes("declined") && (
                    <p className={"w-2/3 text-center truncate"}>{emailVerified.split("declined:")[1]}</p>
                )}
            </div>
        </div>
    );
};

export default UserCardComponent;