import React from 'react';
import {MagnifyingGlass} from "@/components/index";

const SearchBar = ({searchValue,setSearchValue,
                       fullWidth=false, placeholder = "",
                        title}) => {
    return (
        <div className={`p-2 border border-black ${fullWidth ? "w-full": "w-1/2"} rounded-lg flex relative`}>
            {title && (<p className={"text-sm top-[-0.75rem] left-[1rem] bg-white px-2 absolute"}>{title}</p>)}
            <input value={searchValue} onChange={event => setSearchValue(event.target.value) }
                   placeholder={placeholder}
                   className={"w-[95%] focus:outline-none h-6"}
            />
            <div className={"absolute right-0 top-1 cursor-pointer"}>
                <MagnifyingGlass className={"w-8 h-8"}/>
            </div>
        </div>
    );
};

export default SearchBar;