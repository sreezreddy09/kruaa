export const FETCH_CONTACTS_LIST = "FETCH_CONTACTS_LIST";
export const FETCHED_CONTACTS_LIST = "FETCHED_CONTACTS_LIST";
export const FETCH_CONTACTS_LIST_FAILED = "FETCH_CONTACTS_LIST_FAILED";
export const TOGGLE_SEARCH_PANEL = "TOGGLE_SEARCH_PANEL";
export const SEARCH_USER_INITIATED = "SEARCH_USER_INITIATED";
export const SEARCH_USER_FETCH_SUCCESSFUL = "SEARCH_USER_FETCH_SUCCESSFUL";
export const SEARCH_USER_FETCH_FAILED = "SEARCH_USER_FETCH_FAILED";
import ContactsAPI from "../api/ContactsAPI";

export function fetchContacts (){
	return function (dispatch) {
		dispatch(fetchContactsRequestSent());
		return ContactsAPI.fetchContacts()
			.then(function(data){
				dispatch(fetchContactsRequestReceived(data))
			}, function(err){
				dispatch(fetchContactsRequestFailed(err));
			});
	}
}

export function toggleSearchPanel (){
	return {
		type : TOGGLE_SEARCH_PANEL
	}
}

export function searchUser (value){
	return function (dispatch){
		dispatch(searchUserInitiated());
		return ContactsAPI.searchUser(value)
			.then(function(data){
				console.log("Users Fetched successfully", data);
				dispatch(searchUserFetchSuccessful(data));
			}, function(err){
				console.log("Error fetched when serching the DB for user", err);
				dispatch(searchUserFetchFailed(err));
			})
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