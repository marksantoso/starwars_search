import {
  RESULTS_PAGINATION,
  SET_SHOWMORE
} from '../actions/types';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {

    switch(action.type) {
        case RESULTS_PAGINATION:
            return { ...state, ...action.payload }
        case SET_SHOWMORE:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}
