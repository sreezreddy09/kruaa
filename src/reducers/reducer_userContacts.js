import { FETCH_CONTACTS_LIST, FETCHED_CONTACTS_LIST, FETCH_CONTACTS_LIST_FAILED, SEARCH_USER_INITIATED, SEARCH_USER_FETCH_SUCCESSFUL, SEARCH_USER_FETCH_FAILED, UPDATE_CHAT_PROFILE } from "../actions/contactsActionCreator.js";

var INITIAL_STATE = {users : [], userSearchResults:[], status : null, error : null, loading : false};

export default function (state = INITIAL_STATE, action) {
	switch(action.type){
		case FETCH_CONTACTS_LIST :
			return { ...state, users : [], status: "fetching", error : null, loading : true};
		case FETCHED_CONTACTS_LIST : 
			return { ...state, users : action.payload.users, status : "fetched", error : null, loading : false};
		case FETCH_CONTACTS_LIST_FAILED : 
			return { ...state, users : [], status : "failed to fetch contacts", error : "Failed to fetch contact list", loading : false}
		case SEARCH_USER_INITIATED:
			return {...state, loading : true}
		case SEARCH_USER_FETCH_SUCCESSFUL:
			return {...state, userSearchResults: action.payload.users, loading : false}
		case SEARCH_USER_FETCH_FAILED:
			return {...state, userSearchResults: [], error : "Failed to search users using the query", loading : false}
		case UPDATE_CHAT_PROFILE:
			return {...state, users : action.payload, status: "fetched", error : null, loading : false}
		default:
			return state;
	}
}