
const socketio = require("socket.io");
const logger = require("../services/logger");
const chatHistoryController = require("../controller/chatHistory");

module.exports.listen = (app) => {

	let io = socketio.listen(app);
	let users = io.of("/users");

	users.on("connection", (socket) => {

		socket.on("join", (data) => {
			logger.info("Creating chat room for user", data);
			socket.join(data);
		})

		socket.on("new message", (data) => {
			socket.to(data.user).emit('new message', data.message);
			chatHistoryController.appendMessageToDB(data.message);
		})

		socket.on("chat profile", (data) => {
			socket.to(data.user).emit("chat profile", data.info);
		});

		socket.on("friend request", (data) => {
			socket.to(data.user).emit("friend request", data.user_info);
		})

		socket.on("disconnect", (reason) => {
			logger.log("info", "socket disconnected", reason);
		});

		socket.on("error", (reason) => {
			logger.log("info", "socket error", reason);
		});

		socket.on("disconnecting", (reason) => {
			logger.log("info", "socket disconnecting", reason);
		});

	});

	return io;
}