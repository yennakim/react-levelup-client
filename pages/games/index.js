import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  const getAllGames = () => {
    getGames().then((data) => setGames(data));
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <>
      <article className="games">
        <h1>Games</h1>
        <Button onClick={() => { router.push('/games/new'); }}>
          Create New Game
        </Button>
        {games.map((game) => (
          <section key={`game--${game.id}`} className="game">
            <GameCard title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} gameType={game.game_type} id={game.id} onUpdate={getAllGames} />
          </section>
        ))}
      </article>

    </>
  );
}

export default Home;
