import React from 'react';

const Input = ({ label = "", value, onChange, className= "" }) => {



    return (
        <div className={"flex flex-col justify-center items-center w-full"}>
            {label !=="" && <h1 className={"text-center p-4"}>{label}</h1>}

            <input
                value={value}
                onChange={event => {
                    onChange(event.target.value)
                }}
                className={"flex border-2 justify-center items-center border-black " + className}
            />
        </div>
    );
};

export default Input;
