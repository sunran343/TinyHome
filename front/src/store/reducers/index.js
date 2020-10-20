import { combineReducers } from 'redux';
import CliperReducer from "./cliper/reducer.js";

const allReducers = {
    CliperReducer
};

const rootReducers = combineReducers(allReducers);

export default rootReducers
