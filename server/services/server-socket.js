
const socketio = require("socket.io");
const logger = require("../services/logger");
const chatHistoryController = require("../controller/chatHistory");
const userSearchController = require("../controller/userSearch.js");
const chatListController = require("../controller/chatList");
const subscriptionController = require('../controller/subscription');

module.exports.listen = (app) => {

	let io = socketio.listen(app);
	let chat_socket = io.of("/users");
	let rooms = [];

	chat_socket.on("connection", (socket) => {

		socket.on("join", (data) => {
			logger.info("Creating chat room for user", data);
			let clientInfo = {};
			clientInfo["socket_id"] = socket.id;
			clientInfo["room_id"] = data;
			rooms.push(clientInfo);
			socket.join(data);
		});

		socket.on("new message", (data) => {
			socket.to(data.user).emit('new message', data.message);
			subscriptionController.notifyUsers(data.message);
			chatHistoryController.appendMessageToDB({...data.message, unread_status : 'true'});
		})

		socket.on("chat profile", (data) => {
			socket.to(data.user).emit("chat profile", data.info);
		});

		socket.on("friend request", (data) => {
			socket.to(data.user).emit("friend request", data.user_info);
		})

		socket.on("reset unread count", (data) => {
			chatHistoryController.resetUnreadCounter(data.conversation_id, data.user_name, data.isGroup);
		});
		socket.on("create group", async (data) => {
			let group_info = await userSearchController.createNewGroup(data.group_name, data.group_users);
			let users = group_info[0].users_bond.split("::");
			let chat_profile = await chatListController.FetchGroupChatInfo(group_info[0], users, data.user_name, false);
			chat_profile.users.forEach((user) => {
				chat_socket.to(user.user_uid).emit("create group", chat_profile);
			});
		})

		socket.on("update group", async (data) => {
			let group_info = await userSearchController.updateUserGroup(data.group_id, data.group_users);
			let users = group_info[0].users_bond.split("::");
			let chat_profile = await chatListController.FetchGroupChatInfo(group_info[0], users, data.user_name, false);
			chat_profile.users.forEach((user) => {
				chat_socket.to(user.user_uid).emit("update group", chat_profile);
			});
		});

		socket.on("delete group users", (data) => {
			data.deleted_users.forEach((user) => {
				socket.to(user).emit("delete group users", data.group_id);
			});
		})

		socket.on("disconnect", (reason) => {
			logger.log("info", "socket disconnected", reason);
			rooms = rooms.filter((info) => {
				return info.socket_id !== socket.id;
			});
			socket.disconnect(true);
		});

		socket.on("error", (reason) => {
			logger.log("info", "socket error", reason);
		});

	});

	return io;
}