export const UPDATE_APPROVAL_STATUS_SUCCESSFULL = "UPDATE_APPROVAL_STATUS_SUCCESSFULL";
export const FETCH_REQUEST_APPROVALS = "FETCH_REQUEST_APPROVALS";
export const FETCH_APPROVALS_PENDING = "FETCH_APPROVALS_PENDING";
export const USER_SEARCH_SUCCESSFUL = "USER_SEARCH_SUCCESSFUL";

import ContactsAPI from "../api/ContactsAPI";
 import {sendChatInfoToSocket, CreateGroupWithSocket, UpdateGroupWithSocket} from "../models/client-socket";

export function updateApprovalStatus (user, user_name, approve, approvalList){
	return function (dispatch){
		return ContactsAPI.updateApprovalStatus(user.user_uid, user_name, approve)
		.then(function(data){
			let approvals = approvalList.filter((d) => d.user_uid !== user.user_uid);
			dispatch(UpdateApprovalStatusSuccessful(approvals));
			if(data.chat_info){
				data["chat_info"]["name"] = user.name;
				sendChatInfoToSocket(user.user_uid, data.chat_info);
			}
		}).catch((err) => {
			console.log(err);
		});
	}
}

export function UpdateApprovalStatusSuccessful (approvals){
	return {
		type : UPDATE_APPROVAL_STATUS_SUCCESSFULL,
		payload : approvals
	}
}

export function fetchApprovals (user_name){
	return function(dispatch){
		dispatch(fetchApprovalsPending());
		return ContactsAPI.fetchApprovals(user_name)
			.then(function (data){
				dispatch(fetchApprovalsSuccessful(data));
			}, function(err){
				console.log(err);
			})
	}
}

export function searchGroupUsers (query, user_name, group_users){
	return function(dispatch){
		return ContactsAPI.searchGroupUsers(query, user_name)
			.then(function(data){
				group_users && group_users.forEach((group_user) => {
					data.users.map((user) => {
						if(user.user_uid === group_user){
							user.isUser = true;
						}
					});
				})
				dispatch(userSearchSuccessful(data));
			}, function(err){
				console.log(err);
			})
	}
}

export function createGroupUsers (group_name, group_users){
	return function(dispatch){
		CreateGroupWithSocket(group_name, group_users);
	}
}

export function updateGroupUsers (group_id, group_users, user_name, deleted_users){
	return function (dispatch){
		UpdateGroupWithSocket(group_id, group_users, user_name, deleted_users);
	}
}

function userSearchSuccessful(data){
	return {
		type : USER_SEARCH_SUCCESSFUL,
		payload : data
	}
}

function fetchApprovalsSuccessful (data){
	return {
		type : FETCH_REQUEST_APPROVALS,
		payload : data
	}
}

function fetchApprovalsPending (){
	return {
		type : FETCH_APPROVALS_PENDING
	}
}