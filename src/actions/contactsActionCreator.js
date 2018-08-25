export const FETCH_CONTACTS_LIST = "FETCH_CONTACTS_LIST";
export const FETCHED_CONTACTS_LIST = "FETCHED_CONTACTS_LIST";
export const FETCH_CONTACTS_LIST_FAILED = "FETCH_CONTACTS_LIST_FAILED";
export const SEARCH_USER_INITIATED = "SEARCH_USER_INITIATED";
export const SEARCH_USER_FETCH_SUCCESSFUL = "SEARCH_USER_FETCH_SUCCESSFUL";
export const SEARCH_USER_FETCH_FAILED = "SEARCH_USER_FETCH_FAILED";
export const CURRENT_CHAT_PROFILE = "CURRENT_CHAT_PROFILE";
export const UPDATE_CHAT_PROFILE = "UPDATE_CHAT_PROFILE";
export const ADD_USER_REQUEST_SUCCESSFUL = "ADD_USER_REQUEST_SUCCESSFUL";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";

import ContactsAPI from "../api/ContactsAPI";

export function fetchContacts (user){
	return function (dispatch) {
		dispatch(fetchContactsRequestSent());
		return ContactsAPI.fetchContacts(user)
			.then(function(data){
				console.log("chat list", data);
				dispatch(fetchContactsRequestReceived(data))
			}, function(err){
				dispatch(fetchContactsRequestFailed(err));
			});
	}
}

export function searchUser (value, user){
	return function (dispatch){
		dispatch(searchUserInitiated());
		return ContactsAPI.searchUser(value, user)
			.then(function(data){
				dispatch(searchUserFetchSuccessful(data));
			}, function(err){
				console.log("Error fetched when serching the DB for user", err);
				dispatch(searchUserFetchFailed(err));
			})
	}
}

export function updateUserRequest (chat_member, user){
	return function(dispatch){
		return ContactsAPI.addUserRequest(chat_member, user)
			.then(function (data){
				if(data.status){
					chat_member.status = "pending";
					dispatch(addUserRequestSuccessful());
				}
			}, function(err){
				console.log(err);
			})
	}
}

export function fetchApprovals (user_name){
	return function(dispatch){
		return ContactsAPI.fetchApprovals(user_name)
			.then(function (data){
				dispatch(fetchApprovalsSuccessful(data));
			}, function(err){
				console.log(err);
			})
	}
}

function addUserRequestSuccessful (){
	return {
		type : ADD_USER_REQUEST_SUCCESSFUL
	}
}

export function activeChatUser (value) {
	return function (dispatch){
		dispatch(current_chat_profile(value));
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

export function clearSearchResults (){
	return {
		type : CLEAR_SEARCH_RESULTS
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