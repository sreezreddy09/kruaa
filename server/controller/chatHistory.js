const PostGresDriver = require("../services/postgresDriver");
const logger = require("../services/logger");
const FETCH_CHAT_HSTORY_CQL = "SELECT conversation_id, sender_id, message_type, message, createdat_time FROM messages WHERE conversation_id = $1 ORDER BY CREATEDAT_TIME ASC;";
const APPEND_MSG_TO_HISTORY_CQL = "INSERT INTO messages (conversation_id, sender_id, message_type, message, createdat_time) VALUES ($1, $2, $3, $4, $5);";

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
		return this.PostGresDriver.executeQuery({cql : APPEND_MSG_TO_HISTORY_CQL, keys:[message.conversation_id, message.sender_id, message.message_type, message.message, message.createdat_time]})
			.then((data)=>{
				logger.log("info", "Message has been appended to the table", message.conversation_id, message.sender_id);
			})
			.catch((data) => {
				logger.log("error", "Failed to append the message to table", message);
			})
	}
}

let chatHistoryController = new chatHistory();

module.exports = chatHistoryController;
