import React  from "react";
import { connect } from "react-redux";
import LoginPage from "./LoginPage.js";
import {user_signin_success, user_signin_failure, user_signon_success, user_signon_failure, toggle_signon, loginkey_mismatch } from '../../actions/loginActionCreator';

const LoginPageContainer = ({user, userSigninSuccess, userSigninFailure, userSignonSuccess, userSignonFailure, toggleSignOn, loginKeyMismatch})=>(
    <LoginPage user={user} userSigninSuccess={userSigninSuccess} userSigninFailure={userSigninFailure} userSignonSuccess={userSignonSuccess} userSignonFailure={userSignonFailure} toggleSignOn={toggleSignOn} loginKeyMismatch={loginKeyMismatch} />
);
function mapStateToProps(state, ownProps){
    return {
        user : state.user_info
    }
}
const mapDispatchToProps = function(dispatch, ownProps){
    return {
        userSigninSuccess : function (data){
            dispatch(user_signin_success(data));
            ownProps.history.push('/dashboard');
        },
        userSigninFailure : function (){
            dispatch(user_signin_failure());
        },
        userSignonSuccess : function(){
            dispatch(user_signon_success());
        },
        userSignonFailure : function (data){
            dispatch(user_signon_failure());
        },
        toggleSignOn : function (){
            dispatch(toggle_signon());
        },
        loginKeyMismatch : function (){
            dispatch(loginkey_mismatch());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);