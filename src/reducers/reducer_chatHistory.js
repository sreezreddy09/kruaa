import {FETCH_CHAT_SUCCESFUL, FETCH_CHAT_PENDING, FETCH_CHAT_FAILED} from "../actions/fetchChatActionCreator";

var INITIAL_STATE = {messages : [], status : null, error : null};

export default function (state = INITIAL_STATE, action ) {
	switch(action.type){
		case FETCH_CHAT_SUCCESFUL :
			return {...state, messages : action.payload, status : "completed", error : null};
		case FETCH_CHAT_PENDING :
			return {...state, status : "loading", messages : [], error : null};
		case FETCH_CHAT_FAILED:
			return {...state, status : "completed", error : "Failed to load the chat"}
		default:
			return state;
	}
}