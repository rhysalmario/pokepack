import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import poketcg from 'pokemontcgsdk';
import Pack from './components/Pack/Pack';
import CardList from './components/CardList/CardList';
import Button from 'react-bootstrap/Button';
import Particles from 'react-particles-js';
import particlesOptions from './components/Particles/particlesOptions';
import { initCommons, initUncommons, initRares } from './redux/actions/cardInfoActions';

const App = () => {

  const sortByNumber = (cards) => {
    return cards.sort((a,b) => a.number - b.number);
  }

  // vanilla JS functions to control the sidebar
  const openSidebar = () => {
    document.getElementById('sidebar').style.width = '20%';
  }

  const closeSidebar = () => {
    document.getElementById('sidebar').style.width = '0';
  }

  // Fetching the cards by rarity from the pokemon tcg api when the app is mounted
  // Made the rarities a part of the state to easily pass to other components
  // This probably isn't a good practice but will use a database in a future version 
  const dispatch = useDispatch();
  
  useEffect (() => {
    poketcg.card.where({ rarity : 'Common', setCode : 'base1' })
      .then(data =>{
        let sortedCommons = sortByNumber(data);
        dispatch(initCommons(sortedCommons));
      })
    
    poketcg.card.where({ rarity : 'Uncommon', setCode : 'base1' })
      .then(data =>{
        let sortedUncommons = sortByNumber(data);
        dispatch(initUncommons(sortedUncommons));
      })

    poketcg.card.where({ rarity : 'Rare', setCode : 'base1' })
      .then(data =>{
        let sortedRares = sortByNumber(data);
        dispatch(initRares(sortedRares));
      })

  }, []);

  const commons = useSelector(state => state.commons);
  const uncommons = useSelector(state => state.uncommons);
  const rares = useSelector(state => state.rares);

  return (
    <div className='wrapper'>
      <Particles className='particles' params={ particlesOptions }/>
      <div className='title'>
        <h1 className='appName'>PokéPack</h1>
        <p>A Pokémon TCG Pack Opening Simulator</p>
      </div >
      <Pack />
      <Button variant='primary' size= 'sm' onClick={openSidebar}>Set List</Button> {' '}
      <div id='sidebar' className='cardList'>
        <CardList commons={ commons } uncommons={ uncommons } rares={ rares }/>
        <Button variant='outline-primary' size ='sm' className='closeButton' onClick={closeSidebar}>Close</Button>
      </div>
      <h6 className='footer'>Made by <a href='https://github.com/rhysalmario'>Rhys Almario</a></h6>
    </div>
  );
}


export default App;
