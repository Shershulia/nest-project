import {getSession, useSession} from "next-auth/react";
import {Swiper, SwiperSlide} from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
  Mousewheel,
} from "swiper/modules";
import React, { useEffect, useState } from "react";

import "swiper/css/bundle";
import {FrontendLayout, LoginButton, NavBar, ParticlesBackground, SideNav} from "@/components";
import {format} from "date-fns";
import {mongooseConnect} from "@/lib/mongoose";
import {Settings} from "@/models/Settings";
import {Event} from "@/models/Event";
import {useRouter} from "next/router";

let socket
export default function Home({events,description,greeting,mainPictures}) {
  const { data: session } = useSession();
  const router = useRouter()


    const goToAccountPage = ()=>{
        router.push("/account")
    }

  return (
    <div className="flex flex-col h-screen overflow-hidden text-white">
      <FrontendLayout>
              <div className={"flex md:flex-row flex-col w-full my-1g0"}>
                  <div className={"flex flex-wrap block md:hidden gap-2 justify-center items-center"}>
                      {mainPictures && mainPictures.value && (
                          mainPictures.value.map((picture, index) => (
                              <img src={picture} key={index} alt={`Picture ${index}`} className={"h-[100px] w-[100px]"} />
                          ))
                      )}
                  </div>
                  <div className="text-center w-full md:w-5/12 flex flex-col md:py-16 md:px-5 md:my-20">
                      <h1 className="text-3xl py-2">{greeting}</h1>
                      {session && (<h1 className="text-2xl ">{session?.user?.name}</h1>)}

                      <h2 className="text-base py-3 leading-9">
                          {description}
                      </h2>
                      {!session && (<LoginButton className={"px-4 py-2 border border-white"}/>)}
                      {session?.user.emailVerified===null &&
                          (<button type="button" onClick={goToAccountPage}
                                   className={`text-white duration-500 hover:bg-gray-700 px-4 py-2 border border-white`}>
                              Become member of our community right now
                          </button>)}

                  </div>
                  <div className="w-2/3 py-10 hidden md:block">
                      <Swiper
                          modules={[
                              Autoplay,
                              Pagination,
                              Navigation,
                              EffectCoverflow,
                              Mousewheel,
                          ]}
                          slidesPerView={1.5}
                          centeredSlides={true}
                          loop={true}
                          autoplay={{
                              delay: 5000,
                          }}
                          pagination={{ clickable: true }}
                          navigation={true}
                          effect={"coverflow"}
                          coverflowEffect={{
                              rotate: 10,
                              stretch: 10,
                              depth: 100,
                              modifier: 2,
                              slideShadows: true,
                          }}
                          mousewheel={true}
                          className="h-full w-10/12"
                          style={{
                              "--swiper-theme-color": "#7154e0",
                              "--swiper-pagination-bullet-inactive-opacity": "0.8",
                              "--swiper-pagination-bullet-size": "16px",
                              "--swiper-pagination-bullet-horizontal-gap": "6px",
                          }}
                      >
                          <div className="w-full">
                              {mainPictures.value ? (
                                  mainPictures.value.map((picture, index) => (
                                      <SwiperSlide
                                          key={index}
                                          style={{
                                              backgroundImage: "url(" + picture + ")",
                                          }}
                                          className="bg-cover bg-center relative w-full cursor-pointer"
                                      >
                                      </SwiperSlide>
                                  ))
                              ) : (
                                  <p>Images not found</p>
                              )}
                              {events.length ? (
                                  events.map((event, index) => (
                                      <SwiperSlide
                                          key={index}
                                          style={{
                                              backgroundImage: "url(" + event.images[0] + ")",
                                          }}
                                          className="bg-cover bg-center relative w-full cursor-pointer"
                                      >
                                          <div className="bg-slate-900 opacity-90 w-1/2 absolute right-0 top-0 bottom-0">
                                              <h1 className="text-3xl p-2 line-clamp-3 font-bold">
                                                  Upcoming event :
                                              </h1>
                                              <h1 className="text-2xl p-2 line-clamp-3">
                                                  {event.name}
                                              </h1>
                                              <h3 className="text-xs p-2">
                                                  {format(new Date(event.date), "MMMM do yyyy hh:mm a")}
                                              </h3>
                                              <h3 className="text-base px-2 py-0 line-clamp-4 leading-8">
                                                  {event.description}
                                              </h3>
                                          </div>
                                      </SwiperSlide>
                                  ))
                              ) : (
                                  <p>No Events Found</p>
                              )}
                          </div>
                      </Swiper>
                  </div>

          </div>
    </FrontendLayout>
    </div>
  );
}


export async function getServerSideProps(ctx){
    await mongooseConnect();
    const mainPictures = await Settings.findOne({name:'mainImages'});
    const greeting = await Settings.findOne({name:'greeting'});
    const description = await Settings.findOne({name:'description'});
    const events = await Event.find({date:{$gte: new Date()}}).sort({date: 'desc'}).limit(4);

    return {
        props: {
            events:JSON.parse(JSON.stringify(events)),
            mainPictures:JSON.parse(JSON.stringify(mainPictures)),
            greeting:JSON.parse(JSON.stringify(greeting.value)),
            description:JSON.parse(JSON.stringify(description.value)),

        }
    };
}