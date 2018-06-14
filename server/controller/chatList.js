const PostGresDriver = require("../services/postgresDriver");
let FETCH_CHATS_CQL = "SELECT * FROM USERINFO;";

class chatList {
	constructor(options){
		this.PostGresDriver = PostGresDriver
	}

	fetchChatList (){
		return this.PostGresDriver.executeQuery({cql : FETCH_CHATS_CQL})
            .then((data) => {
                return data;
            });
	}
}

let chatListController = new chatList();

module.exports = chatListController;