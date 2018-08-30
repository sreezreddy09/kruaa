import { CURRENT_CHAT_PROFILE } from "../actions/contactsActionCreator.js";

var INITIAL_STATE = {user :{}, status : null, error : null };

export default function (state = INITIAL_STATE, action) {
	switch(action.type){
		case CURRENT_CHAT_PROFILE :
			return {...state, user : action.payload};
		default:
			return state;
	}
}