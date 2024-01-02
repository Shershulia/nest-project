import React, {useState} from 'react';
import {mongooseConnect} from "@/lib/mongoose";
import {MeetingDocument} from "@/models/MeetingDocument";
import {RevealWrapper} from "next-reveal";
import {FrontendLayout, PlusIcon, ShareLinks, WhiteBox} from "@/components";
import {format} from "date-fns";
import {useSession} from "next-auth/react";
import { saveAs } from "file-saver";

const SingleDocumentPage = ({meetingDocument}) => {
    const { data: session } = useSession()
    const [index, setIndex] = useState(0);
    const numberOfDocuments = meetingDocument.documents.length;
    const changeIndex = (event, operation)=>{
        event.preventDefault()
        if (operation==="+"){
            if ((index+1)!==numberOfDocuments){
                setIndex(prevState => prevState+1)
            }else alert("No next index")
        }else{
            if (index>0){
                setIndex(prevState => prevState-1)
            }else alert("No previous index")
        }
    }
    const downloadPdf = (event) => {
        event.preventDefault()
        event.preventDefault();
        if (meetingDocument && meetingDocument.documents && meetingDocument.documents[index]) {
            saveAs(meetingDocument.documents[index], `meetingdocument-${index}-${meetingDocument.title}.pdf`);
        } else {
            console.error("Invalid document or URL");
        }
    };


    return (
        <FrontendLayout>
            <RevealWrapper origin={'left'} delay={0} className={"sm:w-1/2 w-11/12 my-4 sm:my-0"}>
                    <WhiteBox>
                        <div className={"p-4"}>
                            <p className={"font-bold text-4xl mb-4 text-black"}>Details</p>
                            {meetingDocument.title && <div className={"flex flex-wrap gap-2 text-black"}> <p className={"font-bold"}>Title: </p> {meetingDocument.title}</div>}
                            {meetingDocument.description && <div className={"flex flex-wrap gap-2 text-black "}> <p className={"font-bold"}>Description: </p> {meetingDocument.description}</div>}
                            {meetingDocument.date && <div className={"flex flex-wrap gap-2 text-black"}> <p className={"font-bold"}>Date: </p> {format(new Date(meetingDocument.date), 'MMMM do yyyy hh:mm a')}</div>}
                        </div>
                    </WhiteBox>

                    <button  onClick={(event)=>{downloadPdf(event)}} className={`w-full bg-blue-600 border rounded-full text-white mt-4 py-2 flex justify-center items-center md:gap-4 transition-all duration-500 font-semibold ${
                        session  ? "hover:bg-white hover:text-blue-600 hover:border-blue-600" : "cursor-not-allowed opacity-50 "
                    }`}
                    >
                        {(session)
                            ? (<>
                                            <PlusIcon></PlusIcon>
                                            <p>Download</p>
                                        </>
                                    )
                            : (<p>You should be authorized to join event</p>)}


                    </button>

                    <div className={"w-full gap-4 px-2"}>
                        <ShareLinks size={36} title={"Share meeting document:"} quote={"Look at this meeting documents "}></ShareLinks>
                    </div>


            </RevealWrapper>

            <RevealWrapper origin={'right'} delay={300} className={"sm:w-2/3 w-11/12"}>
                    <WhiteBox>
                        <div className={"p-4 w-full"}>
                            {meetingDocument.documents.length && (
                                <div className={"overflow-hidden"}>
                                    <embed src={meetingDocument.documents[index]} className={"w-full h-screen"}
                                    />
                                </div>
                                    )}
                        </div>
                        {(numberOfDocuments!==1) &&
                        <div className={"flex py-2 gap-10 mx-10"}>
                            <button onClick={(event)=>{changeIndex(event,"-")}} className={`w-full bg-blue-600 border rounded-full text-white mt-4 py-2 flex justify-center items-center md:gap-4 transition-all duration-500 font-semibold ${
                                (index>0) ? "hover:bg-white hover:text-blue-600 hover:border-blue-600" : "cursor-not-allowed opacity-50 "
                            }`}>
                                Previous</button>
                            <button onClick={(event)=>{changeIndex(event,"+")}} className={`w-full bg-blue-600 border rounded-full text-white mt-4 py-2 flex justify-center items-center md:gap-4 transition-all duration-500 font-semibold ${
                                ((index+1)!==numberOfDocuments) ? "hover:bg-white hover:text-blue-600 hover:border-blue-600" : "cursor-not-allowed opacity-50 "
                            }`}>
                                Next</button>
                        </div>}
                    </WhiteBox>
            </RevealWrapper>


        </FrontendLayout>
    );
};

export default SingleDocumentPage;

export async function getServerSideProps(context){
    await mongooseConnect();
    const {id} = context.query;
    const meetingDocument = await MeetingDocument.findById(id);
    return {
        props:{
            meetingDocument:JSON.parse(JSON.stringify(meetingDocument))
        }
    }
}