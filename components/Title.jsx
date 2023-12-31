import React from 'react';

const Title = ({text, className = "", color}) => {
    const textColor = color ? "text-" + color : "text-black";

    return (
        <div className={"flex justify-center items-center py-2 w-full"}>
            <h1 className={`text-xl ${textColor} font-bold ${className}`}>{text}</h1>
        </div>
    );
};

export default Title;