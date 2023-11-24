import React, {useState} from 'react';
const overlayStyles = "w-screen h-screen top-0 left-0 right-0 left-0 fixed transition-all duration-300 ";
const DocumentModal = ({title,link}) => {
    const [modal, setModal] = useState(false);

    return (
        <div className={"w-full h-full flex justify-center items-center"}>
            <button
                className={" border w-full h-full rounded-lg"}
                onClick={()=>setModal(true)}
            >{title}</button>
            {modal && (
                <div className={overlayStyles} onClick={()=>setModal(false)}>
                    <div className={overlayStyles + "bg-gray-900 bg-opacity-50"}>
                        <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 leading-4 bg-white p-4 rounded-md w-1/2 h-1/2"}>
                            <iframe src={link}
                                    className={"w-full h-full"}
                                    onClick={()=>setModal(false)}/>

                            <button className={"absolute top-0 right-0 p-2 border-black rounded-lg bg-white"} onClick={()=>setModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DocumentModal;