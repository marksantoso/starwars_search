import {
    SCORE_ADD,
    SCORE_DEC,
} from './types';


export const addUpVote = (currentScore) => {

    return (dispatch, getState) => {

        const name = currentScore.name;
        const score = currentScore.score + 1;

        let char = {};
        char[name] = { score: score }

        dispatch(storeUpVote(char));
    }
}

export const addDownVote = (currentScore) => {

    const name = currentScore.name;
    let score = currentScore.score - 1;
    score <= 0 ? score = 0 : score;

    let char = {};
    char[name] = { score: score }

    return (dispatch, getState) => {
        dispatch(storeDownVote(char));
    }
}


function storeUpVote(char) {
    return {
        type: SCORE_ADD,
        payload: char
     }
}

function storeDownVote(char) {
    return {
        type: SCORE_DEC,
        payload: char
     }
}
