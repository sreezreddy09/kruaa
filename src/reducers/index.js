import { combineReducers } from "redux";
import LoginReducer from "./reducer_loginPage";
import ContactsReducer from "./reducer_userContacts";

const rootReducer = combineReducers({
    user_info : LoginReducer,
    user_profiles : ContactsReducer
});

export default rootReducer;