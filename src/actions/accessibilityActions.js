import {
    CHANGE_LANGAUGE,
    UPDATE_FONTSIZE
} from './types';


export const changeLanguage = (language) => {
    return (dispatch, getState) => {
        dispatch(changeLang(language));
    }
}

export const updateFontSize = (newSize) => {
    return (dispatch, getState) => {
        dispatch(updateFontSizeAction(newSize));
    }
}

function updateFontSizeAction(newSize) {
    return {
        type: UPDATE_FONTSIZE,
        payload: {
            fontSize: newSize
        }
    }
}

function changeLang(language) {
    return {
        type: CHANGE_LANGAUGE,
        payload: {
            language
        }
    }
}
