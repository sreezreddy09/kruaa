const express = require("express");
const logger = require("../services/logger");
const chatHistoryController = require("../controller/chatHistory");
const chatHistoryRouter = express.Router();

chatHistoryRouter.use("/fetch", (req, res) => {    
    chatHistoryController.fetchChatHistory(req.query.conversation_id, req.query.user_uid).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        logger.info("ERROR IN FETCHING CONTACTS FORM DB", err);
        res.status(400).send(err);
    })
});

module.exports = chatHistoryRouter;