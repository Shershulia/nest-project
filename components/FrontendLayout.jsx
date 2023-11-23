import React from 'react';

const FrontendLayout = ({children}) => {
    return (
        <div className={"bg-white min-h-screen w-full flex sm:flex-row flex-col " +
            "items-center justify-center sm:items-start w-full sm:gap-10 md:py-12 py-6 2xl:px-48"}>
            {children}
        </div>
    );
};

export default FrontendLayout;