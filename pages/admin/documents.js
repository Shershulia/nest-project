import React, {useState} from 'react';
import {getAdminServerSideProps} from "@/utils/adminUtils";
import {AdminLayout, DocumentForm, DocumentModal, GetEventsForEditing, WrongPermission} from "@/components";

const DocumentsAdminPage = ({isAdmin}) => {
    const [eventFormStart, setEventFormStart] = useState(false);
    const [eventFormEdit, setEventFormEdit] = useState(false);

    return (
        isAdmin ? (
                <div className="h-full flex">
                    <AdminLayout backgroundColor={"transparent"}>
                        <div>
                            <button
                                onClick={() => {
                                    setEventFormStart((prevState) => !prevState);
                                }}
                                className={`border-x border-t border-white py-8 w-full text-white rounded-t-lg text-xl ${
                                    eventFormStart ? 'bg-customPurple' : 'bg-customDarkPurple'
                                } transition-all duration-1000`}
                            >
                                Create Meeting Document
                            </button>
                            <div
                                className={`overflow-hidden bg-white transition-all duration-1000 ${
                                    eventFormStart ? 'opacity-100 max-h-fit md:py-6 py-10' : 'opacity-0 max-h-0 py-0'
                                } `}
                                style={{ transitionProperty: 'opacity, max-height' }}
                            >
                                {eventFormStart && <DocumentForm closeEvent={setEventFormStart} />}
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setEventFormEdit((prevState) => !prevState);
                                }}
                                className={`border border-white text-white py-8 w-full text-xl ${
                                    eventFormEdit ? 'bg-customPurple' : 'bg-customDarkPurple'
                                } transition-all duration-300`}
                            >
                                Edit event
                            </button>
                            <div
                                className={`overflow-hidden transition-all bg-white duration-300 ${
                                    eventFormEdit ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0'
                                } `}
                                style={{ transitionProperty: 'opacity, max-height' }}
                            >
                                {eventFormEdit && <GetEventsForEditing isMeetingForm={true}/>}
                            </div>
                        </div>
                        <div className='bg-customDarkPurple flex-1'></div>
                    </AdminLayout>
                </div>
            ):
            (
                <WrongPermission/>
            )
    );
};

export default DocumentsAdminPage;
export async function getServerSideProps(ctx){
    return await getAdminServerSideProps(ctx);
}
