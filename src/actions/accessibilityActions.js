import {
    CHANGE_LANGAUGE,
    UPDATE_FONTSIZE
} from './types';


export function updateFontSize(newSize) {
    return {
        type: UPDATE_FONTSIZE,
        payload: {
            fontSize: newSize
        }
    }
}

export function changeLang(language) {
    return {
        type: CHANGE_LANGAUGE,
        payload: {
            language
        }
    }
}
