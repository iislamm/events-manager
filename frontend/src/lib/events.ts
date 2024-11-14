import { Event } from '../types/events';

import { API_URL } from '../config';

export const getEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${API_URL}/events`);
  return (await response.json()) as Event[];
};

export const getEventById = async (id: string): Promise<Event | null> => {
  const response = await fetch(`${API_URL}/events/${id}`);
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as Event;
};

export const updateEvent = async (
  id: string,
  event: Event
): Promise<Event | null> => {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  });
  return (await response.json()) as Event;
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
};
