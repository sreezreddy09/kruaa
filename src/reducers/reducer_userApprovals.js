import {UPDATE_APPROVAL_STATUS_SUCCESSFULL, FETCH_REQUEST_APPROVALS, FETCH_APPROVALS_PENDING, USER_SEARCH_SUCCESSFUL} from "../actions/notificationActionCreator.js";

var INITIAL_STATE = {approvals :[], groupUsers : [],  status : null, error : null, loading : false};

export default function (state = INITIAL_STATE, action) {
	switch(action.type){
		case FETCH_REQUEST_APPROVALS :
			return {...state, approvals : action.payload, loading : false};
		case UPDATE_APPROVAL_STATUS_SUCCESSFULL:
			return {...state, approvals : action.payload}
		case FETCH_APPROVALS_PENDING:
			return {...state, loading : true}
		case USER_SEARCH_SUCCESSFUL:
			return {...state, groupUsers : action.payload.users}
		default:
			return state;
	}
}