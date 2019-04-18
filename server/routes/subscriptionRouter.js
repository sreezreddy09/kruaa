const express = require("express");
const logger = require("../services/logger");
const subscriptionRouter = express.Router();
const subscriptionController = require('../controller/subscription');


subscriptionRouter.use("/save", (req, res) => {
    (typeof req.body === 'string')? (reqBody = JSON.parse(req.body)) : (reqBody = req.body);
    subscriptionController.saveUserSubscription(reqBody.user, reqBody.subscription).then((data) => {
        logger.log("info", "Notification subscription for user has been saved successfully");
        res.status(200).send(data);
    }).catch((err) => {
        logger.log('error', "Failed to save user subscription", err);
        res.status(400).send({
            status : false,
            msg : "faild to save user subscription"
        });
    });
})

module.exports = subscriptionRouter;

