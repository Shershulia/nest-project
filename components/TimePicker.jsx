import React, {useState} from 'react';
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css";
import {CalendarIcon, Title} from "@/components/index";
let inputProps = {
    className: "text-sm w-full text-center"
};
const TimePicker = ({label,value,setValue}) => {
    const [isDisplay, setIsDisplay] = useState(true);

    return (
        <div className='flex flex-col items-center justify-center text-center pb-4 h-full'>
            {isDisplay ? (<div>
                <Title text={label}/>
                <div className={"flex w-full justify-center items-center"}>
                    <Datetime
                        value={value}
                        onChange={setValue}
                        input={true}
                        closeOnClickOutside
                        closeOnSelect
                        className="flex justify-center items-center text-center border-2 rounded-tl-md h-8 border-black w-full px-10"
                        inputProps={{
                            ...inputProps,
                        }}
                    />
                    <button className='flex  rounded-tr-md w-full justify-center items-center  border-y-2 border-r-2  border-black h-8 w-max'
                            onClick={(event)=>{
                                event.preventDefault();
                                setValue(new Date)}}>
                        <div className='flex flex-col items-center justify-center mb-1 '>
                            <CalendarIcon className='w-4 h-4'></CalendarIcon>
                            <p className='text-xs text-gray-500 w-full text-center leading-3'>Now</p>
                        </div>
                    </button>
                </div>
                <button className={"bg-red-600 w-full rounded-b-lg hover:bg-red-700 transition-all"}
                        onClick={()=>{setIsDisplay(false); setValue("")}}>
                    <p className={"font-bold"}>Without date</p>
                </button>
            </div>) : (
                <button className={"bg-green-600 w-full h-full rounded-lg hover:bg-green-700 transition-all"}
                        onClick={()=>{setIsDisplay(true);}}>
                    <p className={"font-bold"}>Put date back</p>
                </button>
            )
            }

        </div>


    );
};

export default TimePicker;