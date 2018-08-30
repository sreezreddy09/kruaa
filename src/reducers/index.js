import { combineReducers } from "redux";
import LoginReducer from "./reducer_loginPage";
import ContactsReducer from "./reducer_userContacts";
import ChatProfileReducer from "./reducer_chatProfile";
import ChatHistoryReducer from "./reducer_chatHistory";
import UserApprovalReducer from "./reducer_userApprovals";

const rootReducer = combineReducers({
    user_info : LoginReducer,
    user_profiles : ContactsReducer,
    chat_profile : ChatProfileReducer,
    chat_history : ChatHistoryReducer,
    user_approvals : UserApprovalReducer
});

export default rootReducer;