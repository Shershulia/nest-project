import React from 'react';
import { Title } from "@/components/index";

const Input = ({ label = "", value, onChange, className = "", isDigits = false }) => {
    return (
        <div className={"flex flex-col justify-center items-center w-full"}>
            {label !== "" && <Title text={label}></Title>}
            <input
                value={value}
                onChange={(event) => {
                    const newValue = event.target.value;
                    // Allow only positive numbers or an empty string
                    if (/^\d*\.?\d*$/.test(newValue)) {
                        onChange(newValue);
                    }
                }}
                className={"flex border-2 justify-center items-center border-black " + className}
                type={isDigits ? 'number' : 'text'}
                min={isDigits ? "0" : null}
            />
        </div>
    );
};

export default Input;
