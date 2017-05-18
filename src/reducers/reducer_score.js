import {
  SCORE_ADD,
  SCORE_DEC,
} from '../actions/types';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {

    switch(action.type) {
        case SCORE_ADD:
             return { ...state, ...action.payload }
        case SCORE_DEC:
             return { ...state, ...action.payload };
         default:
             return state;
    }
}
