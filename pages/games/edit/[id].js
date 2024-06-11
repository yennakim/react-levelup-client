import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleGame } from '../../../utils/data/gameData';
import GameForm from '../../../components/game/GameForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditGame() {
  const [editGame, setEditGame] = useState([]);
  const router = useRouter();

  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSingleGame(id).then(setEditGame);
  }, [id]);

  return (
    <GameForm gameObj={editGame} setEditGame={setEditGame} user={user} />
  );
}
