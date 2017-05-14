import axios from 'axios';

import {
    STORE_SPECIES,
    SPECIES_LOADED,
    SPECIES_LOADING
} from './types';


export const getSpecies = (name, species) => {

    return (dispatch, getState) => {

        let promises = [];

        Object.keys(species).forEach(function(key, index) {
            const speciesUrl = species[key];
            promises.push(axios.get(speciesUrl));
        });

        handleAjax(promises, name, dispatch);
    }
}

const handleAjax = (promises, name, dispatch) => {

    dispatch(loadingSpecies());


    axios.all(promises).then(function(results) {
        // create fresh array to hold species
        let species = [];

        Object.keys(results).forEach(function(key, index) {
            species.push(results[key].data);
        });

        let char = {};
        char[name] = species;

        dispatch(loadedSpecies());
        dispatch(storeSpecies(char));

    }).catch(function (error) {
        console.log(error)
        if (error.response) {
            dispatch(ajaxError(error.response.statusText));
        }
    });
};


function loadingSpecies() {
    return {
        type: SPECIES_LOADING,
        payload: { speciesLoading: true }
    }
}

function loadedSpecies() {
    return {
        type: SPECIES_LOADED,
        payload: { speciesLoading: false }
    }
}


export const storeSpecies = (species) => {
    return {
        type: STORE_SPECIES,
        payload: species
    }
}
