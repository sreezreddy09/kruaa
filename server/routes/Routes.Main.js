var express = require("express");
var MainRouter = express.Router();

MainRouter.use("/auth", require("./authRouter.js"));

MainRouter.use("/users", require("./userSearchRouter"));

MainRouter.use("/chat-list", require("./chatListRouter"));

MainRouter.use("/chat-history", require("./chatHistoryRouter"));

MainRouter.use("/request", require("./userRequestRouter"));

MainRouter.use("/subscription", require("./subscriptionRouter"));

module.exports = MainRouter;