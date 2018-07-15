var $ = require("jquery");

function fetchChatHistory(){
	return new Promise(function(resolve, reject){
		// $.ajax({
		// 	url : "/api/chat-listh",
		// 	type : "GET",
		// 	dataType : "JSON"
		// }).done(function(data){
		// 	resolve(chat_data);
		// }).fail(function(err){
		// 	reject(err);
		// })
		resolve(chat_data)
	})
}

const chat_data = [
	{
		conversation_id : "416ac246-e7ac-49ff-93b4-f7e94d997e6b",
		sender_id : "sreez",
		message_type : "text",
		message : "Hey.. Hai! How are you?",
		createdat_time : "1529083427822"
	},
	{
		conversation_id : "416ac246-e7ac-49ff-93b4-f7e94d991111",
		sender_id : "rohit",
		message_type : "text",
		message : "Yeah., Good. How are you?",
		createdat_time : "1529083429745"
	},
	{
		conversation_id : "416ac246-e7ac-49ff-93b4-f7e94d997e6b",
		sender_id : "sreez",
		message_type : "text",
		message : "Yeah I'm good. How long have been in Bay Area?",
		createdat_time : "1529083428907"
	},
	{
		conversation_id : "416ac246-e7ac-49ff-93b4-f7e94d991111",
		sender_id : "rohit",
		message_type : "text",
		message : "Cool. It's been a month I have moved here.",
		createdat_time : "1529083430055"
	},
	{
		conversation_id : "416ac246-e7ac-49ff-93b4-f7e94d997e6b",
		sender_id : "sreez",
		message_type : "text",
		message : "Oh. Nice. Where are you staying now?",
		createdat_time : "1529083430455"
	},
	{
		conversation_id : "416ac246-e7ac-49ff-93b4-f7e94d991111",
		sender_id : "rohit",
		message_type : "text",
		message : "I stay close to Mountain view downtown on Mariposa Ave",
		createdat_time : "1529083430943"
	},
	{
		conversation_id : "416ac246-e7ac-49ff-93b4-f7e94d997e6b",
		sender_id : "sreez",
		message_type : "text",
		message : "Nice. Then why can't we catch up on this weekend.",
		createdat_time : "1529083431345"
	},
	{
		conversation_id : "416ac246-e7ac-49ff-93b4-f7e94d991111",
		sender_id : "rohit",
		message_type : "text",
		message : "Hmm. Then lets to a restaurent on Saturday Afternoon.",
		createdat_time : "1529083431555"
	}
]

module.exports = {
	fetchChatHistory : fetchChatHistory
}