import React, {useEffect, useState} from 'react';
import axios from "axios";
import {
    DocumentsDisplayRow,
    EventDisplayRow,
    FrontendLayout,
    LittleEventPage,
    SearchBar,
    Spinner,
    Switcher,
    WhiteBox
} from "@/components";
import {RevealWrapper} from "next-reveal";

const DocumentsPage = () => {
    const [documents,setDocuments] = useState([]);
    const [documentsLoading,setDocumentsLoading] = useState(true);
    const [filter, setFilter] = useState("");


    const getDocuments = () =>{
        setDocumentsLoading(true)
        axios.get(`/api/documents?search=${filter}`)
            .then(res=>{
                setDocuments(res.data)
                setDocumentsLoading(false)
            })
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getDocuments()
        }, 1000)
        //every filter change will clear previous timer and restart the timer
        return () => clearTimeout(delayDebounceFn)
    }, [filter])

    return (
        <FrontendLayout>
            <RevealWrapper className={"sm:w-3/12 w-2/3 h-full mb-4 sm:mb-0"}>
                <WhiteBox>
                    <div className={"p-4"}>
                        <div className={"mb-2 flex flex-col items-center justify-center"}>
                            <SearchBar searchValue={filter} setSearchValue={setFilter}
                                       className={"w-full"} placeholder={"Search for documents"}
                                       title={"Search"}/>
                        </div>


                        <hr className={"rounded-lg w-11/12 m-auto bg-gray-300 h-[4px] mb-2"}/>
                        <button onClick={getDocuments}
                                className={"m-auto w-full bg-blue-600 border rounded-lg text-white flex " +
                                    "justify-center items-center py-2 transition-all duration-500 font-semibold " +
                                    "hover:bg-white hover:text-blue-600 hover:border-blue-600 mb-2"}>Search</button>
                        <button onClick={()=>{setFilter("")}}
                                className={"m-auto w-full border rounded-lg text-red flex " +
                                    "justify-center items-center hover:bg-red-300 hover:opacity-50 hover:border-white " +
                                    "py-2 transition-all duration-500 font-semibold " +
                                    "bg-white text-red-600 border-red-600 hover:text-white"}>Clear</button>
                    </div>
                </WhiteBox>
            </RevealWrapper>

            <RevealWrapper className={"w-2/3 h-screen "}>
                <WhiteBox>
                    {documentsLoading ? (
                        <div className={"w-full flex flex-col gap-2 p-6"}>
                            <Spinner fullWidth={true}/>
                        </div>
                    ) : (
                        <div
                            className={"w-full flex flex-col overflow-y-scroll h-2/3 gap-2 p-4 scrollbar" }>
                            {documents.length ?
                                documents.map((document,index)=>(
                                    <>
                                        <DocumentsDisplayRow document={document} key={index}/>
                                    </>
                                )) : (<p>No events found with search option {filter}</p>)}
                        </div>
                    )
                    }
                </WhiteBox>
            </RevealWrapper>
        </FrontendLayout>
    );
};

export default DocumentsPage;