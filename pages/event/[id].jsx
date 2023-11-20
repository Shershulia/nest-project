import {mongooseConnect} from "@/lib/mongoose";
import {RevealWrapper} from "next-reveal";
import {CalendarIcon, PlusIcon, ShareIcon, ShareLinks, WhiteBox} from "@/components";
import {Event} from "@/models/Event";
import {format} from "date-fns";
import axios from "axios";
import {useSession} from "next-auth/react";
import {data} from "autoprefixer";
import {useRouter} from "next/router";

const SingeProductPage = ({event}) => {
    const { data: session } = useSession()
    const createGoogleCalendarEvent = () =>{
        // const eventToSend ={
        //     "summary":event.name,
        //     "description":event.description,
        //     "start":{
        //         "dateTime":event.date.toIsoString(),
        //         "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
        //     },
        //     "end":{
        //         "dateTime":event.date.setHours(event.date.getHours()+2).toIsoString(),
        //         "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
        //     }
        // }
       // axios.post("https://www.googleapis.com/calendar/v3/calendars/primary/events",eventToSend).then(res=>
        //console.log(res.data))
        console.log(session)
    }

    return (
        <div className={"bg-white h-full flex sm:flex-row flex-col-reverse items-center justify-center sm:items-start w-full md:gap-10"}>
            <RevealWrapper origin={'left'} delay={0} className={"sm:w-1/2 w-11/12"}>
                <div className={"md:py-12 py-6 md:pl-60 w-full "}>
                    <WhiteBox>
                        <div className={"p-4"}>
                            <p className={"font-bold text-4xl mb-4 text-black"}>Details</p>
                            {event.date && <div className={"flex flex-wrap gap-2 text-black"}> <p className={"font-bold"}>Date: </p> {format(new Date(event.date), 'MMMM do yyyy hh:mm a')}</div>}
                            {event.place && <div className={"flex flex-wrap gap-2 text-black"}> <p className={"font-bold"}>Place: </p> {event.place}</div>}
                            {event.numberOfPeople!==0 && <div className={"flex flex-wrap gap-2 text-black"}> <p className={"font-bold"}>Number of people: </p> {event.numberOfPeople}</div> }
                            {event.price!==0 && <div className={"flex flex-wrap gap-2 text-black"}> <p className={"font-bold"}>Price: </p> {event.price}</div> }
                            {event.contactPerson && <div className={"flex flex-col truncate max-w-full text-black"}> <p className={"font-bold"}>Contact person: </p> {event.contactPerson}</div> }

                        </div>
                    </WhiteBox>

                    <button  onClick={createGoogleCalendarEvent} className={"w-full border-blue-600 border rounded-full text-blue-600 bg-white " +
                        "mt-4 py-2 flex justify-center items-center md:gap-4 hover:bg-blue-600 hover:text-white transition-all duration-500 font-semibold"}>
                        <CalendarIcon/>
                        <p>Add to calendar</p>
                    </button>
                    <button  onClick={()=>{}} className={`w-full bg-blue-600 border rounded-full text-white ${session ? "hover:bg-white hover:text-blue-600 hover:border-blue-600 " : "cursor-not-allowed opacity-50 "}` +
                        "mt-4 py-2 flex justify-center items-center md:gap-4 transition-all duration-500 font-semibold"}>
                        <PlusIcon/>
                        <p>{session ? `Join Event ${event.price},-`: "You should be authorized to join event"}</p>
                    </button>
                    <div className={"w-full gap-4 px-2"}>
                        <ShareLinks size={36} title={"Share event:"}></ShareLinks>
                    </div>



                </div>
            </RevealWrapper>

            <RevealWrapper origin={'right'} delay={300} className={"sm:w-2/3 w-11/12"}>
                <div className={"md:py-12 py-6f md:pr-60 w-full"}>
                    <WhiteBox>
                        {event.images.length>0 && <div className={"h-[300px] md:h-[450px]"}>
                            <img src={event.images[0]} className={"rounded-t-lg h-full w-full object-cover"} />
                        </div>}
                        <div className={"p-4"}>
                            {event.name && <div className={"flex gap-2 text-2xl text-black font-size[50px] font-bold overflow-clip"}>{event.name}</div>}
                            {event.description && (<div className={"flex gap-2 my-4 text-black  "}>{event.description}</div>) }

                        </div>
                    </WhiteBox>
                </div>
            </RevealWrapper>


        </div>
    );
};
export default SingeProductPage;

export async function getServerSideProps(context){
    await mongooseConnect();
    const {id} = context.query;
    const product = await Event.findById(id);
    return {
        props:{
            event:JSON.parse(JSON.stringify(product))
        }
    }
}