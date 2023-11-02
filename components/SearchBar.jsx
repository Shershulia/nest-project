import React, {useEffect, useState} from 'react';
import {MagnifyingGlass, Title} from "@/components/index";

const SearchBar = ({data, setData, originalData}) => {
    const [searchValue, setSearchValue] = useState("")
    const searchFun = () =>{

        if (searchValue === "") {
            setData(originalData); // Reset to original data if the search query is empty
        } else {
            const filteredData = data.filter((event) => event.name.toLowerCase().includes(searchValue.toLowerCase()));
            setData(filteredData); // Update data based on the filtered query
        }

    }
    useEffect(()=>{
        searchFun();
    },[searchValue])
    return (
        <div className={"flex flex-col justify-center items-center mb-4"}>
            <Title text={"Search for event"}/>
            <div className={"p-2 border border-black w-1/2 rounded-lg flex relative"}>
                <input value={searchValue} onChange={event => setSearchValue(event.target.value) }
                       className={"w-[95%] focus:outline-none"}
                />
                <div className={"absolute right-0 top-1 cursor-pointer"}>
                    <MagnifyingGlass className={"w-8 h-8"}/>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;