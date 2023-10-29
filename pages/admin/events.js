import React from 'react';
import {AdminLayout, EventForm} from "@/components";

const EventsAdminPage = () => {
    return (
        <div className="h-full flex bg-blue-600">
            <AdminLayout>
                <EventForm/>

            </AdminLayout>
        </div>
    );
};

export default EventsAdminPage;