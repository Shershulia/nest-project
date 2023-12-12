import React from 'react';

const UserWasConfirmed = ({subscription,setModal}) => {
    return (
        <div className={"flex flex-col text-center gap-4"}>
            <div className={"w-full flex items-center justify-center gap-2"}>
                <p>Your account was verified, you can pay for subscription now</p>
                <i className="bi bi-check-circle-fill text-green-600"/>
            </div>
            {subscription ? (
                <p>Subscription</p>
            ) : (
                <button className={"bg-green-600 hover:bg-green-700 duration-300 rounded-md"}
                onClick={()=>{setModal(true)}}>Pay for subscription</button>
            )
            }

        </div>
    );
};

export default UserWasConfirmed;