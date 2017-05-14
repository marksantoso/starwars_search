import {
  STORE_STARSHIPS,
} from '../actions/types';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {

    switch(action.type) {
        case STORE_STARSHIPS:
             return { ...state, ...action.payload }
         default:
             return state;
    }
}
