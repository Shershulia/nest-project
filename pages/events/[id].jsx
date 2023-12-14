import {mongooseConnect} from "@/lib/mongoose";
import {RevealWrapper} from "next-reveal";
import {
    AddToCalendarButton,
    CalendarIcon,
    FrontendLayout,
    PaymentMethodsModals,
    PlusIcon,
    ShareLinks,
    WhiteBox
} from "@/components";
import {Event} from "@/models/Event";
import {format} from "date-fns";
import {useSession} from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {ClockLoader} from "react-spinners";


const SingeProductPage = ({event}) => {
    const { data: session } = useSession()
    const [modal,setModal] = useState(false);
    const [contactStatus, setContactStatus] = useState(false);
    const [informationPayment, setInformationPayment] = useState(false);

    const [statusIsLoading, setStatusIsLoading] = useState(false);
    const [subscriptionValid,setSubscriptionValid] = useState(false);

    const searchParams = useSearchParams();
    useEffect(()=>{
        setSubscriptionValid(()=>(isLessThan30DaysAgo(session?.user?.subscription)))
        console.log(isLessThan30DaysAgo(session?.user?.subscription));
    },[session])

    function isLessThan30DaysAgo(targetDate) {
        if (!targetDate) return false
        // Convert the target date to a Date object
        const target = new Date(targetDate);
        // Get the current date
        const currentDate = new Date();

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = currentDate - target;
        // Calculate the difference in days
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

        // Check if the difference is more than 30 days
        return differenceInDays < 30;
    }

    const checkStatus = ()=>{
        setStatusIsLoading(true)
        axios.post("/api/vipps/status",{event}).then(res=>{
            if(res.data){
                location.reload();
            }else {
                alert("Your payment was unsuccessful")
            }
            setStatusIsLoading(false);
        }).catch((er)=>{
            setContactStatus(true)
        })


    }
    useEffect(()=>{
        if (searchParams.get("check")){
            checkStatus()
        }
    },[])
    const joinEvent = () => {
        if (event.participants.includes(session.user.email)) {
            Swal.fire({
                title: `Do you unassign from this event`,
                showCancelButton: true,
                confirmButtonText: 'Yes',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const dataToEdit = {
                        event,
                        flag: "d"
                    }
                    axios.post("/api/joinEvent", dataToEdit).then(res => {
                        if (res.data) {
                            Swal.fire(
                                'Good job!',
                                `You was unassigned for this event`,
                                'success'
                            ).then(result=>{
                                location.reload();

                            })

                        }
                    }).catch((error) => {
                        Swal.fire(
                            'Error',
                            "Hm... Something went wrong, please contact support with your case. " + error.message,
                            'error'
                        )

                    })
                }
            })
        } else {
            setModal(true)

        }

    }

    return (
        <>
            <FrontendLayout>
                <RevealWrapper origin={'left'} delay={0} className={"sm:w-1/2 w-11/12 my-4 sm:my-0"}>
                    <WhiteBox>
                        <div className={"p-4"}>
                            <p className={"font-bold text-4xl mb-4 text-black"}>Details</p>
                            {event.date && <div className={"flex flex-wrap gap-2 text-black"}> <p className={"font-bold"}>Date: </p> {format(new Date(event.date), 'MMMM do yyyy hh:mm a')}</div>}
                            {event.place && <div className={"flex flex-wrap gap-2 text-black"}> <p className={"font-bold"}>Place: </p> {event.place}</div>}
                            {event.numberOfPeople!==0 && <div className={"flex flex-wrap gap-2 text-black"}> <p className={"font-bold"}>Number of people: </p> {event.participants.length}/{event.numberOfPeople}</div> }
                            {event.price!==0 && <div className={"flex flex-wrap gap-2 text-black"}> <p className={"font-bold"}>Price: </p> {event.price}</div> }
                            {event.contactPerson && <div className={"flex flex-col truncate max-w-full text-black"}> <p className={"font-bold"}>Contact person: </p> {event.contactPerson}</div> }
                        </div>
                    </WhiteBox>

                    <AddToCalendarButton event={event}/>
                    <button
                        onClick={joinEvent}
                        className={`w-full bg-blue-600 border rounded-full text-white mt-4 py-2 flex justify-center items-center md:gap-4 transition-all duration-500 font-semibold 
                        ${
                            session && subscriptionValid
                            ? (event.participants.length >= event.numberOfPeople && !event.participants.includes(session.user.email) )
                                ? "cursor-not-allowed opacity-50"
                                : "hover:bg-white hover:text-blue-600 hover:border-blue-600"
                            : "cursor-not-allowed opacity-50 "
                    }`}
                        disabled={
                            !session ||
                            (!event.participants.includes(session.user.email) &&
                                event.participants.length >= event.numberOfPeople) ||
                            !subscriptionValid
                        }
                    >
                        {session ? (
                            subscriptionValid ? (
                                event.participants.includes(session.user.email) ? (
                                    <p>You already joined this event, click here to unassign</p>
                                ) : event.participants.length >= event.numberOfPeople ? (
                                    <p>This event is full, try to apply later</p>
                                ) : (
                                    <>
                                        <PlusIcon></PlusIcon>
                                        <p>Join Event {event.price},-</p>
                                    </>
                                )
                            ) : (
                                <p>Your subscription is not valid. More info on the account page.</p>
                            )
                        ) : (
                            <p>You should be authorized to join the event</p>
                        )}
                    </button>;

                    <div className={"w-full gap-4 px-2"}>
                        <ShareLinks size={36} title={"Share event:"} quote={"Look at this event"}></ShareLinks>
                    </div>
                    <div className={"flex flex-col justify-center items-center text-white text-center mt-2"}>
                        {!informationPayment ? (
                            <button className={"text-white mt-12 text-center"} onClick={()=>{
                                setInformationPayment(true)
                            }}
                            >Show information after payment</button>
                        ) :(
                            <>
                                <p>If you have paid, but didn`t recieve confirmation,please, press this button</p>
                                <div className={" flex items-center gap-2 relative"}>
                                    {!statusIsLoading ? (<button className={"text-white border p-2 text-center " +
                                        "rounded-md hover:bg-blue-600 duration-300"}
                                                                onClick={()=>{checkStatus();setContactStatus(true);}}>Check status of my payment</button>) :
                                        (<ClockLoader color={"white"} size={"30"}></ClockLoader>)}
                                </div>

                                {contactStatus && (<p>If that didn`t help, please contact admin</p>)}</>
                        )}

                    </div>



                </RevealWrapper>

                <RevealWrapper origin={'right'} delay={300} className={"sm:w-2/3 w-11/12"}>
                    <WhiteBox>
                        {event.images.length>0 && <div className={"h-[300px] md:h-[450px]"}>
                            <img src={event.images[0]} className={"rounded-t-lg h-full w-full object-cover"} />
                        </div>}
                        <div className={"p-4"}>
                            {event.name && <div className={"flex gap-2 text-2xl text-black font-size[50px] font-bold overflow-clip"}>{event.name}</div>}
                            {event.description && (<div className={"flex gap-2 my-4 text-black  "}>{event.description}</div>) }
                        </div>
                    </WhiteBox>
                </RevealWrapper>
            </FrontendLayout>
        {modal && <PaymentMethodsModals event={event} setModal={setModal}/>}
</>
);
};
export default SingeProductPage;

export async function getServerSideProps(context){
    await mongooseConnect();
    const {id} = context.query;
    const event = await Event.findById(id);
    return {
        props:{
            event:JSON.parse(JSON.stringify(event))
        }
    }
}