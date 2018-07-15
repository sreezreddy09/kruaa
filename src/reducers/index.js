import { combineReducers } from "redux";
import LoginReducer from "./reducer_loginPage";
import ContactsReducer from "./reducer_userContacts";
import ChatProfileReducer from "./reducer_chatProfile";
import ChatHistoryReducer from "./reducer_chatHistory";

const rootReducer = combineReducers({
    user_info : LoginReducer,
    user_profiles : ContactsReducer,
    chat_profile : ChatProfileReducer,
    chat_history : ChatHistoryReducer
});

export default rootReducer;