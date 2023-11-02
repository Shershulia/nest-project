import React from 'react';
import {Title} from "@/components/index";

const TextArea = ({ label = "", value, onChange, className= "" }) => {



    return (
        <div className={"flex flex-col justify-center items-center w-full"}>
            {label !=="" && <Title text={label} ></Title>}
            <textarea
                value={value}
                onChange={event => {
                    onChange(event.target.value)
                }}
                className={"flex border-2 justify-center items-center border-black p-2 " + className}
            />
        </div>
    );
};

export default TextArea;
