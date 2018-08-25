export const USER_SIGNIN = "USER_SIGNIN";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_FAILURE = "USER_SIGNIN_FAILURE";
export const USER_SIGNON_SUCCESS = "USER_SIGNON_SUCCESS";
export const USER_SIGNON_FAILURE = "USER_SIGNON_FAILURE";
export const TOGGLE_SIGNON = "TOGGLE_SIGNON";


export function user_signin_success(user){
    return {
        type : USER_SIGNIN_SUCCESS,
        payload : user
    }
}
export function user_signin_failure(data){
    return {
        type : USER_SIGNIN_FAILURE,
        payload : data
    }
}
export function user_signon_success(){
    return {
        type: USER_SIGNON_SUCCESS
    }
}
export function user_signon_failure(data){
    return {
        type : USER_SIGNON_FAILURE,
        payload : data
    }
}
export function toggle_signon (){
    return {
        type : TOGGLE_SIGNON
    }
}
