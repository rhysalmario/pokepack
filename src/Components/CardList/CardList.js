import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './CardList.css';

const CardList = (props) => {
  const [showRarity, setShowRarity] = useState('');
  const commons = useSelector(state => state.commons);
  const uncommons = useSelector(state => state.uncommons);
  const rares = useSelector(state => state.rares);

  // When a different rarity is selected, the current rarity is updated in the state
  const onRarityChange = (event) => {
    setShowRarity(event.target.value);
  }

  // CardList is passed the rarities as props from the App's state and creates a list of the specific rarity by using the map function
  const displayCards = (list) => {
    return (
      <ul className='unorderedList'>
        { list.map(card => 
        <li className='listItem' key={card.name} >
          {card.name} No. {card.number}
          <img className='itemImage' alt={`${card.name} Card`} src={card.imageUrl}/>
        </li> )}
      </ul> 
  )}

  // CardList is comprised of a select element and an ul with the designated rarity
  // The ul is updated when the select is changed, and nested ternary operators check which rarity to display
  return(
    <div className='CardList-container'>
      <h3>Set List</h3>
      <select name='Rarity' onChange={onRarityChange}>
        <option value='none' defaultValue hidden>By rarity...</option>
        <option value='Common'>Common</option>
        <option value='Uncommon'>Uncommon</option>
        <option value='Rare'>Rare</option>
      </select>
    
      { showRarity === 'Common' ?
      displayCards(commons) : showRarity === 'Uncommon' ?
        displayCards(uncommons) : showRarity === 'Rare' ?
        displayCards(rares) : <p>Select a rarity from the dropdown to view the available cards of that rarity.</p>
      }
    </div>
  );
}

export default CardList;