import seedData from './seed_data.json';
import { Event } from './EventModel';

class EventDataController {
  private events: { [key: string]: Event } = {};

  constructor() {
    this.events = seedData.events.reduce((acc, event) => {
      acc[event.id] = {
        ...event,
        date: new Date(event.date),
      } as Event;
      return acc;
    }, {} as { [key: string]: Event });
  }

  getAllEvents(): Event[] {
    return Object.values(this.events);
  }

  getEventById(id: string): Event | undefined {
    return this.events[id];
  }

  createEvent(event: Event): Event {
    this.events[event.id] = event;
    return event;
  }

  updateEvent(id: string, event: Partial<Event>): Event | undefined {
    if (!this.events[id]) {
      return undefined;
    }

    if (event.id && event.id !== id) {
      throw new Error('Event ID is immutable');
    }

    // drop any keys that are not in the Event model
    const eventData = Object.fromEntries(
      Object.entries(event).filter(([key]) => key in this.events[id])
    );

    // validate that the date is a valid date
    if (
      eventData.date &&
      typeof eventData.date === 'string' &&
      isNaN(Date.parse(eventData.date))
    ) {
      throw new Error('Invalid date');
    } else if (eventData.date && typeof eventData.date === 'string') {
      eventData.date = new Date(eventData.date);
    }

    this.events[id] = {
      ...this.events[id],
      ...eventData,
    };
    return this.events[id];
  }

  deleteEvent(id: string): boolean {
    if (!this.events[id]) {
      return false;
    }
    delete this.events[id];
    return true;
  }
}

export default EventDataController;
