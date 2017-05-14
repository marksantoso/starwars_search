import {
  STORE_SPECIES,
} from '../actions/types';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {

    switch(action.type) {
        case STORE_SPECIES:
             return { ...state, ...action.payload }
         default:
             return state;
    }
}
