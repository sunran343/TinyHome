import {createAction} from "redux-actions";

//短网址
export const setInputUrl = createAction('set input url');
export const short2Long = createAction('short 2 long');
export const updateHistory = createAction('update history')
export const syncHistory = createAction('sync history');
export const clearHistory = createAction('clear history');
