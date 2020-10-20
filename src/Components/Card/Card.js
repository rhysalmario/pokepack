import React, { Component } from 'react';
import './Card.css';

class Card extends Component  {
  
  constructor() {
    super();
    this.state = {
      isFlipped : false
    }
  }

  flipCard = () => {
    this.setState({
      isFlipped : true
    })
  }

  // Card component displays an image and simply changes the display image when the card is flipped
  // In a future version, I would like to implement a flipping animation

  render() {
    const {rarity, cardNumber} = this.props;
    return(
      this.state.isFlipped ?
        <img className='card' alt={rarity[cardNumber].name} src={rarity[cardNumber].imageUrl}/>
      :
        <img className='card' onClick={this.flipCard} alt='Pokemon Cardback' src='https://upload.wikimedia.org/wikipedia/en/3/3b/Pokemon_Trading_Card_Game_cardback.jpg'/>
    );
    }
}

export default Card;