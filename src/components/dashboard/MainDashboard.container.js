import React from "react";
import {connect} from "react-redux";
import MainDashboard from "./MainDashboard";


const MainDashboardContainer = ({user}) => (
    <MainDashboard user={user} requireAuth={requireAuth}/>
    
);

function mapStateToProps (state, ownProps){
    return{
        user : state.user_info.user
    };
}
function mapDispatchToProps (dispatch, ownProps){
    return {
        requireAuth : function(){
            // return ownProps.history.push("/");
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainDashboard);