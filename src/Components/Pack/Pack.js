import React from 'react';
import { packImages } from '../../packImages';
import Card from '../Card/Card';
import './Pack.css'
import Button from 'react-bootstrap/Button';

class Pack extends React.Component {
  constructor(){
    super()
    this.state = {
      isSealed: true
    }
  }

  // Random function used to generate random numbers for other functions
  getRandom = (range) => {
    return (Math.floor(Math.random() * range));
  }

  // Changes state when the pack is opened or a new pack is taken out
  toggleOpen = () => {
    this.setState(
      { isSealed : !this.state.isSealed }
    )
  }

  // Generates a Card component based on the specified rarity and card number
  renderCard = (rarity, cardNumber) => {
    return (
      <Card rarity={rarity} cardNumber={cardNumber}/>
    )}


  // Checks if the pack is sealed or not, will display the pack or cards respectively
  // In the future, I would like to render the Card components more eloquently rather than having so many repetitive single line statements
  // would also want to restrict opening a new pack until all cards are flipped in a future update,
  // and implement a flip all button

  render(){
    const { commons, uncommons, rares } = this.props;
    const { isSealed } = this.state;
    return(
      <div>
        { (isSealed) ? 
        <div className='sealedContainer'>
          <img className='packWrapper pointer' 
            onClick={this.toggleOpen} alt='sealed-pack' 
            src ={`${packImages[this.getRandom(3)]}`} 
          /> 
        </div>
        : 
        <div className='openedContainer'>
          <div className='pulledCards'>
              {this.renderCard(commons, this.getRandom(commons.length-6))} 
              {this.renderCard(commons, this.getRandom(commons.length-6))}
              {this.renderCard(commons, this.getRandom(commons.length-6))}
              {this.renderCard(commons, this.getRandom(commons.length-6))}
              {this.renderCard(commons, this.getRandom(commons.length-6))}

              {this.renderCard(commons, (this.getRandom(6)+(commons.length-6)))}
              {this.renderCard(commons, (this.getRandom(6)+(commons.length-6)))}
            
              {this.renderCard(uncommons, this.getRandom(uncommons.length))}
              {this.renderCard(uncommons, this.getRandom(uncommons.length))}
              {this.renderCard(uncommons, this.getRandom(uncommons.length))}

              {this.renderCard(rares, this.getRandom(rares.length))}
          </div> 
          <Button variant='success' size='sm' className='newPack-button' onClick={this.toggleOpen}>New Pack</Button>
        </div>
        }
      </div>
    );
  }
}

export default Pack;