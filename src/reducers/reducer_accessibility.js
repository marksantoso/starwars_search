import {
  UPDATE_FONTSIZE,
} from '../actions/types';

const INITIAL_STATE = { fontSize: 'normal' };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case UPDATE_FONTSIZE:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}
