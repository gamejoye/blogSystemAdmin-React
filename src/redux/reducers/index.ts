import { combineReducers } from "redux";
import blogsReducer from "./blogsReducer";
import userInfoReducer from "./userInfoReducer";
import talksReducer from "./talksReducer";

const reducers = {
    userInfo: userInfoReducer,
    blogsState: blogsReducer,
    talks: talksReducer
}

export const allReducers = combineReducers(reducers);