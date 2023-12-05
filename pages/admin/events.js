import React, { useState } from 'react';
import {AdminLayout, EventForm, GetEventsForEditing, WrongPermission} from "@/components";
import {getAdminServerSideProps} from "@/utils/adminUtils";

const EventsAdminPage = ({isAdmin}) => {
    const [eventFormStart, setEventFormStart] = useState(false);
    const [eventFormEdit, setEventFormEdit] = useState(false);


    return (
        isAdmin ? (
        <div className="h-full flex bg-blue-600">
            <AdminLayout>
                <div>
                    <button
                        onClick={() => {
                            setEventFormStart((prevState) => !prevState);
                        }}
                        className={`border-x border-t border-black py-8 w-full rounded-t-lg text-xl ${
                            eventFormStart ? 'bg-gray-200' : 'bg-white'
                        } transition-all duration-1000`}
                    >
                        Create event
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-1000 ${
                            eventFormStart ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0'
                        } `}
                        style={{ transitionProperty: 'opacity, max-height' }}
                    >
                        {eventFormStart && <EventForm closeEvent={setEventFormStart} />}
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => {
                            setEventFormEdit((prevState) => !prevState);
                        }}
                        className={`border border-black py-8 w-full text-xl ${
                            eventFormEdit ? 'bg-gray-200' : 'bg-white'
                        } transition-all duration-300`}
                    >
                        Edit event
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ${
                            eventFormEdit ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0'
                        } `}
                        style={{ transitionProperty: 'opacity, max-height' }}
                    >
                        {eventFormEdit && <GetEventsForEditing />}
                    </div>
                </div>


            </AdminLayout>
        </div>
        ):
    (
        <WrongPermission/>
    )
);
};

export default EventsAdminPage;

//Check of admin permission happens on server side
export async function getServerSideProps(ctx){
    return await getAdminServerSideProps(ctx);
}
