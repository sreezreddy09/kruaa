import { combineReducers } from "redux";
import LoginReducer from "./reducer_loginPage";

const rootReducer = combineReducers({
    user_info : LoginReducer
});

export default rootReducer;