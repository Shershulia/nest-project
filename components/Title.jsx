import React from 'react';

const Title = ({text, className = ""}) => {
    return (
        <div className={"flex justify-center items-center py-2 w-full"}>
            <h1 className={`text-xl text-black font-bold ${className}`}>{text}</h1>
        </div>
    );
};

export default Title;