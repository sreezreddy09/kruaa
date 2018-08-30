export const UPDATE_APPROVAL_STATUS_SUCCESSFULL = "UPDATE_APPROVAL_STATUS_SUCCESSFULL";
export const FETCH_REQUEST_APPROVALS = "FETCH_REQUEST_APPROVALS";
export const FETCH_APPROVALS_PENDING = "FETCH_APPROVALS_PENDING";

import ContactsAPI from "../api/ContactsAPI";
 import {sendChatInfoToSocket} from "../models/client-socket";

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