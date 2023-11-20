import React from 'react';
import {Title} from "@/components/index";

const RadioButton = ({title, options, state, onChange}) => {
    return (
        <div className="flex flex-col">
            <Title text={title}></Title>
            <div className={"flex justify-center items-center"}>
                {options.map((option=>(
                    <div className="flex items-center mr-4 outline-none" key={option}>
                        <input  type="radio" value={option} checked={state===option} onChange={(event)=>{onChange(event.target.value)}}
                                className="outline-none w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"/>
                        <label className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300">{option}</label>
                    </div>
                )))}
            </div>



        </div>
    );
};

export default RadioButton;