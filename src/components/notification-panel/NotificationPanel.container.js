import React from "react";
import {connect} from "react-redux";
import NotificationPanel from "./NotificationPanel";
import {updateApprovalStatus, fetchApprovals} from "../../actions/notificationActionCreator.js";

const NotificationPanelContainer = ({user_profile, user_approvals, fetchApprovals, updateApprovalStatus}) => (
    <NotificationPanel user_profile = {user_profile} user_approvals ={user_approvals} fetchApprovals = {fetchApprovals} updateApprovalStatus = {updateApprovalStatus} />
    
);

function mapStateToProps (state, ownProps){    
    return{
        user_profile : state.user_info,
        user_approvals : state.user_approvals
    };
}
function mapDispatchToProps (dispatch, ownProps){
    return {
        fetchApprovals : function (user_name) {
            dispatch(fetchApprovals(user_name));
        },

        updateApprovalStatus : function (user, user_name, approve, approvalList){
            dispatch(updateApprovalStatus(user, user_name, approve, approvalList));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPanelContainer);