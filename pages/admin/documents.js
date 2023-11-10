import React, {useState} from 'react';
import {getAdminServerSideProps} from "@/utils/adminUtils";
import {AdminLayout, DocumentForm, GetEventsForEditing, WrongPermission} from "@/components";

const DocumentsAdminPage = ({isAdmin}) => {
    const [eventFormStart, setEventFormStart] = useState(false);
    const [eventFormEdit, setEventFormEdit] = useState(false);


    return (
        isAdmin ? (
                <div className="h-full flex bg-blue-600">
                    <AdminLayout>
                        <div>
                            <button
                                onClick={() => {
                                    setEventFormStart(prevState => !prevState);
                                }}
                                className={`border-x border-t border-black py-8 w-full rounded-t-lg text-xl ${eventFormStart ? 'bg-gray-200' : 'bg-white'
                                } transition-all duration-300`}
                            >
                                Create Meeting Document
                            </button>
                            <div
                                className={`overflow-hidden transition-max-height duration-300 ${
                                    eventFormStart ? 'max-h-full' : 'max-h-0'
                                } `}
                            >
                                {eventFormStart && <DocumentForm closeEvent={setEventFormStart} />}
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setEventFormEdit(prevState => !prevState);
                                }}
                                className={`border border-black py-8 w-full text-xl ${eventFormEdit ? 'bg-gray-200' : 'bg-white'
                                } transition-all duration-300`}
                            >
                                Edit Meeting Document
                            </button>
                            <div
                                className={`overflow-hidden transition-max-height duration-300 ${
                                    eventFormEdit ? 'max-h-full' : 'max-h-0'
                                } `}
                            >
                                {eventFormEdit && <GetEventsForEditing isMeetingForm={true}/>}
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

export default DocumentsAdminPage;
export async function getServerSideProps(ctx){
    return await getAdminServerSideProps(ctx);
}
