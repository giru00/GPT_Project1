import React, { useState } from 'react';
import TarotDeck from './TarotDeck';
import axios from 'axios';

const TarotReading = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [interpretation, setInterpretation] = useState('');

  const handleCardSelect = async (card) => {
    setSelectedCard(card);
    try {
      const response = await axios.post('/api/interpretation', { cardId: card.id });
      setInterpretation(response.data.interpretation);
    } catch (error) {
      console.error('Error fetching interpretation:', error);
      setInterpretation('Sorry, there was an error getting your interpretation. Please try again.');
    }
  };

  return (
    <div className="tarot-reading">
      <TarotDeck cards={tarotDeck} onCardSelect={handleCardSelect} />
      {interpretation && <div>Interpretation: {interpretation}</div>}
    </div>
  );
};

export default TarotReading;