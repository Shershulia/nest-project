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
import Link from "next/link";
import { set } from "lodash";
import { FrontendLayout } from "@/components";

export default function Calendar() {
  const { data: session } = useSession();

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEvents = () => {
    setIsLoading(true);
    axios.get(`/api/events`).then((res) => {
      const modifiedEvents = res.data.map((event) => ({
        ...event,
        id: event._id,
        start: event.date,
      }));
      setEvents(modifiedEvents);
      setIsLoading(false);
      setSelectedEvent(modifiedEvents[0]);
    });
  };

  const [selectedEvent, setSelectedEvent] = useState([]);

  function handleEventClick(data) {
    const clickedEvent = events.find((event) => event._id == data.event.id);

    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden text-white">
      <FrontendLayout>
        <div className="w-3/5 h-auto">
          {!isLoading && (
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
              eventClick={(data) => handleEventClick(data)}
            />
          )}
        </div>
        <div className="w-2/6 px-10 py-10 m-5 flex flex-col justify-starttime">
          {selectedEvent.images && (
            <img
              src={selectedEvent.images[0]}
              alt={selectedEvent.title}
              className="rounded-lg mb-5 h-1/3 object-fit"
            />
          )}
          <div className="w-full bg-white text-black py-3 px-2 rounded-lg h-2/5 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl mb-3 line-clamp-1">
                {selectedEvent.name}
              </h1>
              <h2 className="text-lg mb-3 line-clamp-4">
                {selectedEvent.description}
              </h2>
            </div>
            <Link
              href={`/events/${selectedEvent.id}`}
              className="bg-customPurple hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-lg w-fit mx-auto"
            >
              View Event
            </Link>
          </div>
        </div>
      </FrontendLayout>
    </div>
  );
}
