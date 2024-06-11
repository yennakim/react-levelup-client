import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getGames } from '../../utils/data/gameData';
import { createEvent, updateEvent } from '../../utils/data/eventData';

const EventForm = ({ user, eventObj }) => {
  const initialState = {
    date: '',
    time: '',
    description: '',
    gameId: user.id,
  };

  const [games, setGames] = useState([]);

  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  const gameSel = () => {
    getGames().then(setGames);
  };

  useEffect(() => {
    gameSel();
  }, []);

  useEffect(() => {
    if (eventObj?.id) {
      setCurrentEvent({
        date: eventObj.date,
        time: eventObj.time,
        description: eventObj.description,
        gameId: eventObj.game.id,
      });
    }
  }, [eventObj]);

  const handleChange = (e) => {
    // TODO complete on change func
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      date: currentEvent.date,
      time: currentEvent.time,
      description: currentEvent.description,
      game: currentEvent.gameId,
      userId: user.uid,
    };
    if (eventObj?.id) {
      event.id = eventObj.id;
      updateEvent(event).then(() => router.push('/events'));
    } else {
      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">

        <Form.Label>Date</Form.Label>
        <Form.Control name="date" required value={currentEvent.date} onChange={handleChange} />

        <Form.Label>Time</Form.Label>
        <Form.Control name="time" required value={currentEvent.time} onChange={handleChange} />

        <Form.Label>Description</Form.Label>
        <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />

        <Form.Label>Game</Form.Label>
        <Form.Select
          aria-label="Game"
          name="gameId"
          onChange={handleChange}
          className="mb-3"
          value={currentEvent.gameId}
        >
          <option value="">Select applicable game</option>
          {
            games.map((game) => (
              <option
                key={game.id}
                value={game.id}
              >
                {game.title}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

EventForm.propTypes = {
  eventObj: PropTypes.shape({
    date: PropTypes.number,
    time: PropTypes.number,
    description: PropTypes.string,
    game: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    id: PropTypes.number,
  }).isRequired,
};

export default EventForm;
