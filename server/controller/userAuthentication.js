const PostGresDriver = require("../services/postgresDriver");
let USER_LOGIN_CQL = "SELECT * FROM USERINFO WHERE USER_NAME = $1 AND PASSWORD = $2;"; 
let USER_FETCH_CQL = "SELECT * FROM USERINFO WHERE id = $1;";
let USER_SIGNON_CQL = "INSERT INTO USERINFO (NAME, USER_NAME, PASSWORD) VALUES ($1, $2, $3);";

class UserAuth {
    constructor (options){
        this.PostGresDriver = PostGresDriver;
        return this;
    }

    userSignIn(param){
        return this.PostGresDriver.executeQuery({cql : USER_LOGIN_CQL, keys : [param.user_name, param.password]})
            .then((data) => {
                return data;
            });
    }

    fetchUser (param){
        return this.PostGresDriver.executeQuery({cql : USER_FETCH_CQL, keys : [param]})
            .then((data) => {
                return data;
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