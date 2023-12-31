import React from 'react';

const NewUserCase = ({sendVerification}) => {
    return (
        <div className={"flex flex-col w-full items-center justify-center gap-4"}>
            <p>For subscription updating our admin should verify your email first</p>
            <button onClick={sendVerification} className={"p-2 bg-green-600 text-white"}>Verify Account</button>
        </div>
    );
};

export default NewUserCase;