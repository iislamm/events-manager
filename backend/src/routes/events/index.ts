import { FastifyPluginAsync } from 'fastify';
import EventDataController from '../../data/EventDataController';
import { Event } from '../../data/EventModel';

const events: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const eventController = new EventDataController();

  // Get all events
  fastify.get('/', async (request, reply) => {
    return eventController.getAllEvents();
  });

  // Get event by ID
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const event = eventController.getEventById(id);

    if (!event) {
      reply.code(404).send({ error: 'Event not found' });
      return;
    }

    return event;
  });

  // Create new event
  fastify.post('/', async (request, reply) => {
    const event = request.body as Event;
    reply.code(201);
    return eventController.createEvent(event);
  });

  // Update event
  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const updates = request.body as Partial<Event>;

    try {
      const updatedEvent = eventController.updateEvent(id, updates);
      if (!updatedEvent) {
        reply.code(404).send({ error: 'Event not found' });
        return;
      }
      return updatedEvent;
    } catch (error) {
      reply.code(400).send({ error: (error as Error).message });
    }
  });

  // Delete event
  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const success = eventController.deleteEvent(id);

    if (!success) {
      reply.code(404).send({ error: 'Event not found' });
      return;
    }

    reply.code(204).send();
  });
};

export default events;
