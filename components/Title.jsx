import React from 'react';

const Title = ({text, className = ""}) => {
    return (
        <div className={"flex justify-center items-center py-6"}>
            <h1 className={`text-xl font-bold ${className}`}>{text}</h1>
        </div>
    );
};

export default Title;