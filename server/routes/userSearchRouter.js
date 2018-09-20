const express = require("express");
const logger = require("../services/logger");
const userSearchController = require("../controller/userSearch");
const contactsRouter = express.Router();

contactsRouter.use("/search", (req, res) => {
    if(!req.query.q){
        return res.send([]);
    }

    userSearchController.searchUser(req.query.q, req.query.user).then((data) => {
        res.send(data);
    }).catch((err) => {
        logger.info("ERROR in searching user from DB", err);
        res.status(400).send(err);
    });
});

contactsRouter.use("/group", (req, res) => {
    userSearchController.fetchGroupUsers(req.query.user).then((data) => {
        res.send(data);
    }).catch((err) => {
        logger.info("ERROR in searching user from DB", err);
        res.status(400).send(err);
    });
})

module.exports = contactsRouter;

