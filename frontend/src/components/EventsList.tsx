import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Event } from "../types/events";
import { getEvents } from "../lib/events";
import LoadingSpinner from "./LoadingSpinner";
import Filters from "./Filters";

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

  const handleEventDelete = (deletedEvent: Event) => {
    setEvents(events.filter((event) => event.id !== deletedEvent.id));
  };

  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  useEffect(() => {
    let filtered = [...events];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by locations
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((event) =>
        selectedLocations.includes(event.location)
      );
    }

    // Filter by date range
    if (dateRange.start || dateRange.end) {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date);
        if (
          dateRange.start &&
          dateRange.end &&
          !isNaN(dateRange.start.getTime()) &&
          !isNaN(dateRange.end.getTime())
        ) {
          return eventDate >= dateRange.start && eventDate <= dateRange.end;
        } else if (dateRange.start && !isNaN(dateRange.start.getTime())) {
          return eventDate >= dateRange.start;
        } else if (dateRange.end && !isNaN(dateRange.end.getTime())) {
          return eventDate <= dateRange.end;
        }
        return true;
      });
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedLocations, dateRange]);

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  const handleLocationsChange = (locations: string[]) => {
    setSelectedLocations(locations);
  };

  const handleDateRangeChange = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    setDateRange({ start: startDate, end: endDate });
  };

  return (
    <>
      {eventsLoaded ? (
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-5xl font-bold mb-4 text-purple-950">Events</h1>
          <Filters
            locations={events.map((event) => event.location)}
            onSearchChange={handleSearchChange}
            onLocationsChange={handleLocationsChange}
            onDateRangeChange={handleDateRangeChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {filteredEvents.map((event) => (
              <EventCard
                event={event}
                key={event.id}
                onUpdate={handleEventUpdate}
                onDelete={handleEventDelete}
              />
            ))}
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default EventsList;
