import React from 'react';

const DeleteButton = ({onClickFunction}) => {
    return (
        <button className={"bg-red-600 text-black font-bold rounded-lg px-2 absolute right-0"} onClick={onClickFunction}>
            x
        </button>
    );
};

export default DeleteButton;