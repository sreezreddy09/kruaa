const PostGresDriver = require("../services/postgresDriver");

let SEARCH_USER_CQL = "SELECT USER_NAME FROM USER_INFO WHERE USER_UID = $1;";
let ADD_REQUEST_CQL = "INSERT INTO FRIEND_REQUESTS (USERS_BOND, REQUEST_STATUS, STATUS_TIME, SENDER) VALUES ($1, $2, $3, $4) ON CONFLICT (USERS_BOND) DO UPDATE SET REQUEST_STATUS = $2, STATUS_TIME = $3, SENDER = $4;"
let UPDATE_REQUEST_CQL = "UPDATE FRIEND_REQUESTS SET REQUEST_STATUS = $2, STATUS_TIME = $3 WHERE USERS_BOND = $1;";
let FETCH_APPROVALS_CQL = "SELECT sender, request_status FROM friend_requests WHERE LOWER(users_bond) LIKE LOWER($1);";
let FETCH_USERINFO_CQL = "SELECT user_uid, first_name, last_name FROM user_info WHERE user_name = $1;";
let CREATE_CONVERSATION_ID_CQL = "INSERT INTO chat_list (users_bond, last_message, created_time, updated_time) VALUES ($1, $2, $3, $4) RETURNING conversation_id, updated_time;"

class userRequest {

	constructor (options){
		this.PostGresDriver = PostGresDriver
	}

	addUserRequest (chatter_uid, user_name) {
		return this.PostGresDriver.executeQuery({cql : SEARCH_USER_CQL, keys : [chatter_uid]})
		.then((data) => {
			let users_bond = [data[0].user_name, user_name].sort().join("::");

			return this.PostGresDriver.executeQuery({cql : ADD_REQUEST_CQL, keys : [users_bond, "pending", Date.now(), user_name]})
			.then((info) => {
				return {
					"status" : true,
					"message" : "request sent successfully"
				}
			}).catch((err) => {
				throw err;
			}).catch((err) => {
				throw err;
			});

		})
	}

	updateUserRequest (chatter_uid, user_name, accept_status){
		return this.PostGresDriver.executeQuery({cql : SEARCH_USER_CQL, keys : [chatter_uid]})
		.then((data) => {
			let users_bond = [data[0].user_name, user_name].sort().join("::");
			if(accept_status){
				return this.PostGresDriver.executeQuery({cql : UPDATE_REQUEST_CQL, keys : [users_bond, "success", Date.now()]})
				.then((info) => {
					return this.PostGresDriver.executeQuery({cql : CREATE_CONVERSATION_ID_CQL, keys : [users_bond, "Welcome to Kruaa", Date.now(), Date.now()]})
					.then((info) => {
						let chat_info = {
							"conversation_id" : info[0].conversation_id,
							"user_uid" : chatter_uid,
							"last_message" : "Welcome to Kruaa",
							"updated_time" : info[0].updated_time
						}
						return {
							"status" : true,
							"chat_info" : chat_info
						}
					}).catch((err) => {
						throw err;
					})
				}).catch((err) => {
					throw err;
				})
			}else{
				return this.PostGresDriver.executeQuery({cql : UPDATE_REQUEST_CQL, keys : [users_bond, "none", Date.now()]})
				.then((info) => {
					return {
						"status" : true,
						"message" : "Request updated successfully"
					}
				}).catch((err) => {
					throw err;
				})
			}
		}).catch((err) => {
			throw err;
		})
	}

	fetchMyApprovals(user_name){
		let regex = '%' + user_name + '%';
		return this.PostGresDriver.executeQuery({cql : FETCH_APPROVALS_CQL , keys : [regex]}).then((data) => {
			if(!data.length) return data;

			let users = data.filter((d) => {
				return d.request_status == "pending" && d.sender != user_name
			});

			let approvals = users.map((member) => {
				let user = {};
				return this.PostGresDriver.executeQuery({cql : FETCH_USERINFO_CQL, keys : [member.sender]})
					.then((info) => {
						user["user_uid"] = info[0]["user_uid"];
						user["name"] = `${info[0]["first_name"]} ${info[0]["last_name"]}`
						return user;
					}).catch((err) => {
						throw err;
					});
			})

			return Promise.all(approvals);

		})
	}
}

let userSearchController = new userRequest();

module.exports = userSearchController;