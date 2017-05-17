import axios from 'axios';

import { translateObj, translateString } from '../helpers/translate';


import {
    CHARS_RECEIVED,
    CHARS_LOADING,
    CHARS_LOADED,
    RESULTS_PAGINATION,
    CHARS_CLEAR,
    SET_SHOWMORE,
    RESULTS_ERROR,
    STORE_COMMENT,
    CLEAR_ERROR

} from './types';


export const getChars = (language, rootUrl, term) => {

    return (dispatch, getState) => {
        dispatch(clearChars());
        dispatch(clearError());
        dispatch(loadingChars());
        dispatch(showMore());

        let url;

        if (term) {
            language === 'wookiee' ? url = `${rootUrl}/people/?search=${term}&format=wookiee` :  url = `${rootUrl}/people/?search=${term}`;
        } else {
            language === 'wookiee' ? url = `${rootUrl}/people/?format=wookiee` : url = `${rootUrl}/people/`;
        }

        handleAjax(url, 0, dispatch, language);
    }
}

const handleAjax = (url, pageIndex, dispatch, language) => {
    axios.get(url).then( function(response) {

        let data;
        if (language === 'wookiee') {
            data = translateObj(response.data);
        } else {
            data = response.data;
        }

        console.log(data);

        const { count, next, previous } = data

        dispatch(storePagination({ count, next, previous, index: pageIndex }))

        let chars = data.results;
        const promises = [];


        Object.keys(chars).forEach(function(key, index) {
            let homeworldUrl;
            if (language === 'wookiee') {
                homeworldUrl = translateString(chars[key].homeworld)
            } else {
                homeworldUrl = chars[key].homeworld;
            }
            console.log(homeworldUrl);

            promises.push(axios.get(homeworldUrl));
        });

        axios.all(promises).then(function(results) {
            // create fresh array to hold chars

            let nextChars = [];
            Object.keys(results).forEach(function(key, index) {
                //assign relevent key values
                 nextChars[pageIndex + parseInt(key)] = { ...chars[key], homeworldName: results[key].data.name }
            });


            dispatch(storeCharList(nextChars));
            dispatch(loadedChars());
        });
    }).catch(function (error) {
        console.log(error)
        if (error.response) {
            dispatch(ajaxError(error.response.statusText));
        }
    });
}

export const fetchMoreChars = (next, pageIndex, type, language) => {

    if (language === 'wookiee') {
        next = translateString(next);
    }

    console.log(next);


    return (dispatch, getState) => {
        if (type === 'infinitescroll') {
            dispatch(hideShowMore());
        }
        handleAjax(next, pageIndex, dispatch, language);
    }
}

export const saveComment = (name, values) => {

    return (dispatch, getState) => {
        let char = {};
        char[name] = values.comment;

        dispatch(storeComment(char));
    }
}

function storeComment(char) {
    return {
        type: STORE_COMMENT,
        payload: char
    }
}

function storePagination(pagination) {
    return {
        type: RESULTS_PAGINATION,
        payload: pagination
    }
}

function ajaxError(errorText) {
    return {
        type: RESULTS_ERROR,
        payload: {error: true, errorText}
    }
}

function showMore() {
    return {
        type: SET_SHOWMORE,
        payload: { showMore: true }
    }
}
function hideShowMore() {
    return {
        type: SET_SHOWMORE,
        payload: { showMore: false }
    }
}

function clearError() {
    return {
        type: CLEAR_ERROR
    }
}
function clearChars() {
    return {
        type: CHARS_CLEAR,
    }
}

function loadedChars() {
    return {
        type: CHARS_LOADED,
        payload: { loading: false }
    }
}

function loadingChars() {
    return {
        type: CHARS_LOADING,
        payload: { loading: true }
    }
}


function storeCharList(chars) {
    return {
        type: CHARS_RECEIVED,
        payload: chars
    }
}
