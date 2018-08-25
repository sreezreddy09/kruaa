const express = require("express");
const logger = require("../services/logger");
const userRequestController = require("../controller/userRequest");
const userRequestRouter = express.Router();

userRequestRouter.post("/add", (req, res) => {

	userRequestController.addUserRequest(req.body.chatter_uid, req.body.user_name).then((data) => {
        res.send(data);
    }).catch((err) => {
        logger.info("ERROR in searching user from DB", err);
        res.status(400).send(err);
	});
})

userRequestRouter.post("/update", (req, res) => {
	
	userRequestController.updateUserRequest(req.body.chatter_uid, req.body.user_name, req.body.accept_status).then((data) => {
		res.send(data);
	}).catch((err) => {
		logger.log("Error in updatinf user request to table", err);
		res.status(400).send(err);
	})
})

userRequestRouter.get("/fetch-my-approvals", (req, res) => {
	userRequestController.fetchMyApprovals(req.query.user_name).then((data) => {
		res.send(data);
	}).catch((err) => {
		logger.log("Error in fetch user approvals", err);
		res.status(400).send(err);
	})
})

module.exports = userRequestRouter;