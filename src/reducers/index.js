// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import eyeCatch from './eye_catch';
import sectionList from './section_list';

const rootReducer = combineReducers({
    sectionList,
    eyeCatch,
    form: formReducer,
});

export default rootReducer;
