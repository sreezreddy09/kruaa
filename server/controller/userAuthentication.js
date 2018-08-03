const PostGresDriver = require("../services/postgresDriver");
let USER_LOGIN_CQL = "SELECT * FROM USER_INFO WHERE USER_NAME = $1 AND PASSWORD = $2;"; 
let USER_FETCH_CQL = "SELECT * FROM USER_INFO WHERE user_uid = $1;";
let USER_SIGNON_CQL = "INSERT INTO USER_INFO (NAME, USER_NAME, PASSWORD) VALUES ($1, $2, $3);";

class UserAuth {
    constructor (options){
        this.PostGresDriver = PostGresDriver;
        return this;
    }

    userSignIn(param){
        return this.PostGresDriver.executeQuery({cql : USER_LOGIN_CQL, keys : [param.user_name, param.password]})
            .then((data) => {
                let user_record = {
                    user_uid : data[0]["user_uid"],
                    user_name : data[0]["user_name"],
                    email_id : data[0]["email_id"],
                    name : `${data[0]["first_name"]} ${data[0]["last_name"]}`
                }
                return user_record;
            });
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

    userSignOn(param){
        if(param.key === process.env.LOGIN_KEY){
            return this.PostGresDriver.executeQuery({cql: USER_SIGNON_CQL, keys : [param.name, param.user_name, param.password]})
                .then((data) => {
                    return data;
                });
        }else{
            return Promise.reject({reason: "login_key"});
        }
    }

}

let UserAuthController = new UserAuth();
module.exports = UserAuthController;