var express = require("express");
var app = express();
var MainRouter = express.Router();
var dbserver = require("../controller/userLogOnAuth");


MainRouter.use("/auth/login", function(req, res){
    dbserver.userSignIn(req.query).then(function(data){
        res.send(data);
    }).catch(function(err){
        console.log(err);
        res.status(500).send(err);
    });
});

MainRouter.use("/auth/logon", function(req, res){
    dbserver.createUserWithSignOn(req.query).then(function(data){
        res.send(data);
    }).catch(function(err){
        console.log("ERROR ON SIGN ON", err);
        res.status(400).send(err);
    });
});


module.exports = MainRouter;