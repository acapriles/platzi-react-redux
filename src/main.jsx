import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, legacy_createStore as createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from "redux-logger";

import App from './App'
import { pokemonsReducer } from './reducers/pokemons'
import './index.css'
import { getEnvVariables } from './helpers/getEnvVariables';
import { customLogger, featuring } from './middlewares';
import rootReducer from './reducers/rootReducer';


const { VITE_MODE } = getEnvVariables();

const middlewares = [];

if (VITE_MODE === 'dev') {
	middlewares.push(thunk)
	middlewares.push(logger)
	middlewares.push(customLogger)
	//middlewares.push(featuring)
}

const composeEnhancers = (VITE_MODE === 'dev' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
	// pokemonsReducer,
	rootReducer,
	composeEnhancers(applyMiddleware( ...middlewares )),
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={ store } >
    		<App />
		</Provider>
  	</React.StrictMode>,
)
