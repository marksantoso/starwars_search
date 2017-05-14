import {
  STORE_COMMENT,
} from '../actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {

    switch(action.type) {
        case STORE_COMMENT:
             return { ...state, ...action.payload }
         default:
             return state;
    }
}
