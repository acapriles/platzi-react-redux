import { useEffect, useState } from 'react';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Col, Spin } from 'antd';
import 'antd/dist/reset.css';

import { getPokemonsWithDetails, setLoading, setPokemons as setPokemonsActions } from './actions';
import Searcher from './components/Searcher';
import PokemonList from './components/PokemonList';
import logo from './assets/logo.svg';
import '../src/App.css'
import pokeApi from './api/pokeApi';
import { get, getIn } from 'immutable';
import { fetchPokemonsWithDetails } from './slices/dataSlice';

//? Manejo de Redux con connect
// Las props llegan directamente por Redux
// const App = ({ pokemons, setPokemons }) => {

const App = () => {
	// const [ pokemons, setPokemons ] = useState([]);

	//? Manejo de Redux con Hooks
	// const pokemons = useSelector( ( state  => state.pokemons) );
	// const loading = useSelector((state) => state.loading);
	
	// const pokemons = useSelector( ( state ) => getIn( state, [ 'data', 'pokemons' ], shallowEqual )).toJS();
	const pokemons = useSelector( ( state ) => state.data.pokemons, shallowEqual );
	// const loading = useSelector( ( state ) => getIn( state, ['ui', 'loading'] ));
	const loading = useSelector( ( state ) => state.ui.loading);

	const dispatch = useDispatch();

	useEffect(() => {
		/* const fetchPokemons = async () => {
			try {
				dispatch( setLoading( true ) );
				const { data } = await pokeApi.get('/pokemon', {
					params: {
						limit: 150,
						//offset: 1
					}
				});


				//? Obtener todos los detalles de los pokemons
				// Este codigo se movio para los actions para usar Redux-Thunks
				//const pokemonsDetailed = await Promise.all( data.results.map( ( pokemon ) => getPokemonDetails( pokemon ) ) );

				//? Manejo de Redux con connect
				// setPokemons( data.results );

				//? Manejo de Redux con Hooks
				// dispatch( setPokemonsActions( data.results ) )
				// dispatch( setPokemonsActions( pokemonsDetailed ) );

				
				dispatch( getPokemonsWithDetails( data.results ) )

			} catch (error) {
				console.log( error );
			}
			dispatch( setLoading( false ) );
		} 

		fetchPokemons();
		*/

		dispatch( fetchPokemonsWithDetails() );
	}, []);

	//? La petición se puso en el archivo de Types
	/* const getPokemonDetails = async ( pokemon ) => {
		const { data } = await pokeApi.get( pokemon.url );
		
		return data;
	} */
	

	return (
		<div className="App">
			<Col span={ 4 } offset={ 10 }>
				<img src={ logo } alt="asd" />
			</Col>
			<Col span={ 8 } offset={ 8 } >
				<Searcher />
			</Col>
			{
				loading 
				? (
					<Col offset={12}>
						<Spin spinning size='large' />
					</Col>
				) : (
					<PokemonList pokemons={ pokemons } />
				)
			}
		</div>
	)
}

export default App


//? Manejo de Redux con connect
//? Retorna el state
/* const mapStateToProps = ( ( state ) => ({
	pokemons: state.pokemons
})); */

//? Retorna los Dispatches
/* const mapDispatchToProps = ( ( dispatch ) => ({
	setPokemons: ( value ) => dispatch( setPokemonsActions( value ) )
})); */

// export default connect( mapStateToProps, mapDispatchToProps ) ( App )