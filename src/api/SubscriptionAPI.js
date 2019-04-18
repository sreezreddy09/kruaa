const axios = require('axios');

function addSubscription (subscriptionInfo) {
    return axios.post("/api/subscription/save", subscriptionInfo)
}


module.exports = {
    addSubscription : addSubscription
}