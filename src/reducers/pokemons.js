import { fromJS, get, getIn, setIn } from 'immutable';

import { SET_FAVORITE, SET_POKEMONS } from '../actions/types';


const initialState = fromJS({
    pokemons: [],
});

export const pokemonsReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case SET_POKEMONS:
            // return { ...state, pokemons: action.payload };
            return setIn( state, ['pokemons'], fromJS( action.payload ));

        case SET_FAVORITE:
            const currentPokemonIndex = get( state, 'pokemons').findIndex(
                ( pokemon ) => pokemon.get( 'id' ) === action.payload.pokemonId
            );

            if ( currentPokemonIndex < 0 ) return state;

            // const isFavorite = state.get( 'pokemons' ).get( currentPokemonIndex ).get( 'favorite' );
            const isFavorite = getIn( state, [ 'pokemons', currentPokemonIndex, 'favorite' ] );

            return setIn(state, [ 'pokemons', currentPokemonIndex, 'favorite' ], !isFavorite );

        default:
            return state;
    }
};


// BEFORE IMMUTABLE
/* const initialState = {
    pokemons: [],
    loading: false,
};

export const pokemonsReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case SET_POKEMONS:
            return { ...state, pokemons: action.payload };

        case SET_FAVORITE:
            const newPokemonList = [ ...state.pokemons ];
            const currentPokemonIndex = newPokemonList.findIndex(
                ( pokemon ) => pokemon.id === action.payload.pokemonId
            );

            if ( currentPokemonIndex < 0 ) return state;

            newPokemonList[ currentPokemonIndex ].favorite = !newPokemonList[ currentPokemonIndex ].favorite

            return { ...state, pokemons: newPokemonList }

        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        default:
            return state;
    }
}; */