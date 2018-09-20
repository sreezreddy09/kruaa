var $ = require("jquery");

function fetchContacts (user){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : "/api/chat-list/fetch?user_name="+ user,
			type : "GET",
			dataType : "JSON"
		}).done(function(data){
			resolve({users : data});
		}).fail(function(err){
			console.log("Failed with API request", err);
			reject(err);
		})
	})
}

function searchUser(value, user){	
	return new Promise(function(resolve, reject){
		$.ajax({
			url : "/api/users/search?q=" + value +"&user=" + user,
			type : "GET",
			dataType : "JSON"
		}).done(function(data){
			resolve({users : data});
		}).fail(function(err){
			console.log("Failed to search User", err);
		})
	})
}

function searchGroupUsers(value, user){	
	return new Promise(function(resolve, reject){
		$.ajax({
			url : "/api/users/group?q=" + value +"&user=" + user,
			type : "GET",
			dataType : "JSON"
		}).done(function(data){
			resolve({users : data});
		}).fail(function(err){
			console.log("Failed to search User", err);
		})
	})
}

function addUserRequest (chat_member, user){
	let body = {
		chatter_uid : chat_member.user_uid,
		user_name : user.user_name
	}
	return new Promise(function (resolve, reject) {
		$.ajax({
			url : "/api/request/add",
			type : "POST",
			dataType : "JSON", 
			contentType : "application/json",
			data : JSON.stringify(body)
		}).done(function(data){
			console.log(data);
			resolve(data);
		}).fail(function(err){
			console.log("failed to add user request", err);
			reject(err);
		})
	})
}

function fetchApprovals (user_name){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : "/api/request/fetch-my-approvals?user_name=" + user_name,
			type : "GET",
			dataType : "JSON"
		}).done(function(data){
			resolve(data);
		}).fail(function(err){
			console.log("Fetch Approval failed", err);
			reject(err);
		})
	})
}

function updateApprovalStatus (user_uid, user_name, approve){
	let body = {
		chatter_uid : user_uid,
		user_name : user_name,
		accept_status : approve
	};

	return new Promise(function(resolve, reject){
		$.ajax({
			url : "/api/request/update",
			type : "POST",
			dataType : "JSON",
			contentType : "application/json",
			data : JSON.stringify(body)
		}).done(function(data){
			console.log(data);
			resolve(data);
		}).fail(function(err){
			console.log("Fetch Approval failed", err);
			reject(err);
		})
	})
}

module.exports = {
	fetchContacts : fetchContacts,
	searchUser : searchUser,
	addUserRequest : addUserRequest,
	fetchApprovals : fetchApprovals,
	searchGroupUsers : searchGroupUsers,
	updateApprovalStatus : updateApprovalStatus
};