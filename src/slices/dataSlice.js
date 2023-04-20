import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from './uiSlice';
import pokeApi from '../api/pokeApi';

const initialState = {
  pokemons: [],
};



export const fetchPokemonsWithDetails = createAsyncThunk(
    'data/fetchPokemonsWithDetails',
    async (_, { dispatch }) => {

        try {
            dispatch( setLoading( true ) );
            
            const { data: pokemonsRes } = await pokeApi.get('/pokemon', {
                params: { limit: 150 }
            });

            //? Obtener todos los detalles de los pokemons
			const pokemonsDetailed = await Promise.all( pokemonsRes.results.map( async ( pokemon ) => {
                const { data } = await pokeApi.get( pokemon.url );
		        return data;
            }));

            dispatch( setPokemons( pokemonsDetailed ) );

        } catch (error) {
            console.log( error );
        }
        dispatch( setLoading( false ) );
    }
);
  


export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    setFavorite: (state, action) => {
      const currentPokemonIndex = state.pokemons.findIndex((pokemon) => {
        return pokemon.id === action.payload.pokemonId;
      });

      if (currentPokemonIndex >= 0) {
        const isFavorite = state.pokemons[currentPokemonIndex].favorite;

        state.pokemons[currentPokemonIndex].favorite = !isFavorite;
      }
    },
  },
});

export const { setFavorite, setPokemons } = dataSlice.actions;
console.log('🚀 ~ file: dataSlice.js ~ line 29 ~ dataSlice', dataSlice);

export default dataSlice.reducer;