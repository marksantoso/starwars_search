import axios from 'axios';

import {
    STORE_FILMS,
    FILMS_LOADING,
    FILMS_LOADED
} from './types';


export const getFilms = (name, films) => {

    return (dispatch, getState) => {

        let promises = [];

        Object.keys(films).forEach(function(key, index) {
            const filmUrl = films[key];
            promises.push(axios.get(filmUrl));
        });

        handleAjax(promises, name, dispatch);
    }
}


const handleAjax = (promises, name, dispatch) => {

    dispatch(loadingFilms());

    axios.all(promises).then(function(results) {
        // create fresh array to hold films

        let films = [];

        Object.keys(results).forEach(function(key, index) {
            films.push(results[key].data);
        });

        let char = {};
        char[name] = films;

        dispatch(storeFilms(char));
        dispatch(loadedFilms());

    }).catch(function (error) {
        console.log(error)
        if (error.response) {
            dispatch(ajaxError(error.response.statusText));
        }
    });
};

function loadingFilms() {
    return {
        type: FILMS_LOADING,
        payload: { filmsLoading: true }
    }
}

function loadedFilms() {
    return {
        type: FILMS_LOADED,
        payload: { filmsLoading: false }
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
        payload: {error: true, errorText}
    }
}
