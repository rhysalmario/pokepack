import React, { Component } from 'react';
import './App.css';
import Pack from './Components/Pack/Pack';
import poketcg from 'pokemontcgsdk';
import CardList from './Components/CardList/CardList';
import Button from 'react-bootstrap/Button';
import Particles from 'react-particles-js';

// Parameters for react-particles as a separate object to declutter the render for the app
const particlesOptions = {
  "particles": {
    "number": {
        "value": 40,
        "density": {
            "enable": true,
            "value_area": 800
        }
    },
    "line_linked": {
        "enable": false
    },
    "move": {
        "speed": 2,
        "out_mode": "out"
    },
    "shape": {
        "type": [
            "image"
        ],
        "image": [
          {
            "src": 'https://64.media.tumblr.com/5cab3bc8ad59e747226205d4aed501cd/tumblr_mmi88btyBi1spn836o7_400.png',
            "height": 20,
            "width": 20
          },
          {
            "src": "https://64.media.tumblr.com/5623406f4923edb1c293254f16c360ac/tumblr_mmi88btyBi1spn836o3_400.png",
            "height": 20,
            "width": 20
          },
          {
            "src": "https://64.media.tumblr.com/68879c0cd61fde0e6ac5aca46d0d04e5/tumblr_mmi88btyBi1spn836o5_400.png",
            "height": 20,
            "width": 20
          },
          {
            "src": "https://64.media.tumblr.com/dffb232f11f10df7a7b0cbbf4f89de28/tumblr_mmi88btyBi1spn836o6_400.png",
            "height": 20,
            "width": 20
          },
          {
            "src": "https://64.media.tumblr.com/e9d0327e72bfa3daa733ac06b5fb4d25/tumblr_mmi88btyBi1spn836o1_400.png",
            "height": 20,
            "width": 20
          },
          {
            "src": "https://64.media.tumblr.com/db0c2938524dde79f0ba5570377a3bc9/tumblr_mmi88btyBi1spn836o9_400.png",
            "height": 20,
            "width": 20
          },
          {
            "src": "https://64.media.tumblr.com/23fcc303266711c0e7fa2c6ecc506bbb/tumblr_mmi88btyBi1spn836o10_400.png",
            "height": 20,
            "width": 20
          },
        ]
    },
    "size": {
        "value": 40,
        "random": true,
        "anim": {
            "enable": true,
            "speed": 5,
            "size_min": 20,
            "sync": false
        }
    }
},
"retina_detect": false
}

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
