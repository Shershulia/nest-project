import React, {useEffect, useState} from 'react';
import {SearchBar, Title} from "@/components/index";

const SearchBarEventOrDocument = ({data, setData, originalData, title, isDocuments}) => {
    const [searchValue, setSearchValue] = useState("")
    const searchFun = () =>{

        if (searchValue === "") {
            setData(originalData); // Reset to original data if the search query is empty
        } else {
            const filteredData = data.filter((event) => {
                const property = isDocuments ? event.title : event.name;
                return property.toLowerCase().includes(searchValue.toLowerCase())
            });
            setData(filteredData); // Update data based on the filtered query
        }

    }
    useEffect(()=>{
        searchFun();
    },[searchValue])
    return (
        <div className={"flex flex-col justify-center items-center mb-4"}>
            <Title text={title}/>
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>
    );
};

export default SearchBarEventOrDocument;