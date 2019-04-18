const express = require('express');
const app = express();
const session = require("express-session");
const uuidv4 = require("uuid/v4");
const responseTime = require('response-time');
const port = process.env.PORT || 3000;
const logger = require("./server/services/logger.js");


const server = require("http").createServer(app);
const io = require("./server/services/server-socket").listen(server);

//Disable the 'x-powered-by' header from xss attacks
app.disable("x-powered-by");

app.use(express.json());

//Using the static webpacked script files
app.use(express.static(__dirname + '/dist'));

//Maintain stateless login sessions for each user
app.use(session({
    genid: () => {
        return uuidv4()
    },
    secret: "fgfhgroiueriteghdf",
    resave: false,
    saveUninitialized: false,
    name: "id",
    cookie:{maxAge: 18000000, httpOnly:true, secure: false}
}));

//Logging the access requests from the client
app.use((req, res, next) => {
    logger.info(`Access Logs:: ${req.method}::${req.url}::${req.session.user_id}`);
    next();
});

//Logging the response time for each api call
app.use(responseTime((req, res, time) => {
    logger.info(`Response Time: ${req.method}::${req.originalUrl}::${time} ms`);
}))

//Route the api calls to Main Router
app.use("/api", require("./server/routes/Routes.Main"));


//Routes all the server requests to the index page
app.get("/service-worker.js", (request, response) => {
    response.sendFile(__dirname +"/dist/service-worker.js");
});
app.use('*', (request, response) => {
    response.sendFile(__dirname + "/dist/index.html");
});


//App opens localhost on 3000...
server.listen(port, () => {
    logger.info("webserver", `Application listening on port ${port}....`);
});

module.exports = server;