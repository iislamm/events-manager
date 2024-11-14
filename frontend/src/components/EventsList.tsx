import React from "react";
import EventCard from "./EventCard";
import { Event } from "../types/events";
import { Link } from "react-router-dom";

interface EventsListProps {
  events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
      {events.map((event) => (
        <Link to={`/events/${event.id}`} key={event.id}>
          <EventCard event={event} />
        </Link>
      ))}
    </div>
  );
};

export default EventsList;
