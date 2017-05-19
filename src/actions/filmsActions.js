import axios from 'axios';
import {
    translateString,
    translateObj
} from '../helpers/translate';

import {
    STORE_FILMS,
    FILMS_LOADING,
    FILMS_LOADED
} from './types';


export const getFilms = (name, films, language) => {

    return (dispatch, getState) => {

        let promises = [];

        Object.keys(films).forEach(function(key, index) {
            let filmUrl = films[key];

            if (language === 'wookiee') {
                filmUrl = translateString(filmUrl) + '?format=wookiee';
            }

            promises.push(axios.get(filmUrl));
        });

        handleAjax(promises, name, dispatch, language);
    }
}


const handleAjax = (promises, name, dispatch, language) => {

    dispatch(loadingFilms());


    axios.all(promises).then(function(results) {
        // create fresh array to hold films
        let films = [];

        Object.keys(results).forEach(function(key, index) {
            let data;
            if (language === 'wookiee') {
                data = translateObj(results[key].data);
            } else {
                data = results[key].data;
            }

            films.push(data);
        });

        let char = {};
        char[name] = films;

        dispatch(storeFilms(char));
        dispatch(loadedFilms());

    }).catch(function(error) {
        console.log(error)
        if (error.response) {
            dispatch(ajaxError(error.response.statusText));
        }
    });
};

function loadingFilms() {
    return {
        type: FILMS_LOADING,
        payload: {
            filmsLoading: true
        }
    }
}

function loadedFilms() {
    return {
        type: FILMS_LOADED,
        payload: {
            filmsLoading: false
        }
    }
}

function storeFilms(films) {
    return {
        type: STORE_FILMS,
        payload: films
    }
}

function ajaxError(errorText) {
    return {
        type: RESULTS_ERROR,
        payload: {
            error: true,
            errorText
        }
    }
}
