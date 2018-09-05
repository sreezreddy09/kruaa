let USER_LOGIN_CQL = "SELECT * FROM USER_INFO WHERE USER_NAME = $1;"; 
let USER_FETCH_CQL = "SELECT * FROM USER_INFO WHERE user_uid = $1;";
let USER_SIGNON_CQL = "INSERT INTO USER_INFO (user_name, email_id, first_name, last_name, password, time_created) VALUES ($1, $2, $3, $4, $5, $6);";

const bcrypt = require("bcrypt");
const PostGresDriver = require("../services/postgresDriver");
const http_request = require("../services/http_request");
const logger = require("../services/logger.js");

class UserAuth {

    constructor (options) {
        this.PostGresDriver = PostGresDriver;
        return this;
    }

    userSignIn(param){
        return this.PostGresDriver.executeQuery({cql : USER_LOGIN_CQL, keys : [param.user_name]})
            .then((data) => {
                if(!data.length) throw {reason : "user_name didn't match"};
                if(!bcrypt.compareSync(param.password, data[0]["password"])) throw {reason : "Password mismatch"};
                let user_record = {
                    user_uid : data[0]["user_uid"],
                    user_name : data[0]["user_name"],
                    email_id : data[0]["email_id"],
                    name : `${data[0]["first_name"]} ${data[0]["last_name"]}`
                }
                return user_record;
            }).catch((err) => {
                logger.log("error", "Error in signing user in", err);
                throw err;
            })
    }

    fetchUser (param){
        return this.PostGresDriver.executeQuery({cql : USER_FETCH_CQL, keys : [param]})
            .then((data) => {
                let user_record = {
                    user_uid : data[0]["user_uid"],
                    user_name : data[0]["user_name"],
                    email_id : data[0]["email_id"],
                    name : `${data[0]["first_name"]} ${data[0]["last_name"]}`
                }
                return [user_record];
            });
    }

    async userSignOn (param) {
        if(param.key !== process.env.LOGIN_KEY) return Promise.reject({reason: "login_key didn't match"});
        if(param.user_name.length < 5) return Promise.reject({reason : "username must be atleast 5 charecters"});
        if(param.password.length < 5) return Promise.reject({reason : "password must be atleast 5 charecters"});

        let hash = await bcrypt.hash(param.password, 10);
        let emailVerify = await http_request.get("https://emailverification.whoisxmlapi.com/api/v1?apiKey="+ process.env.EMAIL_API_KEY +"&emailAddress=" + param.email);

        if(emailVerify.dnsCheck !== "true" || emailVerify.smtpCheck !== "true") return Promise.reject({reason : "Email address is invalid"});

        return this.PostGresDriver.executeQuery({cql: USER_SIGNON_CQL, keys : [param.user_name, param.email, param.first_name, param.last_name, hash, Date.now()]}).then(() => {
             return {
                status : true,
                message : "User sign on completed successfully"
            };
        }).catch((err) => {
            logger.log("error", "Error inserting user log on information to table", err);
            throw {reason : "Error in creating user"};
        })
    }

}

let UserAuthController = new UserAuth();
module.exports = UserAuthController;