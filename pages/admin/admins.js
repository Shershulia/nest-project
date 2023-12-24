import React, {useEffect, useState} from 'react';
import {AddAdminComponent, AdminLayout, DeleteAdmin, Input, Title, WrongPermission} from "@/components";
import { getAdminServerSideProps} from "@/utils/adminUtils";
import io from 'socket.io-client';
let socket
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
        <div className="h-full flex bg-blue-600">
            <AdminLayout>
                <AddAdminComponent></AddAdminComponent>
                <DeleteAdmin></DeleteAdmin>
                <div className={"flex flex-col justify-center w-full items-center"}>
                    <Input label={"Send notification"}
                           value={notification}
                           onChange={setNotification}
                           className={"w-1/3 p-2 rounded-t-lg"} />
                    <button className={"bg-green-600 text-lg font-bold p-2 w-1/3 rounded-b-lg border-black"}
                            onClick={(event)=>sendMessage(event)}>Send notification</button>
                </div>
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