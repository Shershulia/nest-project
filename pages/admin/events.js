import React from 'react';
import {AdminLayout, EventForm} from "@/components";

const EventsAdminPage = () => {
    return (
        <div className="h-screen flex">
            <AdminLayout>
                <EventForm/>

            </AdminLayout>
        </div>
    );
};

export default EventsAdminPage;