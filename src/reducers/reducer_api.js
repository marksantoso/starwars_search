import {
  CHANGE_LANGAUGE,
  CHARS_LOADING,
  CHARS_LOADED,
  DETAILS_LOADING,
  DETAILS_LOADED,
  RESULTS_ERROR,
  STARSHIPS_LOADING,
  STARSHIPS_LOADED,
  FILMS_LOADING,
  FILMS_LOADED,
  SPECIES_LOADING,
  SPECIES_LOADED,
  CLEAR_ERROR
} from '../actions/types';


const INITIAL_STATE = { rootUrl: 'http://swapi.co/api' };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case CHANGE_LANGAUGE:
            return { ...state, ...action.payload }
        case CHARS_LOADING:
            return { ...state, ...action.payload }
        case CHARS_LOADED:
            return { ...state, ...action.payload }
        case FILMS_LOADING:
            return { ...state, ...action.payload }
        case FILMS_LOADED:
            return { ...state, ...action.payload }
        case SPECIES_LOADING:
            return { ...state, ...action.payload }
        case SPECIES_LOADED:
            return { ...state, ...action.payload }
        case STARSHIPS_LOADING:
            return { ...state, ...action.payload }
        case STARSHIPS_LOADED:
            return { ...state, ...action.payload }
        case RESULTS_ERROR:
            return { ...state, ...action.payload }
        case CLEAR_ERROR:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}
