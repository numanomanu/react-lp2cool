// @flow
import * as ActionTypes from './action_types';

export function add(payload: any = {}, meta: any = {}): any {
    return {
        type: ActionTypes.ADD_SECTION,
        payload,
        meta,
    };
}

export function del(payload: { index: number }, meta: any = {}): any {
    return {
        type: ActionTypes.DELETE_SECTION,
        payload,
        meta,
    };
}

export function edit(payload: { index: number }, meta: any = {}): any {
    return {
        type: ActionTypes.EDIT_SECTION,
        payload,
        meta,
    };
}

export function changeEditMode(payload: { index: number }, meta: any = {}): any {
    return {
        type: ActionTypes.CHANGE_EDIT_MODE,
        payload,
        meta,
    };
}

export function selectTemplateSection(payload: { index: number }, meta: any = {}): any {
    return {
        type: ActionTypes.SELECT_TEMPLEATE_SECTION,
        payload,
        meta,
    };
}

export function sort(payload: { updateList: Array<*>, newIndex: number }, meta: any = {}): any {
    return {
        type: ActionTypes.UPDATE_LIST,
        payload,
        meta,
    };
}
