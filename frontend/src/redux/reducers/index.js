import { combineReducers } from "redux";
import { ipReducer } from "./ipReducer";

export const reducers = combineReducers({ ip: ipReducer })