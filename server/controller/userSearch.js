const PostGresDriver = require("../services/postgresDriver");
const logger = require("../services/logger");
let SEARCH_USERS_CQL = "SELECT USER_UID, FIRST_NAME, LAST_NAME, USER_NAME FROM USER_INFO WHERE LOWER(FIRST_NAME) LIKE LOWER($1) OR LOWER(LAST_NAME) LIKE LOWER($1);";

let SEARCH_REQUESTS_CQL = "SELECT * FROM FRIEND_REQUESTS WHERE USERS_BOND = $1;";


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
}

let userSearchController = new userSearch();

module.exports = userSearchController;