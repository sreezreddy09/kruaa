import React from "react";
import {connect} from "react-redux";
import TopLeveNav from "./TopLevelNav.react";

const TopLevelNavContainer = ({user_profile}) => (
    <TopLeveNav user_profile={user_profile} />
    
);

function mapStateToProps (state, ownProps){    
    return{
        user_profile : state.user_info
    };
}
function mapDispatchToProps (dispatch, ownProps){
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopLeveNav);