export const FETCH_CHAT_SUCCESFUL = "FETCH_CHAT_SUCCESFUL";
export const FETCH_CHAT_PENDING = "FETCH_CHAT_PENDING";
export const FETCH_CHAT_FAILED = "FETCH_CHAT_FAILED";
export const APPEND_MESSAGE_TO_CHAT = "APPEND_MESSAGE_TO_CHAT";
import ChatHistoryAPI from "../api/ChatHistoryAPI.js";
import {appendChatConversation, checkIfChatExists, fetchChatConversation, dbFetchedChats} from "../models/chatHistoryHelper.js";

export function fetch_chat_history(conversation_id, user_uid){
	return function (dispatch) {
		// dispatch(fetch_chat_request_sent());
		if(checkIfChatExists(conversation_id)){
			return dispatch(fetch_chat_successful(fetchChatConversation(conversation_id)))
		}
		return ChatHistoryAPI.fetchChatHistory(conversation_id, user_uid)
			.then(function(data){
				dbFetchedChats(conversation_id);
				dispatch(fetch_chat_successful(data))
			}, function(err){
				dispatch(fetch_chat_failed(err));
			})
	}
}

export function append_message_to_chat(conversation_id, msg){
	let message_list = appendChatConversation(conversation_id, msg);
	return {
		type : APPEND_MESSAGE_TO_CHAT,
		payload : message_list
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
