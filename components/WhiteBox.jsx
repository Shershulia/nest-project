import React from 'react';

const WhiteBox = ({children}) => {
    return (
        <div className={"bg-white rounded-xl  shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"}>
            <div>
                {children}
            </div>
        </div>
    );
};

export default WhiteBox;