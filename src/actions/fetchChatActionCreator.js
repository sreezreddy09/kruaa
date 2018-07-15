export const FETCH_CHAT_SUCCESFUL = "FETCH_CHAT_SUCCESFUL";
export const FETCH_CHAT_PENDING = "FETCH_CHAT_PENDING";
export const FETCH_CHAT_FAILED = "FETCH_CHAT_FAILED";
import ChatHistoryAPI from "../api/ChatHistoryAPI.js";

export function fetch_chat_history(chat_member, user){
	return function (dispatch) {
		dispatch(fetch_chat_request_sent());
		return ChatHistoryAPI.fetchChatHistory(chat_member, user)
			.then(function(data){
				dispatch(fetch_chat_successful(data))
			}, function(err){
				dispatch(fetch_chat_failed(err));
			})
	}
}

function fetch_chat_successful(data){
	return {
		type : FETCH_CHAT_SUCCESFUL,
		payload : data
	}
}

function fetch_chat_request_sent(){
	return {
		type : FETCH_CHAT_PENDING
	}
}

function fetch_chat_failed(){
	return {
		type : FETCH_CHAT_FAILED
	}
}
