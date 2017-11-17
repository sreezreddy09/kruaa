export const USER_SIGNIN = "USER_SIGNIN";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_FAILURE = "USER_SIGNIN_FAILURE";


export function user_signIn_success(user){
    return {
        type : USER_SIGNIN_SUCCESS,
        payload : user
    }
}