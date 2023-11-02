import React from 'react';
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css";
import {CalendarIcon, Title} from "@/components/index";
let inputProps = {
    className: "text-sm"
};
const TimePicker = ({label,value,setValue}) => {
    return (
        <div className='flex flex-col items-center justify-center text-center pb-4'>
            <Title text={label}/>
            <div className={"flex w-full justify-center items-center"}>
                <Datetime
                    value={value}
                    onChange={setValue}
                    input={true}
                    closeOnClickOutside
                    closeOnSelect
                    dateFormat="MMMM Do YY hh:mm a"
                    className="flex justify-center items-center text-center border-2 rounded-l-md h-8 border-black w-min px-10"
                    inputProps={ inputProps }
                />
                <button className='flex  rounded-r-md w-full justify-center items-center border-2 border-black h-8 w-max'
                        onClick={(event)=>{
                            event.preventDefault();
                            setValue(new Date)}}>
                    <div className='flex flex-col items-center justify-center mb-1 '>
                        <CalendarIcon className='w-4 h-4'></CalendarIcon>
                        <p className='text-xs text-gray-500 w-full text-center leading-3'>Now</p>
                    </div>
                </button>
            </div>

        </div>


    );
};

export default TimePicker;