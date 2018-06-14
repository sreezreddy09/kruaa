const express = require("express");
const logger = require("../services/logger");
const userAuthController = require("../controller/userAuthentication");
const authRouter = express.Router();

authRouter.use("/login", (req, res) => {
	userAuthController.userSignIn(req.query).then((data) => {
        req.session["user_id"] = data[0].id;
        res.send(data);
    }).catch((err) => {
        logger.error("Error in signing in the user", err);
        res.status(401).send(err);
    });
});

authRouter.use("/logon", (req, res) => {
	userAuthController.userSignOn(req.query).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log("ERROR ON SIGN ON", err);
        res.status(400).send(err);
    });
});

authRouter.use("/fetchUser", (req, res) => {
	if(!req.session["user_id"]){
        return res.status(401).send("Session expired");
    };

    userAuthController.fetchUser(req.session["user_id"]).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        logger.error("Failed to fetch user info", req.session.user_id)
        res.status(401).send(err);
    });
});

module.exports = authRouter;