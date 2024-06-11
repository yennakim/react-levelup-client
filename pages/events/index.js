import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getAllEvents = () => {
    getEvents(user.uid).then((data) => setEvents(data));
  };

  useEffect(() => {
    getAllEvents();
  });

  return (
    <article className="events">
      <Button onClick={() => { router.push('/events/new'); }}>
        Create New Event
      </Button>
      <h1>List of Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard description={event.description} date={event.date} time={event.time} organizer={event.organizer} game={event.game} id={event.id} joined={event.joined} onUpdate={getAllEvents} />
        </section>
      ))}
    </article>
  );
}

export default Home;
