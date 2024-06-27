import React, { useState, useEffect } from 'react';
import TarotCard from './TarotCard';

const TarotDeck = ({ cards, onCardSelect }) => {
  const [shuffledCards, setShuffledCards] = useState([]);

  useEffect(() => {
    setShuffledCards(shuffleCards(cards));
  }, [cards]);

  const shuffleCards = (cards) => {
    let shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <div className="tarot-deck">
      {shuffledCards.map((card, index) => (
        <TarotCard
          key={card.id}
          card={card}
          style={{ animationDelay: `${index * 100}ms` }}
          onCardSelect={onCardSelect}
        />
      ))}
    </div>
  );
};

export default TarotDeck;

// /* TarotDeck.css */
// .tarot-deck {
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
// }

// .tarot-card {
//   margin: 10px;
//   animation: shuffleAnimation 1s ease-in-out;
// }

// @keyframes shuffleAnimation {
//   0% { transform: translateY(0); }
//   50% { transform: translateY(-20px); }
//   100% { transform: translateY(0); }
// }