import React from 'react';
import {ClockLoader} from "react-spinners";

const IsWaitingCase = () => {
    return (
        <div className={"flex flex-col text-center"}>
            <div className={"w-full flex flex-col items-center justify-center "}>
                <ClockLoader color={'#7154e0'} speedMultiplier={2}/>
                <p>Waiting for verification by admin</p>
            </div>
            <p>If you was not verified during 3 working day, please contact admin</p>
        </div>
    );
};

export default IsWaitingCase;