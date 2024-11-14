import React, { useState } from "react";
import { Event } from "../types/events";
import EventEditDialog from "./EventEditDialog";
import { Link } from "react-router-dom";
import { updateEvent } from "../lib/events";

interface EventCardProps {
  event: Event;
  onUpdate?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onUpdate }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const handleEditSubmit = async (updatedEvent: Event) => {
    setUpdateLoading(true);
    const result = await updateEvent(event.id, updatedEvent);
    if (result) {
      setTimeout(() => {
        setUpdateLoading(false);
        setShowEditDialog(false);
        onUpdate?.(result);
      }, 1000);
    }
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete event:", event);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/events/${event.id}`}>
        <div
          className="h-56 relative"
          onMouseMove={handleMouseMove}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgb(59, 130, 246), rgb(168, 85, 247))`,
          }}
        >
          <div className="absolute bottom-4 left-4 text-white right-4">
            <h1 className="text-4xl font-bold ">{event.title}</h1>
            <div className="flex items-center gap-2 text-sm mt-2">
              <svg
                className="w-4 h-4"
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
        <div className="p-4">
          <p className="text-gray-600 mb-3">{event.description}</p>
          <div className="flex flex-col gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
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
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4 py-3 bg-gray-50 border-t flex justify-end gap-2">
        <button
          onClick={handleEdit}
          className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          Delete
        </button>
      </div>
      {showEditDialog && (
        <EventEditDialog
          isOpen={showEditDialog}
          event={event}
          loading={updateLoading}
          onClose={() => setShowEditDialog(false)}
          onSave={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default EventCard;
