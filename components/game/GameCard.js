import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteGame } from '../../utils/data/gameData';

const GameCard = ({
  id,
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  gameType,
  onUpdate,
}) => {
  const router = useRouter();

  const handleUpdate = () => {
    router.push(`/games/edit/${id}`);
  };

  const deleteThisGame = () => {
    if (window.confirm(`Delete ${title}?`)) {
      deleteGame(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{title} </Card.Header>
      <Card.Body>
        <Card.Title>{title} by {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed
        </Card.Text>
        <Card.Text>{gameType.label}
        </Card.Text>
        <Button onClick={handleUpdate} style={{ width: '100px' }}>Edit</Button>
        <Button onClick={deleteThisGame} style={{ width: '100px' }}>Delete</Button>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
    </Card>
  );
};

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  gameType: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
