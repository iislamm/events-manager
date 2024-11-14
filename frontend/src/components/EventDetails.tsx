import React, { useEffect, useState } from "react";
import { Event } from "../types/events";
import { useParams } from "react-router-dom";
import { getEventById, updateEvent } from "../lib/events";
import LoadingSpinner from "./LoadingSpinner";
import NotFound from "./404";
import EventEditDialog from "./EventEditDialog";

const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [eventFound, setEventFound] = useState<boolean | undefined>(undefined);
  const [eventLoading, setEventLoading] = useState<boolean>(true);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const loadEvent = async () => {
      if (!id) {
        setEventFound(false);
        return;
      }
      const event = await getEventById(id);
      if (!event) {
        setEventFound(false);
        return;
      }
      setEvent(event);
      setEventFound(true);
      setEventLoading(false);
    };
    loadEvent();
  }, [id]);

  const handleEditSubmit = async (updatedEvent: Event) => {
    if (!id) return;
    setUpdateLoading(true);
    const result = await updateEvent(id, updatedEvent);
    if (result) {
      setTimeout(() => {
        setUpdateLoading(false);
        setEvent(result);
        setShowEditDialog(false);
      }, 1000);
    }
  };

  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="w-full">
      {eventLoading && <LoadingSpinner />}
      {eventFound === false && <NotFound />}
      {event && (
        <div className="relative">
          <div
            className="h-96 relative"
            onMouseMove={handleMouseMove}
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgb(59, 130, 246), rgb(168, 85, 247))`,
            }}
          >
            <div className="absolute bottom-8 left-8 text-white right-4">
              <h1 className="text-6xl font-bold">{event.title}</h1>
              <div className="flex items-center gap-3 text-lg mt-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{event.location}</span>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 text-gray-500 mb-6">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-lg">
                {new Date(event.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              {event.description}
            </p>
          </div>
          <button
            className="fixed bottom-8 right-8 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors duration-200"
            onClick={() => setShowEditDialog(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          {showEditDialog && event && (
            <EventEditDialog
              isOpen={showEditDialog}
              event={event}
              loading={updateLoading}
              onClose={() => setShowEditDialog(false)}
              onSave={handleEditSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EventDetails;
