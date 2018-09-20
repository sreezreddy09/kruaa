import React from "react";
import {connect} from "react-redux";
import NotificationPanel from "./NotificationPanel";
import {updateApprovalStatus, fetchApprovals, searchGroupUsers, createGroupUsers, updateGroupUsers} from "../../actions/notificationActionCreator.js";

const NotificationPanelContainer = ({user_profile, user_approvals, fetchApprovals, updateApprovalStatus, searchGroupUsers, CreateGroupUsers, user_profiles, UpdateGroupUsers}) => (
    <NotificationPanel user_profile = {user_profile} user_approvals ={user_approvals} fetchApprovals = {fetchApprovals} updateApprovalStatus = {updateApprovalStatus} searchGroupUsers={searchGroupUsers} CreateGroupUsers= {CreateGroupUsers} user_profiles={user_profiles} UpdateGroupUsers={UpdateGroupUsers} />
);

function mapStateToProps (state, ownProps){    
    return{
        user_profile : state.user_info,
        user_approvals : state.user_approvals,
        user_profiles : state.user_profiles
    };
}
function mapDispatchToProps (dispatch, ownProps){
    return {
        fetchApprovals : function (user_name) {
            dispatch(fetchApprovals(user_name));
        },

        updateApprovalStatus : function (user, user_name, approve, approvalList){
            dispatch(updateApprovalStatus(user, user_name, approve, approvalList));
        },
        searchGroupUsers : function (query, user_name, group_users){
            dispatch(searchGroupUsers(query, user_name, group_users));
        },
        CreateGroupUsers : function (group_name, group_users){
            dispatch(createGroupUsers(group_name, group_users));
        },
        UpdateGroupUsers : function (group_id, group_users, user_name, deleted_users){
            dispatch(updateGroupUsers(group_id, group_users, user_name, deleted_users));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPanelContainer);