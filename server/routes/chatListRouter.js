const express = require("express");
const logger = require("../services/logger");
const chatListController = require("../controller/chatList");
const chatListRouter = express.Router();

chatListRouter.use("/fetch", (req, res) => {
    chatListController.fetchChatList(req.query.user_name).then((data) => {
        data.sort((a, b) => {
            return b.updated_time - a.updated_time;
        })
        res.status(200).send(data);
    }).catch((err) => {
        logger.info("ERROR IN FETCHING CONTACTS FORM DB", err);
        res.status(400).send(err);
    })
});

module.exports = chatListRouter;