import { Event } from '../types/events';

export const getEvents = async (): Promise<Event[]> => {
  const response = await fetch('http://localhost:3000/events');
  return (await response.json()) as Event[];
};

export const getEventById = async (id: string): Promise<Event | null> => {
  const response = await fetch(`http://localhost:3000/events/${id}`);
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as Event;
};

export const updateEvent = async (
  id: string,
  event: Event
): Promise<Event | null> => {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  });
  return (await response.json()) as Event;
};
