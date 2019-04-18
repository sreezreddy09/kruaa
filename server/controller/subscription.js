const PostGresDriver = require("../services/postgresDriver");
const logger = require("../services/logger.js");
const webPush = require('web-push');
require("dotenv").config();

webPush.setVapidDetails(process.env.PUSH_EMAIL, process.env.PUSH_PUBLIC_KEY, process.env.PUSH_PRIVATE_KEY);

const INSERT_SUBSCRIPTION_CQL = "INSERT INTO subscription ( user_name, subscription ) VALUES ($1, $2);";
const DELETE_SUBSCRIPTION_CQL = "DELETE FROM subscription WHERE user_name = $1;";
const FETCH_USER_LIST_CQL = "SELECT users_bond FROM chat_list WHERE conversation_id = $1;";
const FETCH_SUBSCRIPTION_CQL = "SELECT subscription FROM subscription WHERE user_name = $1;";

class subscriptionController {
    constructor (options) {
        this.PostGresDriver = PostGresDriver;
        return this;
    }

    saveUserSubscription (user_info, subscription) {
        logger.log("info", "inside saveUserSubscription Method");
        if(subscription) {
            return this.PostGresDriver.executeQuery({cql : INSERT_SUBSCRIPTION_CQL, keys : [user_info.user_name, subscription]})
                .then((data) => {
                    return {
                        "success" : true,
                        "message" : "Subscription was added successfully"
                    }
                }).catch((err) => {
                    logger.log("error", "failed to insert subscription into db", err);
                    return err;
                })
        }else{
            return this.PostGresDriver.executeQuery({cql : DELETE_SUBSCRIPTION_CQL, keys : [user_info.user_name]})
                .then((data) => {
                    return {
                        "success" : true,
                        "message" : "Subscription was deleted successfully"
                    }
                }).catch((err) => {
                    logger.log("error", "failed to delete subscription into db", err);
                    return err;
                })
        }
    }

    async notifyUsers (info) {
        let users_list = await this.PostGresDriver.executeQuery({cql : FETCH_USER_LIST_CQL, keys : [info.conversation_id]});
        let users_bond = users_list[0].users_bond.split("::").filter((d) => d != info.sender_id);
        users_bond.map(async (user) => {
            let subscription =  await this.PostGresDriver.executeQuery({cql : FETCH_SUBSCRIPTION_CQL, keys : [user]})
            if(subscription.length && subscription[0].subscription) {
                try {
                    let parsed_subscription = JSON.parse(subscription[0].subscription);
                    webPush.sendNotification(parsed_subscription, info.message);
                } catch (err) {
                    logger.log("error", "error in sending notification", err);
                }
            }
        })
    }
}

let SUBSCRIPTION_CONTROLLER = new subscriptionController();

module.exports = SUBSCRIPTION_CONTROLLER;