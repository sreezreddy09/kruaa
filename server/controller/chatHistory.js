const PostGresDriver = require("../services/postgresDriver");
const logger = require("../services/logger");
const FETCH_CHAT_HSTORY_CQL = "SELECT conversation_id, sender_id, message_type, message, createdat_time FROM messages WHERE conversation_id = $1 ORDER BY CREATEDAT_TIME ASC;";
const APPEND_MSG_TO_HISTORY_CQL = "INSERT INTO messages (conversation_id, sender_id, message_type, message, createdat_time, unread_status, read_recipients) VALUES ($1, $2, $3, $4, $5, $6, $7);";
const  RESET_MESSAGE_COUNTER_CQL = "UPDATE messages SET unread_status = 'false' WHERE conversation_id = $1 AND sender_id != $2 AND unread_status = 'true';"
const RESET_GROUP_MESSAGE_COUNTER_CQL = "update messages set read_recipients = read_recipients || $2 || '::' where conversation_id = $1 AND read_recipients NOT LIKE $3 AND SENDER_ID != $2;";
class chatHistory{
	constructor(options){
		this.PostGresDriver = PostGresDriver
	}

	fetchChatHistory(conversation_id, user_uid){
		return this.PostGresDriver.executeQuery({cql : FETCH_CHAT_HSTORY_CQL, keys:[conversation_id]})
			.then((data) => {
				return data;
			})
	}

	appendMessageToDB (message){
		return this.PostGresDriver.executeQuery({cql : APPEND_MSG_TO_HISTORY_CQL, keys:[message.conversation_id, message.sender_id, message.message_type, message.message, message.createdat_time, message.unread_status, '::']})
			.then((data)=>{
				logger.log("info", "Message has been appended to the table", message.conversation_id, message.sender_id);
			})
			.catch((data) => {
				logger.log("error", "Failed to append the message to table", message);
			})
	}

	resetUnreadCounter(conversation_id, user_name, isGroup){
		if(isGroup){
			let query = '%' + user_name + '%';
			return this.PostGresDriver.executeQuery({cql : RESET_GROUP_MESSAGE_COUNTER_CQL, keys : [conversation_id, user_name, query]})
			.catch((err) => {
				logger.log("error", "failed to reset the unread message status", err);
			})
		}
		return this.PostGresDriver.executeQuery({cql : RESET_MESSAGE_COUNTER_CQL, keys : [conversation_id, user_name]})
		.catch((err) => {
			logger.log("error", "failed to reset the unread message status", err);
		});
	}
}

let chatHistoryController = new chatHistory();

module.exports = chatHistoryController;
