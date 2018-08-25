const PostGresDriver = require("../services/postgresDriver");
const logger = require("../services/logger");
let FETCH_CHATS_CQL = "SELECT conversation_id, users_bond, last_message, updated_time FROM CHAT_LIST WHERE LOWER(USERS_BOND) LIKE LOWER($1);";
let FETCH_CHAT_MEMBER_INFO_CQL = "SELECT USER_UID, FIRST_NAME, LAST_NAME FROM USER_INFO WHERE USER_NAME = $1;"
let FETCH_RECENT_CHAT_CQL = "SELECT MESSAGE, CREATEDAT_TIME FROM MESSAGES WHERE CONVERSATION_ID = $1 ORDER BY CREATEDAT_TIME DESC LIMIT 1;";
class chatList {
	constructor(options){
		this.PostGresDriver = PostGresDriver
	}

	fetchChatList (query){
		let regex = '%' + query + '%';
		return this.PostGresDriver.executeQuery({cql : FETCH_CHATS_CQL, keys:[regex]})
            .then((data) => {
				let chat_users = data.map((chat_member) => {
					let users = chat_member.users_bond.split("::");
					let user_name;
					if(users[0] === query){
						user_name = users[1];
					}else{
						user_name = users[0]
					}

					delete chat_member.users_bond;

					return this.PostGresDriver.executeQuery({cql : FETCH_CHAT_MEMBER_INFO_CQL, keys: [user_name]})
					.then((info) => {
						chat_member["user_uid"] = info[0]["user_uid"];
						chat_member["name"] = `${info[0]["first_name"]} ${info[0]["last_name"]}`;
						return this.PostGresDriver.executeQuery({cql : FETCH_RECENT_CHAT_CQL, keys: [chat_member.conversation_id]})
						.then((message) => {
							if(message.length){
								chat_member["last_message"] = message[0]["message"];
								chat_member["updated_time"] = message[0]["createdat_time"]
							}
							return chat_member;
						})
					}).catch((err) => {
						logger.log("error", "Error fetching the chat list", err);
						return err;
					});
				});

				return Promise.all(chat_users);
            });
	}
}

let chatListController = new chatList();

module.exports = chatListController;