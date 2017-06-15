// @flow
import * as ActionTypes from './action_types';

export function upload(payload: any = {}, meta: any = {}): any {
    return {
        type: ActionTypes.UPLOAD_EYE_CATCH,
        payload,
        meta,
    };
}

export function changeImageEditMode(payload: any = {}, meta: any = {}): any {
    return {
        type: ActionTypes.CHANGE_UPLOAD_EDIT_MODE,
        payload,
        meta,
    };
}

export function editTtile(payload: any = {}, meta: any = {}): any {
    return {
        type: ActionTypes.EDIT_TITLE,
        payload,
        meta,
    };
}

export function changeTitleEditMode(payload: any = {}, meta: any = {}): any {
    return {
        type: ActionTypes.CHANGE_UPLOAD_TITLE_EDIT_MODE,
        payload,
        meta,
    };
}
