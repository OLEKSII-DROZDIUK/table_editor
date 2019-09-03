import { combineReducers } from 'redux';
import { tableReducer } from './table-data';

export const rootReducer = combineReducers({
    tableData:tableReducer
});
