import React, {useState} from 'react';
import {AdminLayout, Input, Title, WrongPermission} from "@/components";
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
                               greeting: existingGreeting}) => {
    const [mainPictures, setMainPictures] = useState(loaded.images);
    const [subscriptionPrice, setSubscriptionPrice] = useState(existingSubscription?.value || 0);
    const [greeting, setGreeting] = useState(existingGreeting?.value || "");

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
                    await axios.put('/api/admin/settings/subscription', {
                        _id: existingSubscription._id,
                        subscription: subscriptionPrice
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
                    await axios.put('/api/admin/settings/greeting', {
                        _id: existingGreeting._id,
                        subscription: greeting
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
                        <div className={"flex justify-center items-center gap-2 flex-wrap"}>
                            <div className={"flex flex-col items-center"}>
                                <Input label={"Price of subscription"} className={"text-center"} isDigits={true}
                                       value={subscriptionPrice} onChange={setSubscriptionPrice}/>
                                <button
                                    className={"mt-2 bg-green-600 hover:bg-green-700 transition-all w-fit text-lg font-bold p-2 rounded-md border-black mx-4"}
                                    onClick={(event) => saveNewSubscriptionPrice(event)}>Save changes
                                </button>
                            </div>
                            <div className={"flex flex-col items-center"}>
                                <Input label={"Greeting message"} className={"text-center"} value={greeting}
                                       onChange={setGreeting}/>
                                <button
                                    className={"mt-2 bg-green-600 hover:bg-green-700 transition-all w-fit text-lg font-bold p-2 rounded-md border-black mx-4"}
                                    onClick={(event) => saveGreetings(event)}>Save changes
                                </button>
                            </div>
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
        }
    };
}