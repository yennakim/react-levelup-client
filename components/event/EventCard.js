import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

const EventCard = ({
  id,
  description,
  date,
  time,
  organizer,
  game,
  onUpdate,
  joined,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleUpdate = () => {
    router.push(`/events/edit/${id}`);
  };

  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${game.title}?`)) {
      deleteEvent(id).then(() => onUpdate());
    }
  };

  const eventSignup = () => {
    const payload = { userId: user.uid };
    joinEvent(id, payload).then(() => {
      onUpdate();
    });
  };

  const eventLeave = () => {
    const payload = {
      userId: user.uid,
    };
    leaveEvent(id, payload).then(() => {
      onUpdate();
    });
  };

  return (
    <Card className="text-center">
      <Card.Header>{game.title}</Card.Header>
      <Card.Body>
        <Card.Title>{date} @ {time}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button onClick={handleUpdate} style={{ width: '100px', margin: '10px' }}>Edit</Button>
        <Button onClick={deleteThisEvent} style={{ width: '100px', margin: '10px' }}>Delete</Button>
        {joined
          ? <Button variant="danger" onClick={eventLeave} style={{ width: '100px' }}>Leave</Button>
          : <Button variant="primary" onClick={eventSignup} style={{ width: '100px' }}>Join</Button> }
      </Card.Body>
      <Card.Footer className="text-muted">Organized by: {organizer.id}</Card.Footer>
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  joined: PropTypes.bool.isRequired,
};

export default EventCard;
