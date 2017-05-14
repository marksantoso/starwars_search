import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import CharactersReducer from './reducer_characters';
import ScoreReducer from './reducer_score';
import PaginationReducer from './reducer_pagination';
import ApiReducer from './reducer_api';
import AccessibilityReducer from './reducer_accessibility';
import FilmsReducer from './reducer_films';
import SpeciesReducer from './reducer_species';
import StarshipsReducer from './reducer_starships';
import CommentsReducer from './reducer_comments';

const rootReducer = combineReducers({
  form: formReducer,
  characters: CharactersReducer,
  scores: ScoreReducer,
  pagination: PaginationReducer,
  api: ApiReducer,
  accessibility: AccessibilityReducer,
  starships: StarshipsReducer,
  species: SpeciesReducer,
  films: FilmsReducer,
  comments: CommentsReducer
});

export default rootReducer;
