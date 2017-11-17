import {USER_SIGNIN, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE} from "../actions/loginActionCreator";

var INITIAL_STATE = {user: null, status : null, error: null, loading: false};

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case USER_SIGNIN:
        return {...state, user: action.payload.user, status: "authenticated", error:null, loading : false};
        case USER_SIGNIN_SUCCESS:
        return {...state, user: action.payload, status: "signin", error: null, loading : true};
        case USER_SIGNIN_FAILURE:
        return {...state, user:null, status: "signin", error : "login failed", loading: false };
        default:
        return state;
    }

}