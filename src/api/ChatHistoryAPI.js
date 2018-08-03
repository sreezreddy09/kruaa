var $ = require("jquery");
import { appendChatConversation } from "../models/chatHistoryHelper.js";
function fetchChatHistory(conversation_id, user_uid){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : "/api/chat-history/fetch",
			type : "GET",
			dataType : "JSON",
			contentType: 'application/json',
			data : {conversation_id : conversation_id, user_uid : user_uid}
		}).done(function(data){
			let messageList = appendChatConversation(conversation_id, data);
			resolve(messageList);
		}).fail(function(err){
			reject(err);
		})
	})
}


module.exports = {
	fetchChatHistory : fetchChatHistory
}