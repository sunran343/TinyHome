import { combineReducers } from 'redux';
import * as Cliper from "./cliper/reducer.js";
import * as ShortUrl from "./shorturl/reducer.js";

const allReducers = {
    ...Cliper,
    ...ShortUrl
};

const rootReducers = combineReducers(allReducers);

export default rootReducers
