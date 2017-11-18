import {USER_SIGNIN, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE, USER_SIGNON_SUCCESS, USER_SIGNON_FAILURE, TOGGLE_SIGNON, LOGINKEY_MISMATCH} from "../actions/loginActionCreator";

var INITIAL_STATE = {user: null, status : null, error: null, loading: false};

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case USER_SIGNIN:
        return {...state, user : action.payload.user, status : "authenticated", error : null, loading : false};
        case USER_SIGNIN_SUCCESS:
        return {...state, user : action.payload, status : "signin", error : null, loading : true};
        case USER_SIGNIN_FAILURE:
        return {...state, user : null, status : "signin", error : "username or password didn't match", loading : false };
        case USER_SIGNON_SUCCESS:
        return {...state, user : null, status : "signon", error : null, loading : false};
        case USER_SIGNON_FAILURE:
        return {...state, user : null, status : "signon", error : "User name already exists", loading : false};
        case TOGGLE_SIGNON:
        return {...state, user : null, status : "user_sign", error : null, loading : false};
        case LOGINKEY_MISMATCH:
        return {...state, user : null, status : "signon", error : "Key didn't Match.", loading : false};
        default:
        return state;
    }

}