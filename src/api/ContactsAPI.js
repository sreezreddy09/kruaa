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

function searchUser(value){	
	return new Promise(function(resolve, reject){
		$.ajax({
			url : "/api/users/search?q=" + value,
			type : "GET",
			dataType : "JSON"
		}).done(function(data){
			resolve({users : data});
		}).fail(function(err){
			console.log("Failed to search User", err);
		})
	})
}

module.exports = {
	fetchContacts : fetchContacts,
	searchUser : searchUser
};