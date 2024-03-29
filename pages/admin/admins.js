import React, {useEffect, useState} from 'react';
import {
    AddAdminComponent,
    AdminLayout,
    DeleteAdmin,
    Input,
    Title,
    UsersNotificationComponents,
    WrongPermission
} from "@/components";
import { getAdminServerSideProps} from "@/utils/adminUtils";
import io from 'socket.io-client';


const AdminsAdminPage = ({isAdmin}) => {
    const [notification, setNotification] = useState("");
    // State to store the socket connection
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Create a socket connection
        const newSocket = io();
        setSocket(newSocket);

        // Clean up the socket connection on unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = (event) => {
        event.stopPropagation();
        event.preventDefault();
        // Send the message to the server
        if (socket) {
            socket.emit('message', notification);
        }
        // Clear the currentMessage state
        setNotification('');
    };

    return (
        isAdmin ? (
        <div className="h-full flex">
            <AdminLayout backgroundColor={"customPurple"} backgroundOpacity={"0.4"}>
                <AddAdminComponent></AddAdminComponent>
                <DeleteAdmin></DeleteAdmin>
                <div className={"flex flex-col justify-center w-full items-center"}>
                    <div className={"w-full"}>
                        <Title text={"Send notification"} color={"text-white"}></Title>
                        <Input
                            value={notification}
                            onChange={setNotification}
                            className={"md:w-1/3 w-3/4 p-2 rounded-t-lg border-white text-center"} />
                    </div>
                    <button className={"bg-customLightPurple hover:bg-violet-700 transition-all duration-500" +
                        " text-lg font-bold p-2 md:w-1/3 w-3/4 rounded-b-lg border-black"}
                            onClick={(event)=>sendMessage(event)}>Send notification</button>
                </div>
                <UsersNotificationComponents socket={socket} />
            </AdminLayout>
        </div>):
            (
                <WrongPermission/>
            )
    );
};

export default AdminsAdminPage;

export async function getServerSideProps(ctx){
    return await getAdminServerSideProps(ctx);
}