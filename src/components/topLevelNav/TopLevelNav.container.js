import React from "react";
import {connect} from "react-redux";
import TopLeveNav from "./TopLevelNav.react";

const TopLevelNavContainer = ({user}) => (
    <TopLeveNav user={user} />
    
);

function mapStateToProps (state, ownProps){
    return{
        user : state.user_info.user
    };
}
function mapDispatchToProps (dispatch, ownProps){
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopLeveNav);