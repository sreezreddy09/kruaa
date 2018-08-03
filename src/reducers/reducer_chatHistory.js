import {FETCH_CHAT_SUCCESFUL, FETCH_CHAT_PENDING, FETCH_CHAT_FAILED, APPEND_MESSAGE_TO_CHAT} from "../actions/fetchChatActionCreator";

var INITIAL_STATE = {messages : [], status : null, error : null};

export default function (state = INITIAL_STATE, action ) {
	switch(action.type){
		case FETCH_CHAT_SUCCESFUL :
			return {...state, messages : action.payload, status : "completed", error : null};
		case FETCH_CHAT_PENDING :
			return {...state, status : "loading", messages : [], error : null};
		case FETCH_CHAT_FAILED:
			return {...state, status : "completed", error : "Failed to load the chat"}
		case APPEND_MESSAGE_TO_CHAT :
			return {...state, messages : action.payload, status : "completed", error : null}
		default:
			return state;
	}
}