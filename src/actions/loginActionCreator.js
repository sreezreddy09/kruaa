export const USER_SIGNIN = "USER_SIGNIN";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_FAILURE = "USER_SIGNIN_FAILURE";
export const USER_SIGNON_SUCCESS = "USER_SIGNON_SUCCESS";
export const USER_SIGNON_FAILURE = "USER_SIGNON_FAILURE";
export const TOGGLE_SIGNON = "TOGGLE_SIGNON";
export const LOGINKEY_MISMATCH = "LOGINKEY_MISMATCH";


export function user_signin_success(user){
    return {
        type : USER_SIGNIN_SUCCESS,
        payload : user
    }
}
export function user_signin_failure(){
    return {
        type : USER_SIGNIN_FAILURE
    }
}
export function user_signon_success(){
    return {
        type: USER_SIGNON_SUCCESS
    }
}
export function user_signon_failure(){
    return {
        type : USER_SIGNON_FAILURE
    }
}
export function toggle_signon (){
    return {
        type : TOGGLE_SIGNON
    }
}

export function loginkey_mismatch (){
    return {
        type : LOGINKEY_MISMATCH
    }
}
