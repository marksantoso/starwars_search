import {
  CHARS_RECEIVED,
  CHARS_CLEAR
} from '../actions/types';


const INITIAL_STATE = { };


export default function(state = INITIAL_STATE, action) {

    switch(action.type) {
        case CHARS_RECEIVED:
             return { ...state, ...action.payload }
        case CHARS_CLEAR:
            return INITIAL_STATE
        default:
            return state;
    }
}
