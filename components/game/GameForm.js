import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';

const initialState = {
  skillLevel: '',
  numberOfPlayers: '',
  title: '',
  maker: '',
  gameTypeId: 0,
};

const GameForm = ({ user, gameObj }) => {
  const [gameTypes, setGameTypes] = useState([]);

  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  const gameTypeSel = () => {
    getGameTypes().then(setGameTypes);
  };

  useEffect(() => {
    gameTypeSel();
  }, []);

  useEffect(() => {
    if (gameObj?.id) {
      setCurrentGame({
        skillLevel: gameObj.skill_level,
        numberOfPlayers: gameObj.number_of_players,
        title: gameObj.title,
        maker: gameObj.maker,
        gameTypeId: gameObj.game_type.id,
      });
    }
  }, [gameObj]);

  const handleChange = (e) => {
    // TODO complete on change func
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameTypeId),
      userId: user.uid,
    };

    // send POST to api
    if (gameObj?.id) {
      game.id = gameObj.id;
      updateGame(game).then(() => router.push('/games'));
    } else {
      createGame(game).then(() => router.push('/games'));
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />

          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />

          <Form.Label>Game Type</Form.Label>
          <Form.Select
            aria-label="Game Type"
            name="gameTypeId"
            onChange={handleChange}
            className="mb-3"
            value={currentGame.gameTypeId}
          >
            <option value="">Select applicable game type</option>
            {
            gameTypes.map((gameType) => (
              <option
                key={gameType.id}
                value={gameType.id}
              >
                {gameType.label}
              </option>
            ))
          }
          </Form.Select>

          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />

          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    skillLevel: PropTypes.number,
    numberOfPlayers: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    gameTypeId: PropTypes.number,
    skill_level: PropTypes.number,
    number_of_players: PropTypes.number,
    game_type: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};

export default GameForm;
