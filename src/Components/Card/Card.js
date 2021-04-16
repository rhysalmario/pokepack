import React from 'react';
import { useState } from 'react';
import './Card.css';

const Card = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Card component displays an image and simply changes the display image when the card is flipped
  // In a future version, I would like to implement a flipping animation
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  }
  const {rarity, cardNumber} = props;
  return(
    isFlipped ?
      <img className='card' alt={rarity[cardNumber].name} src={rarity[cardNumber].imageUrl}/>
    :
      <img className='card' onClick={flipCard} alt='Pokemon Cardback' src='https://upload.wikimedia.org/wikipedia/en/3/3b/Pokemon_Trading_Card_Game_cardback.jpg'/>
  );
}

export default Card;