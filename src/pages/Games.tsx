import React from 'react';

const Games = () => {
  const games = [
    { id: 1, name: 'Memory Match', description: 'Test your memory skills' },
    { id: 2, name: 'Word Puzzle', description: 'Enhance your vocabulary' },
    { id: 3, name: 'Math Challenge', description: 'Improve your math skills' },
  ];

  return (
    <div className="games-container">
      <h1>Fun Games</h1>
      <div className="games-grid">
        {games.map(game => (
          <div key={game.id} className="game-card">
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <button className="play-button">Play Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
