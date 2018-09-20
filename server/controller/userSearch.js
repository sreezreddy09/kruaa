const PostGresDriver = require("../services/postgresDriver");
const logger = require("../services/logger");
let SEARCH_USERS_CQL = "SELECT USER_UID, FIRST_NAME, LAST_NAME, USER_NAME FROM USER_INFO WHERE LOWER(FIRST_NAME) LIKE LOWER($1) OR LOWER(LAST_NAME) LIKE LOWER($1);";

let SEARCH_REQUESTS_CQL = "SELECT * FROM FRIEND_REQUESTS WHERE USERS_BOND = $1;";

let FETCH_FRIENDS_CQL = "SELECT USER_UID, FIRST_NAME, LAST_NAME, USER_NAME FROM USER_INFO;";

let FETCH_USERS_CQL = "SELECT * FROM USER_INFO WHERE USER_UID = ANY($1);";

let CREATE_NEW_GROUP_CQL = "INSERT INTO CHAT_LIST (users_bond, last_message, created_time, updated_time, group_name) VALUES ($1, $2, $3, $4, $5) RETURNING conversation_id, users_bond, last_message, updated_time, group_name;";

let UPDATE_USER_GROUP_CQL = "UPDATE CHAT_LIST SET users_bond = $2 WHERE conversation_id = $1 RETURNING conversation_id, users_bond, last_message, updated_time, group_name;";


class userSearch {
	constructor (options){
		this.PostGresDriver = PostGresDriver
	}

	searchUser(query, user_name){
        var regex = query + '%';
        return this.PostGresDriver.executeQuery({cql: SEARCH_USERS_CQL, keys: [regex]})
            .then((data) => {
                let searchResults = data.filter((d) => d.user_name !== user_name);
                let users = searchResults.map((member) => {
                    let user = {
                        "user_uid" : member.user_uid,
                        "name" : `${member.first_name} ${member.last_name}`
                    };
                    
                    let users_bond = [user_name, member.user_name].sort().join("::");  
                    return this.PostGresDriver.executeQuery({cql : SEARCH_REQUESTS_CQL, keys : [users_bond]})
                        .then((info) => {
                            if(info.length){
                                user["status"] = info[0]["request_status"];
                            }else {
                                user["status"] = "none";
                            }
                            return user;
                        }).catch((err) => {
                            logger.log("error","error in searching user", err);
                            return err;
                        })
               })

               return Promise.all(users);
            });
    }

    fetchGroupUsers(user_name){
        return this.PostGresDriver.executeQuery({cql : FETCH_FRIENDS_CQL})
            .then((data) => {
                let searchResults = data.filter((d) => d.user_name !== user_name);
                let users = searchResults.map((member) => {
                    let user = {
                        "user_uid" : member.user_uid,
                        "name" : `${member.first_name} ${member.last_name}`
                    };
                    return user;
                });
                return Promise.all(users);
            })
    }

    async createNewGroup (group_name, group_users) {
        let users = group_users.map((user) => {
            return user.user_uid;
        })
        let user = await this.PostGresDriver.executeQuery({cql : FETCH_USERS_CQL, keys: [users]});
        let users_bond = user.map((d) => {
            return d.user_name;
        }).sort().join("::");
        return this.PostGresDriver.executeQuery({cql : CREATE_NEW_GROUP_CQL, keys: [users_bond, "Welcome to Kruaa", Date.now(), Date.now(), group_name]})
        .then((data) => {
            if(data.length){
                return data
            }

        })
    }

    async updateUserGroup (group_id, group_users) {
        let users = group_users.map((user) => {
            return user.user_uid;
        })
        let user = await this.PostGresDriver.executeQuery({cql : FETCH_USERS_CQL, keys: [users]});
        let users_bond = user.map((d) => {
            return d.user_name;
        }).sort().join("::");
        return this.PostGresDriver.executeQuery({cql : UPDATE_USER_GROUP_CQL, keys: [group_id, users_bond]})
        .then((data) => {
            return data;
        })
    }
}

let userSearchController = new userSearch();

module.exports = userSearchController;