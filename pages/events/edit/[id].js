import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleEvent } from '../../../utils/data/eventData';
import EventForm from '../../../components/event/EventForm';

export default function EditGame() {
  const [editEvent, setEditEvent] = useState([]);
  const router = useRouter();

  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSingleEvent(id).then(setEditEvent);
  }, [id]);

  return (
    <EventForm eventObj={editEvent} setEditEvent={setEditEvent} user={user} />
  );
}
