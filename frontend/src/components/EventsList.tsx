import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Event } from "../types/events";
import { getEvents } from "../lib/events";
import LoadingSpinner from "./LoadingSpinner";

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoaded, setEventsLoaded] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      const events = await getEvents();
      setEvents(events);
      setEventsLoaded(true);
    };
    loadEvents();
  }, []);

  const handleEventUpdate = (updatedEvent: Event) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <>
      {eventsLoaded ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
          {events.map((event) => (
            <EventCard
              event={event}
              key={event.id}
              onUpdate={handleEventUpdate}
            />
          ))}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default EventsList;
