import React from 'react';
import {MagnifyingGlass} from "@/components/index";

const SearchBar = ({searchValue,setSearchValue}) => {
    return (
        <div className={"p-2 border border-black w-1/2 rounded-lg flex relative"}>
            <input value={searchValue} onChange={event => setSearchValue(event.target.value) }
                   className={"w-[95%] focus:outline-none"}
            />
            <div className={"absolute right-0 top-1 cursor-pointer"}>
                <MagnifyingGlass className={"w-8 h-8"}/>
            </div>
        </div>
    );
};

export default SearchBar;