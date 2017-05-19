import axios from 'axios';
import {
    translateString,
    translateObj
} from '../helpers/translate';

import {
    STORE_STARSHIPS,
    STARSHIPS_LOADING,
    STARSHIPS_LOADED
} from './types';


export const getStarships = (char, starships, language) => {

    return (dispatch, getState) => {
        let promises = [];

        Object.keys(starships).forEach(function(key, index) {
            let starshipsUrl = starships[key];

            if (language === 'wookiee') {
                starshipsUrl = translateString(starshipsUrl) + '?format=wookiee';
            }

            promises.push(axios.get(starshipsUrl));
        });

        handleAjax(promises, char, dispatch, language);
    }
}

const handleAjax = (promises, name, dispatch, language) => {

    dispatch(loadingStarships());

    axios.all(promises).then(function(results) {
        // create fresh array to hold starships
        let starships = [];

        Object.keys(results).forEach(function(key, index) {

            let data;
            if (language === 'wookiee') {
                data = translateObj(results[key].data);
            } else {
                data = results[key].data;
            }

            starships.push(data);
        });

        let char = {};
        char[name] = starships;

        dispatch(loadedStarships());
        dispatch(storeStarships(char));

    }).catch(function(error) {
        console.log(error)
        if (error.response) {
            dispatch(ajaxError(error.response.statusText));
        }
    });
};

function loadingStarships() {
    return {
        type: STARSHIPS_LOADING,
        payload: {
            starshipsLoading: true
        }
    }
}

function loadedStarships() {
    return {
        type: STARSHIPS_LOADED,
        payload: {
            starshipsLoading: false
        }
    }
}

export const storeStarships = (starships) => {
    return {
        type: STORE_STARSHIPS,
        payload: starships
    }
}
