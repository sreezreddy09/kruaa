import React  from "react";
import { connect } from "react-redux";
import LoginPage from "./LoginPage.js";
import {user_signIn_success } from '../../actions/loginActionCreator';

const LoginPageContainer = ({onLoginClick})=>(
    <LoginPage onLoginClick={onLoginClick}/>
);
function mapStateToProps(state, ownProps){
    return {
        user : state.user
    }
}
const mapDispatchToProps = function(dispatch, ownProps){
    return {
        onLoginClick : function (data){
            dispatch(user_signIn_success(data));
            ownProps.history.push('/dashboard');
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);