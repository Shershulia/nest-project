import React, {useState} from 'react';
import {getAdminServerSideProps} from "@/utils/adminUtils";
import {AdminLayout, DocumentForm, DocumentModal, GetEventsForEditing, WrongPermission} from "@/components";

const DocumentsAdminPage = ({isAdmin}) => {
    const [eventFormStart, setEventFormStart] = useState(false);
    const [eventFormEdit, setEventFormEdit] = useState(false);

    return (
        isAdmin ? (
                <div className="h-full flex">
                    <AdminLayout>
                        <div>
                            <button
                                onClick={() => {
                                    setEventFormStart(prevState => !prevState);
                                }}
                                className={`border-x border-t border-white py-8 w-full rounded-t-lg text-xl ${eventFormStart ? 'bg-customPurple' : 'bg-customDarkPurple'
                                } transition-all duration-300 text-white`}
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
                                className={`border border-white py-8 w-full text-xl ${eventFormEdit ? 'bg-customPurple' : 'bg-customDarkPurple'
                                } transition-all duration-300 text-white`}
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
