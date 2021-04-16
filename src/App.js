import React, { Component } from 'react';
import './App.css';
import Pack from './Components/Pack/Pack';
import poketcg from 'pokemontcgsdk';
import CardList from './Components/CardList/CardList';
import Button from 'react-bootstrap/Button';
import Particles from 'react-particles-js';
import particlesOptions from './Components/Particles/particlesOptions';

class App extends Component{
  constructor() {
    super();
    this.state = {
      commons : [],
      uncommons : [],
      rares : []
    }
  }

  sortByNumber(cards) {
    return cards.sort((a,b) => a.number - b.number);
  }

  // vanilla JS functions to control the sidebar
  openSidebar() {
    document.getElementById('sidebar').style.width = '20%';
  }

  closeSidebar(){
    document.getElementById('sidebar').style.width = '0';
  }

  // Fetching the cards by rarity from the pokemon tcg api when the app is mounted
  // Made the rarities a part of the state to easily pass to other components
  // This probably isn't a good practice but will use a database in a future version 
  componentDidMount() {
    poketcg.card.where({ rarity : 'Common', setCode : 'base1' })
      .then(data =>{
        let sortedCommons = this.sortByNumber(data);
        this.setState({
          commons : sortedCommons
        })
      })

      poketcg.card.where({ rarity : 'Uncommon', setCode : 'base1' })
      .then(data =>{
        let sortedUncommons = this.sortByNumber(data);
        this.setState({
          uncommons : sortedUncommons
        })
      })

      poketcg.card.where({ rarity : 'Rare', setCode : 'base1' })
      .then(data =>{
        let sortedRares = this.sortByNumber(data);
        this.setState({
          rares : sortedRares
        })
      })
  }

  render(){
    const { commons, uncommons, rares } = this.state;
     return (
      <div className='wrapper'>
        <Particles className='particles' params={particlesOptions}/>
        <div className='title'>
          <h1 className='appName'>PokéPack</h1>
          <p>A Pokémon TCG Pack Opening Simulator</p>
        </div >
        <Pack commons={ commons } uncommons={ uncommons } rares={ rares }/>
        <Button variant='primary' size= 'sm' onClick={this.openSidebar}>Set List</Button> {' '}
        <div id='sidebar' className='cardList'>
          <CardList commons={ commons } uncommons={ uncommons } rares={ rares }/>
          <Button variant='outline-primary' size ='sm' className='closeButton' onClick={this.closeSidebar}>Close</Button>
        </div>
        <h6 className='footer'>Made by <a href='https://github.com/rhysalmario'>Rhys Almario</a></h6>
      </div>
    );
  }
}

export default App;
