import React, { Component } from 'react';
import './CardList.css';

class CardList extends Component {
  constructor() {
    super();
    this.state = {
      showRarity : ''
    }
  }

  // When a different rarity is selected, the current rarity is updated in the state
  onRarityChange = (event) => {
    this.setState({
      showRarity : event.target.value
    });
  }

  // CardList is passed the rarities as props from the App's state and creates a list of the specific rarity by using the map function
  displayCards = (list) => {
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
  render() {
    const { showRarity } = this.state;
    return(
      <div className='CardList-container'>
        <h3>Set List</h3>
        <select name='Rarity' onChange={this.onRarityChange}>
          <option value='none' defaultValue hidden>By rarity...</option>
          <option value='Common'>Common</option>
          <option value='Uncommon'>Uncommon</option>
          <option value='Rare'>Rare</option>
        </select>
      
        { showRarity === 'Common' ?
        this.displayCards(this.props.commons) : showRarity === 'Uncommon' ?
          this.displayCards(this.props.uncommons) : showRarity === 'Rare' ?
          this.displayCards(this.props.rares) : <p>Select a rarity from the dropdown to view the available cards of that rarity.</p>
        }
      </div>
    );
  }
}

export default CardList;