import React from 'react';

const UserWasDeclined = ({message}) => {
    return (
        <div className={"flex flex-col text-center gap-4"}>
            <div className={"w-full flex items-center justify-center gap-2"}>
                <p>Your account was declined</p>
                <i class="bi bi-slash-circle text-red-500"></i>
            </div>
            <p className={"overflow-ellipsis"}>Reason : {message.split("declined:")[1]} <br/>
                Please contact admin, if you want to appeal</p>
        </div>
        );
};

export default UserWasDeclined;