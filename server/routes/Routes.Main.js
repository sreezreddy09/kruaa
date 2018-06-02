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

MainRouter.use("/auth/contacts/search", function(req, res){
    if(!req.query.q){
        return res.send([]);
    }
    dbserver.searchUser(req.query.q).then(function(data){
        res.send(data);
    }).catch(function(err){
        console.log("ERROR in searching user from DB", err);
        res.status(400).send(err);
    });
});

MainRouter.use("/auth/contacts", function(req, res){
    dbserver.fetchContactsList().then(function(data){
        res.send(data);
    }).catch(function(err){
        console.log("ERROR IN FETCHING CONTACTS FORM DB", err);
        res.status(400).send(err);
    })
});




module.exports = MainRouter;