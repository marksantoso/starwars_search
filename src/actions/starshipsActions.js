import axios from 'axios';

import {
    STORE_STARSHIPS,
    STARSHIPS_LOADING,
    STARSHIPS_LOADED
} from './types';


export const getStarships = (char, starships) => {

    return (dispatch, getState) => {
        let promises = [];

        Object.keys(starships).forEach(function(key, index) {
            const starshipsUrl = starships[key];
            promises.push(axios.get(starshipsUrl));
        });

        handleAjax(promises, char, dispatch);
    }
}

const handleAjax = (promises, name, dispatch) => {

    dispatch(loadingStarships());

    axios.all(promises).then(function(results) {
        // create fresh array to hold starships
        let starships = [];

        Object.keys(results).forEach(function(key, index) {
            starships.push(results[key].data);
        });

        let char = {};
        char[name] = starships;

        dispatch(loadedStarships());
        dispatch(storeStarships(char));

    }).catch(function (error) {
        console.log(error)
        if (error.response) {
            dispatch(ajaxError(error.response.statusText));
        }
    });
};

function loadingStarships() {
    return {
        type: STARSHIPS_LOADING,
        payload: { starshipsLoading: true }
    }
}

function loadedStarships() {
    return {
        type: STARSHIPS_LOADED,
        payload: { starshipsLoading: false }
    }
}

export const storeStarships = (starships) => {
    return {
        type: STORE_STARSHIPS,
        payload: starships
    }
}
