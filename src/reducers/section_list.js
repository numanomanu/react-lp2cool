// @flow
import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions/action_types';
import htmlTemplates from '../html_templates';

export const initialState = {
    data: [{
        content: htmlTemplates[0],
        editFlag: false,
        contentType: null,
    }],
    selectedIndex: null,
};

const newSection = {
    content: `
    <div class="col-sm-4" style="text-align: center">ここに html を入力できます</div>
    <div class="col-sm-4" style="text-align: center">ここに html を入力できます</div>
    <div class="col-sm-4" style="text-align: center">ここに html を入力できます</div>
    `,
    editFlag: true,
    contentType: 'text',
}

const sectionList = handleActions({
    [ActionTypes.ADD_SECTION]: (state: any, action: any): any => {
        return {
            ...state,
            data: [
                ...state.data,
                newSection,
            ],
            selectedIndex: state.data.length,
        }
    },
    [ActionTypes.DELETE_SECTION]: (state: any, action: any): any => {
        state.data.splice(action.payload.index, 1)
        return {
            ...state,
            data: [...state.data],
            selectedIndex: null,
        }
    },
    [ActionTypes.CHANGE_EDIT_MODE]: (state: any, action: any): any => {
        // index に該当するものの editFlag を ture にして新しい state を返す
        const mySelf = state.data[action.payload.index];
        mySelf.editFlag = true;
        state.data.splice(action.payload.index, 1, mySelf)
        return {
            ...state,
            data: [...state.data],
            selectedIndex: action.payload.index,
        }
    },
    [ActionTypes.EDIT_SECTION]: (state: any, action: any): any => {
        // index に該当するものを削除して新しいステートに入れ替える
        const newContent = {
            content: action.payload.content,
            editFlag: false,
        }
        state.data.splice(action.payload.index, 1, newContent)
        return {
            ...state,
            data: [...state.data],
        }
    },
    [ActionTypes.SELECT_TEMPLEATE_SECTION]: (state: any, action: any): any => {
        return {
            ...state,
            data: [
                ...state.data,
                {
                    ...newSection,
                    content: htmlTemplates[action.payload.index],
                    editFlag: false,
                },
            ],
        }
    },
    [ActionTypes.UPDATE_LIST]: (state: any, action: any): any => {
        return {
            ...state,
            data: [...action.payload.updateList],
            selectedIndex: action.payload.newIndex,
        }
    },
}, initialState);

export default sectionList;
