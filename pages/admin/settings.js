import React, {useState} from 'react';
import {AdminLayout, Input, TextArea, Title, WrongPermission} from "@/components";
import {checkIfUserIsAdmin, getAdminServerSideProps} from "@/utils/adminUtils";
import ImageUploadComponent from "@/components/ImageUploadComponent";
import {mongooseConnect} from "@/lib/mongoose";
import {Admin} from "@/models/Admin";
import {getSession} from "next-auth/react";
import {Settings} from "@/models/Settings";
import Swal from "sweetalert2";
import axios from "axios";

const SettingsAdminPage = ({isAdmin,
                               mainPictures : loaded,
                               subscriptionObject : existingSubscription,
                               greeting: existingGreeting,
                               description:existingDescription}) => {
    const [mainPictures, setMainPictures] = useState(loaded.images);
    const [subscriptionPrice, setSubscriptionPrice] = useState(existingSubscription?.value || 0);
    const [greeting, setGreeting] = useState(existingGreeting?.value || "");
    const [description, setDescription] = useState(existingDescription?.value || "");


    const changeMainPictures = (ev) => {
        ev.preventDefault();
        if (JSON.stringify(loaded.images) === JSON.stringify(mainPictures)) {
            Swal.fire(
                'Alert!',
                `You made no changes in images`,
                'question'
            )
        } else {
            Swal.fire({
                title: `Are you sure that you want to change images on the main page?`,
                showCancelButton: true,
                confirmButtonText: 'Change',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.put('/api/admin/settings/images', {...loaded, images: mainPictures}).then(res => {
                        Swal.fire({
                            title: 'Images is changed',
                            icon: "success",
                        })
                    }).catch(err => {
                        console.log(err);
                        Swal.fire({
                            title: 'Error!',
                            text: err.message,
                            icon: "error",
                        })
                    });
                }

            })
        }
    }
    const saveNewSubscriptionPrice = (ev) => {
        ev.preventDefault();
        if (existingSubscription.value === subscriptionPrice) {
            Swal.fire(
                'Alert!',
                `You made no changes in images`,
                'question'
            )
        } else {
            Swal.fire({
                title: `Are you sure that you want to change subscription price for ${subscriptionPrice}?`,
                showCancelButton: true,
                confirmButtonText: 'Change',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.put('/api/admin/settings/change', {
                        _id: existingSubscription._id,
                        value: subscriptionPrice
                    }).then(res => {
                        Swal.fire({
                            title: 'Subscription price was changed',
                            icon: "success",
                        })
                    }).catch(err => {
                        console.log(err);
                        Swal.fire({
                            title: 'Error!',
                            text: err.message,
                            icon: "error",
                        })
                    });
                }

            })
        }
    }
    const saveDescription = (ev) => {
        ev.preventDefault();
        if (existingDescription.value === description) {
            Swal.fire(
                'Alert!',
                `You made no changes in images`,
                'question'
            )
        } else {
            Swal.fire({
                title: `Are you sure that you want to change description for ${description}?`,
                showCancelButton: true,
                confirmButtonText: 'Change',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.put('/api/admin/settings/change', {
                        _id: existingDescription._id,
                        value: description
                    }).then(res => {
                        Swal.fire({
                            title: 'Description was changed',
                            icon: "success",
                        })
                    }).catch(err => {
                        console.log(err);
                        Swal.fire({
                            title: 'Error!',
                            text: err.message,
                            icon: "error",
                        })
                    });
                }

            })
        }
    }
    const saveGreetings = (ev) => {
        ev.preventDefault();
        if (existingGreeting.value === greeting) {
            Swal.fire(
                'Alert!',
                `You made no changes in images`,
                'question'
            )
        } else {
            Swal.fire({
                title: `Are you sure that you want to change greeting price for ${greeting}?`,
                showCancelButton: true,
                confirmButtonText: 'Change',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.put('/api/admin/settings/change', {
                        _id: existingGreeting._id,
                        value: greeting
                    }).then(res => {
                        Swal.fire({
                            title: 'Greeting message was changed',
                            icon: "success",
                        })
                    }).catch(err => {
                        console.log(err);
                        Swal.fire({
                            title: 'Error!',
                            text: err.message,
                            icon: "error",
                        })
                    });
                }

            })
        }
    }

    return (
        isAdmin ? (
                <div className="h-full flex bg-blue-600">
                    <AdminLayout>
                        <div className={"flex flex-col items-center"}>
                            <ImageUploadComponent title={"Main pictures"}
                                                  setImages={setMainPictures}
                                                  images={mainPictures}/>
                            <button
                                className={"bg-green-600 hover:bg-green-700 transition-all w-fit text-lg font-bold p-2 rounded-md border-black mx-4"}
                                onClick={(event) => changeMainPictures(event)}>Save changes
                            </button>
                        </div>
                        <div className={"flex justify-center items-center  flex-wrap w-2/3 m-auto"}>
                            <div className={"flex flex-col items-center w-1/2"}>
                                <Input label={"Price of subscription"} className={"text-center w-11/12"} isDigits={true}
                                       value={subscriptionPrice} onChange={setSubscriptionPrice}/>
                                <button
                                    className={"mt-2 bg-green-600 hover:bg-green-700 transition-all w-fit text-lg font-bold p-2 rounded-md border-black mx-4"}
                                    onClick={(event) => saveNewSubscriptionPrice(event)}>Save changes
                                </button>
                            </div>
                            <div className={"flex flex-col items-center w-1/2"}>
                                <Input label={"Greeting message"} className={"text-center w-11/12"} value={greeting}
                                       onChange={setGreeting}/>
                                <button
                                    className={"mt-2 bg-green-600 hover:bg-green-700 transition-all w-fit text-lg font-bold p-2 rounded-md border-black mx-4"}
                                    onClick={(event) => saveGreetings(event)}>Save changes
                                </button>
                            </div>
                        </div>
                        <div className={"flex flex-col items-center w-full"}>
                            <TextArea label={"Description"} className={"text-center w-2/3"}
                                   value={description} onChange={setDescription}/>
                            <button
                                className={"mt-2 bg-green-600 hover:bg-green-700 transition-all w-fit text-lg font-bold p-2 rounded-md border-black mx-4"}
                                onClick={(event) => saveDescription(event)}>Save changes
                            </button>
                        </div>


                    </AdminLayout>
                </div>
            ) :
            (
                <WrongPermission/>
            ));
    ;
}

export default SettingsAdminPage;

export async function getServerSideProps(ctx){
    await mongooseConnect();
    const mainPictures = await Settings.findOne({name:'mainImages'});
    const subscription = await Settings.findOne({name:'subscription'});
    const greeting = await Settings.findOne({name:'greeting'});
    const description = await Settings.findOne({name:'description'});


    const admins = await Admin.find({}, { email: 1 });
    const userInformation = await getSession(ctx);
    let userIsAdmin = false;
    if (userInformation) {
        userIsAdmin = await checkIfUserIsAdmin(userInformation.user.email, admins);
    }
    return {
        props: {
            userInformation: JSON.parse(JSON.stringify(userInformation)),
            isAdmin: JSON.parse(JSON.stringify(userIsAdmin)),
            mainPictures:JSON.parse(JSON.stringify(mainPictures)),
            subscriptionObject:JSON.parse(JSON.stringify(subscription)),
            greeting:JSON.parse(JSON.stringify(greeting)),
            description:JSON.parse(JSON.stringify(description)),

        }
    };
}