import {mongooseConnect} from "@/lib/mongoose";
import {RevealWrapper} from "next-reveal";
import {CalendarIcon, ShareIcon, WhiteBox} from "@/components";
import {Event} from "@/models/Event";
import {format} from "date-fns";
import axios from "axios";
const SingeProductPage = ({event}) => {

    const createGoogleCalendarEvent = () =>{
        const eventToSend ={
            "summary":event.name,
            "description":event.description,
            "start":{
                "dateTime":event.date.toIsoString(),
                "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            "end":{
                "dateTime":event.date.setHours(event.date.getHours()+2).toIsoString(),
                "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        }
        axios.post("https://www.googleapis.com/calendar/v3/calendars/primary/events",eventToSend).then(res=>
        console.log(res.data))
    }

    return (
        <div className={"bg-white h-full flex w-full gap-10"}>
            <RevealWrapper origin={'left'} delay={0} className={"w-1/2"}>
                <div className={"py-12 pl-60 w-full"}>
                    <WhiteBox>
                        <div className={"p-4"}>
                            <p className={"font-bold text-4xl mb-4"}>Details</p>
                            {event.date && <div className={"flex gap-2"}> <p className={"font-bold"}>Date: </p> {format(new Date(event.date), 'MMMM do yyyy hh:mm a')}</div>}
                            {event.place && <div className={"flex gap-2"}> <p className={"font-bold"}>Place: </p> {event.place}</div>}
                            {event.numberOfPeople!==0 && <div className={"flex gap-2"}> <p className={"font-bold"}>Number of people: </p> {event.numberOfPeople}</div> }
                            {event.price!==0 && <div className={"flex gap-2"}> <p className={"font-bold"}>Price: </p> {event.price}</div> }
                            {event.contactPerson && <div className={"flex gap-2"}> <p className={"font-bold"}>Contact person: </p> {event.contactPerson}</div> }

                        </div>
                    </WhiteBox>
                    <button className={"w-full border-blue-600 border rounded-full text-blue-600 bg-white " +
                        "mt-12 py-2 flex justify-center items-center gap-4 hover:bg-blue-600 hover:text-white transition-all duration-500 font-semibold"}>
                        <ShareIcon></ShareIcon>
                        <p>Share</p>
                    </button>
                    <button  onClick={createGoogleCalendarEvent} className={"w-full border-blue-600 border rounded-full text-blue-600 bg-white " +
                        "mt-4 py-2 flex justify-center items-center gap-4 hover:bg-blue-600 hover:text-white transition-all duration-500 font-semibold"}>
                        <CalendarIcon/>
                        <p>Add to calendar</p>
                    </button>
                </div>
            </RevealWrapper>

            <RevealWrapper origin={'right'} delay={300} className={"w-2/3"}>
                <div className={"py-12 pr-60 w-full"}>
                    <WhiteBox>
                        {event.images.length>0 && <div className={"h-[300px] md:h-[450px]"}>
                            <img src={event.images[0]} className={"rounded-t-lg h-full w-full object-cover"} />
                        </div>}
                        <div className={"p-4"}>
                            {event.name && <div className={"flex gap-2 text-4xl font-bold"}>{event.name}</div>}
                            {event.description && (<div className={"flex gap-2 my-4"}>{event.description}</div>) }

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