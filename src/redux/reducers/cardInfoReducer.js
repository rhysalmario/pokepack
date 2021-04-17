import poketcg from 'pokemontcgsdk';
import { INIT_COMMONS, INIT_UNCOMMONS, INIT_RARES } from '../actions/cardInfoActions';

const initialState = {
  commons: [],
  uncommons: [],
  rares: []
};

const cardInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_COMMONS:
      return {
        ...state,
        commons : action.payload
      }
    case INIT_UNCOMMONS:
      return {
        ...state,
        uncommons : action.payload
      }
    case INIT_RARES:
      return {
        ...state,
        rares : action.payload
      }
    default:
      return state;
  }
}

export default cardInfoReducer;