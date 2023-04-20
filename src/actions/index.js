import pokeApi from '../api/pokeApi';
import { SET_POKEMONS, SET_LOADING, SET_FAVORITE } from './types';

export const setPokemons = ( payload ) => ({
    type: SET_POKEMONS,
    payload,
});

/* export const getPokemonsWithDetails =
(pokemons = []) =>
  async (dispatch) => {
    const pokemonsDetailed = await Promise.all(
      pokemons.map((pokemon) => getPokemonDetails(pokemon))
    );

    dispatch(setPokemons(pokemonsDetailed));
}; */

export const getPokemonsWithDetails = ( pokemos = [] ) => 
    async ( dispatch ) => {
        try {
            //? Obtener todos los detalles de los pokemons
			const pokemonsDetailed = await Promise.all( pokemos.map( async ( pokemon ) => {
                const { data } = await pokeApi.get( pokemon.url );
		        return data;
            }));

            dispatch( setPokemons( pokemonsDetailed ) );
        } catch (error) {
            console.log( error );
        }
}

export const setLoading = ( payload ) => ({
    type: SET_LOADING,
    payload,
});

export const setFavorite= ( payload ) => ({
    type: SET_FAVORITE,
    payload,
});