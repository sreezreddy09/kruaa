import React from "react";
import {connect} from "react-redux";
import MainDashboard from "./MainDashboard";
import LoginAPI from "../../api/LoginAPI";
import {user_signin_success} from "../../actions/loginActionCreator";


const MainDashboardContainer = ({user_profile}) => (
    <MainDashboard user_profile={user_profile} requireAuth={requireAuth}/>
    
);

function mapStateToProps (state, ownProps){
    return{
        user_profile : state.user_info
    };
}
function mapDispatchToProps (dispatch, ownProps){
    return {
        requireAuth : function(){
            if(sessionStorage.getItem("user")){
                LoginAPI.fetchUserInfo().done(function(data){
                    dispatch(user_signin_success(data[0]));
                }).fail(function(data){
                    window.location.href = "/";
                }.bind(this))
            }
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainDashboard);