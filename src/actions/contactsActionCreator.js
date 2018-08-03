export const FETCH_CONTACTS_LIST = "FETCH_CONTACTS_LIST";
export const FETCHED_CONTACTS_LIST = "FETCHED_CONTACTS_LIST";
export const FETCH_CONTACTS_LIST_FAILED = "FETCH_CONTACTS_LIST_FAILED";
export const SEARCH_USER_INITIATED = "SEARCH_USER_INITIATED";
export const SEARCH_USER_FETCH_SUCCESSFUL = "SEARCH_USER_FETCH_SUCCESSFUL";
export const SEARCH_USER_FETCH_FAILED = "SEARCH_USER_FETCH_FAILED";
export const CURRENT_CHAT_PROFILE = "CURRENT_CHAT_PROFILE";
export const UPDATE_CHAT_PROFILE = "UPDATE_CHAT_PROFILE";
import ContactsAPI from "../api/ContactsAPI";

export function fetchContacts (user){
	return function (dispatch) {
		dispatch(fetchContactsRequestSent());
		return ContactsAPI.fetchContacts(user)
			.then(function(data){
				dispatch(fetchContactsRequestReceived(data))
			}, function(err){
				dispatch(fetchContactsRequestFailed(err));
			});
	}
}

export function searchUser (value){
	return function (dispatch){
		dispatch(searchUserInitiated());
		return ContactsAPI.searchUser(value)
			.then(function(data){
				dispatch(searchUserFetchSuccessful(data));
			}, function(err){
				console.log("Error fetched when serching the DB for user", err);
				dispatch(searchUserFetchFailed(err));
			})
	}
}

export function activeChatUser (value) {
	return function (dispatch){
		dispatch(CurrentChatProfile(value));
	}
}

export function current_chat_profile (data) {
	return {
		type : CURRENT_CHAT_PROFILE,
		payload : data
	}
}

export function update_user_profiles (profiles){
	return {
		type : UPDATE_CHAT_PROFILE,
		payload : profiles
	}
}

function searchUserInitiated(){
	return {
		type : SEARCH_USER_INITIATED
	}
}

function searchUserFetchSuccessful(data){
	return {
		type : SEARCH_USER_FETCH_SUCCESSFUL,
		payload : data
	}
}

function searchUserFetchFailed (){
	return {
		type : SEARCH_USER_FETCH_FAILED
	}
}

function fetchContactsRequestSent(){
	return {
		type : FETCH_CONTACTS_LIST
	}
}

function fetchContactsRequestFailed(){
	return {
		type : FETCH_CONTACTS_LIST_FAILED
	}
}

function fetchContactsRequestReceived (data){
	return {
		type: FETCHED_CONTACTS_LIST,
		payload: data
	}
}