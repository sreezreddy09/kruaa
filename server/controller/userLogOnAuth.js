var pg = require("pg");
require('dotenv').config();

function userSignIn(param){
    var client = new pg.Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        ssl: process.env.DB_SSL
    });
    client.connect().then(function(){
        // console.log("Connected to Database and computing the queries");
    }).catch(function(err){
        console.log("connection error", err);
    });

    return new Promise(function(resolve, reject){
        client.query("SELECT * FROM USERINFO WHERE USER_NAME = $1 AND PASSWORD = $2;", [param.user_name, param.password], function(err, res){
            err && reject(err);
            res && resolve(JSON.stringify(res.rows));
            client.end();
        });

    })

};

function createUserWithSignOn(param){
    var client = new pg.Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        ssl: process.env.DB_SSL
    });
    client.connect().then(function(){
        // console.log("Connected to Database and computing the queries");
    }).catch(function(err){
        console.log("connection error", err);
    });
    return new Promise(function(resolve, reject){
        if(param.key === process.env.LOGIN_KEY){
            client.query("INSERT INTO USERINFO (NAME, USER_NAME, PASSWORD) VALUES ($1, $2, $3);", [param.name, param.user_name, param.password], function(err, res){
                err && reject(err);
                res && resolve(JSON.stringify(res.rows));
                client.end();
            })
        }else{
            reject({reason: "login_key"});
        }
    })
}

module.exports = {
    userSignIn : userSignIn,
    createUserWithSignOn : createUserWithSignOn
}