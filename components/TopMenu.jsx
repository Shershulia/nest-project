import React, {useState} from 'react';

const TopMenu = ({options, navigationState,  setNavigationState}) => {

    return (
        <div>
            <div className={"w-full flex bg-blue-600"}>
                {options.map((option,index)=>(
                    <button key={index} onClick={()=>{
                        setNavigationState(option)}}
                            className={`w-1/2 border pointer border-black py-4 rounded-t-full text-center transition-all duration-500 ${navigationState===option ? "bg-gray-200" : "bg-white"}`}>
                        <p>{option}</p>
                    </button>))
                }
            </div>
        </div>
    );
};

export default TopMenu;