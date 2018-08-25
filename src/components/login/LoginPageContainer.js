import React  from "react";
import { connect } from "react-redux";
import LoginPage from "./LoginPage.js";
import {user_signin_success, user_signin_failure, user_signon_success, user_signon_failure, toggle_signon } from '../../actions/loginActionCreator';

const LoginPageContainer = ({user, userSigninSuccess, userSigninFailure, userSignonSuccess, userSignonFailure, toggleSignOn})=>(
    <LoginPage user={user} userSigninSuccess={userSigninSuccess} userSigninFailure={userSigninFailure} userSignonSuccess={userSignonSuccess} userSignonFailure={userSignonFailure} toggleSignOn={toggleSignOn} />
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
            sessionStorage.setItem("user", JSON.stringify(data))
            ownProps.history.push('/dashboard');
        },
        userSigninFailure : function (data){
            dispatch(user_signin_failure(data));
        },
        userSignonSuccess : function(){
            dispatch(user_signon_success());
        },
        userSignonFailure : function (data){
            dispatch(user_signon_failure(data));
        },
        toggleSignOn : function (){
            dispatch(toggle_signon());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);