import React from 'react';
import { Title } from "@/components/index";

const Input = ({ label = "", value, onChange, className = "", isDigits = false }) => {
    return (
        <div className={"flex flex-col justify-center items-center w-full"}>
            {label !== "" && <Title text={label} className={className}></Title>}
            <input
                value={value}
                onChange={(event) => {

                    if (isDigits){
                        const newValue = event.target.value;
                        if (/^\d*\.?\d*$/.test(newValue)) {
                            onChange(newValue);
                        }
                    }else{
                        onChange(event.target.value)
                    }
                }}
                className={"flex border-2 justify-center items-center border-black p-2 text-black text-center " + className }
                type={isDigits ? 'number' : 'text'}
                min={isDigits ? "0" : null}
            />
        </div>
    );
};

export default Input;
