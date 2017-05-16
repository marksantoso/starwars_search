import axios from 'axios';

import rename from 'deep-rename-keys';

import {
    CHARS_RECEIVED,
    CHARS_LOADING,
    CHARS_LOADED,
    RESULTS_PAGINATION,
    CHARS_CLEAR,
    SET_SHOWMORE,
    RESULTS_ERROR,
    STORE_COMMENT

} from './types';



export const getChars = (language, rootUrl, term) => {

    return (dispatch, getState) => {

        dispatch(loadingChars());
        dispatch(showMore());

        let url;

        if (term) {
            dispatch(clearChars());
            language === 'wookiee' ? url = `${rootUrl}/people/?search=${term}?format=wookiee` :  url = `${rootUrl}/people/?search=${term}`;
        } else {
            language === 'wookiee' ? url = `${rootUrl}/people/?format=wookiee` : url = `${rootUrl}/people/`;
        }

        handleAjax(url, 0, dispatch, language);
    }
}


const translateString = (string) => {

    var charCodes2=new Array(47);
    charCodes2["ac"]="h";
    charCodes2["ah"]="i";
    charCodes2["ak"]="p";
    charCodes2["an"]="l";
    charCodes2["hu"]="u";
    charCodes2["ho"]="v";
    charCodes2["oa"]="c";
    charCodes2["oh"]="w";
    charCodes2["oo"]="o";
    charCodes2["or"]="k";
    charCodes2["ra"]="a";
    charCodes2["rc"]="r";
    charCodes2["rh"]="b";
    charCodes2["ro"]="y";
    charCodes2["rq"]="q";
    charCodes2["rr"]="g";
    charCodes2["sh"]="j";
    charCodes2["sc"]="m";
    charCodes2["uf"]="z";
    charCodes2["wa"]="d";
    charCodes2["wo"]="e";
    charCodes2["ww"]="f";
    charCodes2["wh"]="n";
    charCodes2["c"]="s";
    charCodes2["ao"]="t";
    charCodes2["k"]="x";
    charCodes2["1"]="1";
    charCodes2["2"]="2";
    charCodes2["3"]="3";
    charCodes2["4"]="4";
    charCodes2["5"]="5";
    charCodes2["6"]="6";
    charCodes2["7"]="7";
    charCodes2["8"]="8";
    charCodes2["9"]="9";
    charCodes2["0"]="0";
    charCodes2[" "]=" ";
    charCodes2["\n"]="\n";
    charCodes2["!"]="!";
    charCodes2["?"]="?";
    charCodes2["."]=".";
    charCodes2[","]=",";
    charCodes2["/"]="/";
    charCodes2[":"]=":";

    var keys = string.split("");
    let newString = '';

    let temp;
    for (var x = 0; x < keys.length; x++)
    {
            if(keys[x]=="a"||keys[x]=="o"||keys[x]=="r"||keys[x]=="s"||keys[x]=="u"||keys[x]=="w"||keys[x]=="h")//
            {
                temp = keys[x] + keys[x+1];
                x++;
            }
            else {
                temp = keys[x];
            }
            if (charCodes2[temp])
            {
                newString += charCodes2[temp] + "";
            }
    }
    return newString;
}

const translateObj = (obj) => {
    var charCodes2=new Array(47);
    charCodes2["ac"]="h";
    charCodes2["ah"]="i";
    charCodes2["ak"]="p";
    charCodes2["an"]="l";
    charCodes2["hu"]="u";
    charCodes2["ho"]="v";
    charCodes2["oa"]="c";
    charCodes2["oh"]="w";
    charCodes2["oo"]="o";
    charCodes2["or"]="k";
    charCodes2["ra"]="a";
    charCodes2["rc"]="r";
    charCodes2["rh"]="b";
    charCodes2["ro"]="y";
    charCodes2["rq"]="q";
    charCodes2["rr"]="g";
    charCodes2["sh"]="j";
    charCodes2["sc"]="m";
    charCodes2["uf"]="z";
    charCodes2["wa"]="d";
    charCodes2["wo"]="e";
    charCodes2["ww"]="f";
    charCodes2["wh"]="n";
    charCodes2["c"]="s";
    charCodes2["ao"]="t";
    charCodes2["k"]="x";
    charCodes2["1"]="1";
    charCodes2["2"]="2";
    charCodes2["3"]="3";
    charCodes2["4"]="4";
    charCodes2["5"]="5";
    charCodes2["6"]="6";
    charCodes2["7"]="7";
    charCodes2["8"]="8";
    charCodes2["9"]="9";
    charCodes2["0"]="0";
    charCodes2[" "]=" ";
    charCodes2["\n"]="\n";
    charCodes2["!"]="!";
    charCodes2["?"]="?";
    charCodes2["."]=".";
    charCodes2[","]=",";

    var data = obj.replace("whhuanan", "null");

    var data = JSON.parse(data);
    let temp;
    var obj = rename(data, function(key) {

        var keys = key.split("");
        let newKey = '';

        if (keys.length > 0) {
            let temp;
            for (var x = 0; x < keys.length; x++)
            {
                    if(keys[x]=="a"||keys[x]=="o"||keys[x]=="r"||keys[x]=="s"||keys[x]=="u"||keys[x]=="w"||keys[x]=="h")//
                    {
                        temp = keys[x] + keys[x+1];
                        x++;
                    }
                    else {
                        temp = keys[x];
                    }
                    if (charCodes2[temp])
                    {
                        newKey += charCodes2[temp] + "";
                    }
            }
                return newKey;
        }
        return key;
    });

    return obj
}

const handleAjax = (url, pageIndex, dispatch, language) => {

     //  key = key.replace("element_", ""); // renaming key
    //   json[key] = value; // setting data with new key

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

export const fetchMoreChars = (next, pageIndex, type) => {

    return (dispatch, getState) => {
        if (type === 'infinitescroll') {
            dispatch(hideShowMore());
        }
        handleAjax(next, pageIndex, dispatch);
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
