const PostGresDriver = require("../services/postgresDriver");
let SEARCH_USERS_CQL = "SELECT NAME, USER_NAME FROM USERINFO WHERE LOWER(NAME) LIKE LOWER($1);";


class userSearch {
	constructor (options){
		this.PostGresDriver = PostGresDriver
	}

	searchUser(query){
        var regex = query + '%';
        return this.PostGresDriver.executeQuery({cql: SEARCH_USERS_CQL, keys: [regex]})
            .then((data) => {
                return data;
            });
    }
}

let userSearchController = new userSearch();

module.exports = userSearchController;