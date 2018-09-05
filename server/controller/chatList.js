const PostGresDriver = require("../services/postgresDriver");
const logger = require("../services/logger");
let FETCH_CHATS_CQL = "SELECT conversation_id, users_bond, last_message, updated_time, group_name FROM CHAT_LIST WHERE LOWER(USERS_BOND) LIKE LOWER($1);";
FETCH_GROUP_CHAT_INFO_CQL  = "SELECT USER_UID, FIRST_NAME, LAST_NAME, USER_NAME FROM USER_INFO WHERE USER_NAME = ANY($1);";
let FETCH_CHAT_MEMBER_INFO_CQL = "SELECT USER_UID, FIRST_NAME, LAST_NAME FROM USER_INFO WHERE USER_NAME = $1;"
// let FETCH_RECENT_CHAT_CQL = "SELECT MESSAGE, CREATEDAT_TIME FROM MESSAGES WHERE CONVERSATION_ID = $1 ORDER BY CREATEDAT_TIME DESC LIMIT 1;";
let FETCH_RECENT_CHAT_CQL = "SELECT MESSAGE, CREATEDAT_TIME, X.UNREAD_COUNT FROM MESSAGES, (SELECT COUNT(*) AS UNREAD_COUNT FROM MESSAGES WHERE unread_status = 'true' and conversation_id = $1 and sender_id != $2) AS X WHERE CONVERSATION_ID = $1 ORDER BY CREATEDAT_TIME DESC LIMIT 1;";

let FETCH_RECENT_GROUP_CHAT_CQL = "SELECT MESSAGE, CREATEDAT_TIME, X.UNREAD_COUNT FROM MESSAGES, (SELECT COUNT(*) AS UNREAD_COUNT FROM MESSAGES WHERE conversation_id = $1 and sender_id != $2 and lower(read_recipients) not like lower($3)) AS X WHERE CONVERSATION_ID = $1 ORDER BY CREATEDAT_TIME DESC LIMIT 1;";

let chat_colors = ["#6585ff", "#f58787", "#91ab01", "#e542a3", "#029d00","#ffa97a", "#dfb610", "#b04632", "#fd85d4", "#ba33dc", "#fe7c7f", "#029d00", "#ef4b4f", "#c90379", "#b4876e", "#3bdec3", "#ff8f2c", "#8393ca", "#59d368", "#8b7add", "#1f7aec", "#6bcbef", "#35cd96"];

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
					if(users.length > 2){
						return this.FetchGroupChatInfo(chat_member, users, query);
					}else{
						(users[0] === query) ? (user_name = users[1]):(user_name = users[0]);
					}

					delete chat_member.users_bond;
					delete chat_member.group_name;

					return this.PostGresDriver.executeQuery({cql : FETCH_CHAT_MEMBER_INFO_CQL, keys: [user_name]})
					.then((info) => {
						chat_member["user_uid"] = info[0]["user_uid"];
						chat_member["name"] = `${info[0]["first_name"]} ${info[0]["last_name"]}`;
						chat_member["unread_count"] = 0
						return this.PostGresDriver.executeQuery({cql : FETCH_RECENT_CHAT_CQL, keys: [chat_member.conversation_id, query]})
						.then((message) => {
							if(message.length){
								chat_member["last_message"] = message[0]["message"];
								chat_member["updated_time"] = message[0]["createdat_time"]
								chat_member["unread_count"] = Number(message[0]["unread_count"])
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

	FetchGroupChatInfo(chat_member, users, query){
		let chat_users = users.filter((d) => d !== query);
		let search_query = '%' + query + '%';

		return this.PostGresDriver.executeQuery({cql : FETCH_GROUP_CHAT_INFO_CQL, keys : [chat_users]})
		.then((info) => {
			chat_member["user_uid"] = chat_member["conversation_id"];
			chat_member["name"] = chat_member["group_name"];
			chat_member["users"] = info.map((d, i) => {
				let user = {};
				user["user_uid"] = d["user_uid"];
				user["user_name"] = d["user_name"];
				user["name"] = `${d["first_name"]} ${d["last_name"]}`;
				user["color"] = chat_colors[i]
				user["unread_count"] = 0
				return user;
			})
			delete chat_member["users_bond"];
			return this.PostGresDriver.executeQuery({cql : FETCH_RECENT_GROUP_CHAT_CQL, keys: [chat_member.conversation_id, query, search_query]})
			.then((message) => {
				if(message.length){
					chat_member["last_message"] = message[0]["message"];
					chat_member["updated_time"] = message[0]["createdat_time"];
					chat_member["unread_count"] = Number(message[0]["unread_count"]);
				}
				return chat_member;
			}).catch((err) => {
				logger.log("error", "Error fetching the chat list", err);
				throw err;
			})
		})
	}
}

let chatListController = new chatList();

module.exports = chatListController;