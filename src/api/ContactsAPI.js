var $ = require("jquery");

function fetchContacts (){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : "/api/chat-list/fetch",
			type : "GET",
			dataType : "JSON"
		}).done(function(data){

			console.log("Data successfully fetched", data);
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
			console.log("User Search queried successfully", data);
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