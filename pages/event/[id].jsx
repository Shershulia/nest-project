import {mongooseConnect} from "@/lib/mongoose";
import {RevealWrapper} from "next-reveal";
import {WhiteBox} from "@/components";
import {Event} from "@/models/Event";
import {format} from "date-fns";
const SingeProductPage = ({event}) => {
    return (
        <div className={"bg-white h-screen flex w-full gap-20"}>
            <RevealWrapper origin={'left'} delay={0} className={"w-1/3"}>
                <div className={"py-12 pl-12 w-full"}>
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
                </div>
            </RevealWrapper>

            <RevealWrapper origin={'right'} delay={300} className={"w-2/3"}>
                <div className={"py-12 pr-12 w-full"}>
                    <WhiteBox>
                        {event.images.length>0 && <div className={"h-[100px]"}>
                            <img src={event.images[0]} className={"rounded-t-lg h-full w-full object-cover"} />
                            <p>{event.images[0]}</p>
                        </div>}
                        <div className={"p-4"}>
                            {event.place && <div className={"flex gap-2"}> <p className={"font-bold"}>Place: </p> {event.place}</div>}
                            {event.numberOfPeople!==0 && <div className={"flex gap-2"}> <p className={"font-bold"}>Number of people: </p> {event.numberOfPeople}</div> }
                            {event.price!==0 && <div className={"flex gap-2"}> <p className={"font-bold"}>Price: </p> {event.price}</div> }
                            {event.contactPerson && <div className={"flex gap-2"}> <p className={"font-bold"}>Contact person: </p> {event.contactPerson}</div> }

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