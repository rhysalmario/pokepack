import React from 'react';
import { useState } from 'react';
import { packImages } from '../../packImages';
import Card from '../Card/Card';
import './Pack.css'
import Button from 'react-bootstrap/Button';

const Pack = (props) => {
  const [isSealed, setIsSealed] = useState(true);

  // Random function used to generate random numbers for other functions
  const getRandom = (range) => {
    return (Math.floor(Math.random() * range));
  }

  // Changes state when the pack is opened or a new pack is taken out
  const toggleOpen = () => {
    setIsSealed(!isSealed);
  }

  // Generates a Card component based on the specified rarity and card number
  const renderCard = (rarity, cardNumber) => {
    return (
      <Card rarity={rarity} cardNumber={cardNumber}/>
    )}


  // Checks if the pack is sealed or not, will display the pack or cards respectively
  // In the future, I would like to render the Card components more eloquently rather than having so many repetitive single line statements
  // would also want to restrict opening a new pack until all cards are flipped in a future update,
  // and implement a flip all button


  const { commons, uncommons, rares } = props;
  return(
    <div>
      { (isSealed) ? 
      <div className='sealedContainer'>
        <img className='packWrapper pointer' 
          onClick={toggleOpen} alt='sealed-pack' 
          src ={`${packImages[getRandom(3)]}`} 
        /> 
      </div>
      : 
      <div className='openedContainer'>
        <div className='pulledCards'>
            {renderCard(commons, getRandom(commons.length-6))} 
            {renderCard(commons, getRandom(commons.length-6))}
            {renderCard(commons, getRandom(commons.length-6))}
            {renderCard(commons, getRandom(commons.length-6))}
            {renderCard(commons, getRandom(commons.length-6))}

            {renderCard(commons, (getRandom(6)+(commons.length-6)))}
            {renderCard(commons, (getRandom(6)+(commons.length-6)))}
          
            {renderCard(uncommons, getRandom(uncommons.length))}
            {renderCard(uncommons, getRandom(uncommons.length))}
            {renderCard(uncommons, getRandom(uncommons.length))}

            {renderCard(rares, getRandom(rares.length))}
        </div> 
        <Button variant='success' size='sm' className='newPack-button' onClick={toggleOpen}>New Pack</Button>
      </div>
      }
    </div>
  );
}

export default Pack;