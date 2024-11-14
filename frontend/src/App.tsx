import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getEvents } from "./lib/events";
import EventsList from "./components/EventsList";
import { Event } from "./types/events";
import LoadingSpinner from "./components/LoadingSpinner";
import EventDetails from "./components/EventDetails";

function App() {
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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            eventsLoaded ? <EventsList events={events} /> : <LoadingSpinner />
          }
        />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
