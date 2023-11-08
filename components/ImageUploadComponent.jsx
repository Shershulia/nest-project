import React, {useState} from 'react';
import {ReactSortable} from "react-sortablejs";
import {DeleteButton, Spinner, Title} from "@/components/index";
import axios from "axios";

const ImageUploadComponent = ({title,images,setImages}) => {
    const [isUploading, setIsUploading] = useState(false);
    async function uploadImages(event){
        setIsUploading(true)
        const files = event.target?.files;
        if(files?.length>0){
            const data= new FormData();
            for (const file of files){
                data.append("file",file)
            }
            const response = await axios.post("/api/upload",data, {
                headers:{"Content-Type": "multipart/form-data"}
            });
            setImages(oldImages =>{
                return [...oldImages, ...response.data.links];
            })
            setIsUploading(false)
        }

    }
    const updateImagesOrder = (images) =>{
        setImages(images)
    }

    const deleteItems = (key)=> {
        setImages(images.filter((_, index) => index !== key))
    }
    return (
        <div className={"flex flex-col items-center"}>
            <Title text={title}/>
            <div className={"mb-2 flex flex-wrap gap-2 justify-center items-center"}>
                <ReactSortable list={images} setList={updateImagesOrder} className={"flex flex-wrap gap-2"}>
                    {!!images?.length && images.map((link,index)=>(
                            <div key={link} className={"h-24 w-24 relative"}>
                                <DeleteButton onClickFunction={()=>{deleteItems(index)}}/>
                                <img src={link} alt={"Uploaded image"} className={"rounded-lg h-full w-full object-cover"}/>
                            </div>
                        )
                    )}
                </ReactSortable>
                {isUploading && (
                    <div className={"w-24 h-24 flex justify-center items-center"}>
                        <Spinner fullWidth={true}></Spinner>
                    </div>
                )}
                {!images?.length && !isUploading && (
                    <div className={""}>No photos</div>
                )}
                <label className={"inline-block w-24 h-24 text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 cursor-pointer"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" className={"hidden"}
                           onChange={(event)=>uploadImages(event)}/>

                </label>

            </div>
        </div>
    );
};

export default ImageUploadComponent;