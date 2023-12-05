"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import NavBar from "@/components/NavBar";
import SideNav from "@/components/SideNav";
import { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function Calendar() {
  const { data: session } = useSession();

  const [events] = useState([
    {
      id: "1",
      title: "Avengers",
      description: "They do be avenging",
      image: "https://wallpapercave.com/wp/iptrxid.jpg",
      start: "2023-12-10T14:00:00",
      end: "2023-12-10T16:00:00",
    },
    {
      id: "2",
      title: "Thor Ragnarok",
      description: "Death Sis goes on a killing spree",
      image:
        "https://www.teahub.io/photos/full/99-997464_thor-ragnarok-thor-ragnarok-poster-hd.jpg",
      start: "2023-12-12T10:00:00",
      end: "2023-12-12T12:30:00",
    },
    {
      id: "3",
      title: "Dragon Ball Super: Broly",
      description: "Autistic Hulk goes on a rampage",
      image:
        "https://wallpapers.com/images/hd4/dragon-ball-super-broly-movie-poster-97a8oe0mgan1o2t7.jpg",
      start: "2023-12-15T18:00:00",
      end: "2023-12-15T20:00:00",
    },
    {
      id: "4",
      title: "Star Wars: The Force Awakens",
      description: "Something did indeed awaken",
      image: "https://getwallpapers.com/wallpaper/full/c/d/8/126215.jpg",
      start: "2023-12-20T13:00:00",
      end: "2023-12-20T15:30:00",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(events[0]);

  function handleEventClick(data) {
    const clickedEvent = events.find((event) => event.id === data.event.id);

    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {session && <NavBar />}

      <div className="flex flex-1 justify-center items-center">
        {!session ? (
          <div className="bg-red-500 flex justify-center items-center p-2 flex-1">
            <div className="text-center w-full">
              <button
                className="bg-white p-2 rounded-md"
                onClick={() => signIn("google")}
              >
                Login with Google
              </button>
              <button
                className="bg-white p-2 rounded-md"
                onClick={() => signOut()}
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row w-full">
            <SideNav currentPage="Calendar" />
            <div className="w-3/5 h-auto">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth timeGridWeek",
                }}
                events={events}
                nowIndicator={true}
                editable={false}
                droppable={true}
                selectable={true}
                selectMirror={true}
                allDaySlot={false}
                eventClick={(event) => handleEventClick(event)}
              />
            </div>
            <div className="w-2/6 px-10 py-10 m-5 flex flex-col justify-starttime">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="rounded-lg mb-5"
              />
              <div className="w-full bg-white text-black py-3 px-2 rounded-lg h-1/2 flex flex-col justify-between">
                <div>
                  <h1 className="text-4xl mb-3">{selectedEvent.title}</h1>
                  <h2 className="text-lg mb-3">{selectedEvent.description}</h2>
                </div>
                <button className="bg-customPurple hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-lg w-fit mx-auto">
                  View Event
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
