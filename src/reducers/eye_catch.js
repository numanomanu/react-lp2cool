// @flow
import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions/action_types';

export const initialState = {
    data: {
        title: 'テクノロジーの力で 社会を“エンパワーメント”する',
        image: '',
    },
    editImageFlag: true,
    editTitleFlag: false,
};

const eyeCatch = handleActions({
    [ActionTypes.UPLOAD_EYE_CATCH]: (state: any, action: any): any => {
        return {
            ...state,
            data: {
                ...state.data,
                image: action.payload.image,
            },
            editImageFlag: false,
        }
    },
    [ActionTypes.CHANGE_UPLOAD_EDIT_MODE]: (state: any, action: any): any => {
        return {
            ...state,
            editImageFlag: true,
        }
    },
    [ActionTypes.CHANGE_UPLOAD_TITLE_EDIT_MODE]: (state: any, action: any): any => {
        return {
            ...state,
            editTitleFlag: true,
            editImageFlag: false,
        }
    },
    [ActionTypes.EDIT_TITLE]: (state: any, action: any): any => {
        return {
            ...state,
            data: {
                ...state.data,
                title: action.payload.content,
            },
            editImageFlag: false,
            editTitleFlag: false,
        }
    },
}, initialState);

export default eyeCatch;
