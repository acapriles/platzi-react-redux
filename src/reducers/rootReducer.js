import { combineReducers } from 'redux';
import dataSlice from '../slices/dataSlice';
import uiSlice from '../slices/uiSlice';


const rootReducer = combineReducers({
  data: dataSlice,
  ui: uiSlice
});

export default rootReducer;



/* 
// import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';
import { pokemonsReducer } from './pokemons';
import { uiReducer } from './ui';

const rootReducer = combineReducers({
  data: pokemonsReducer,
  ui: uiReducer,
});

export default rootReducer;

*/