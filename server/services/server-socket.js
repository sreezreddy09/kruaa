
const socketio = require("socket.io");
const logger = require("../services/logger");
const chatHistoryController = require("../controller/chatHistory");

module.exports.listen = (app) => {

	let io = socketio.listen(app);
	let users = io.of("/users");
	let rooms = [];

	users.on("connection", (socket) => {

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

		socket.on("disconnect", (reason) => {
			logger.log("info", "socket disconnected", reason);
			rooms = rooms.filter((info) => {
				return info.socket_id !== socket.id;
			})
			socket.disconnect(true);
		});

		socket.on("error", (reason) => {
			logger.log("info", "socket error", reason);
		});

	});

	return io;
}