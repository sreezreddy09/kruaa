var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use("/api", require("./server/routes/Routes.Main"));

//Using the static webpacked script files
app.use(express.static(__dirname + '/dist'));

//Routes all the server requests to the index page
app.use('*', function(request, response){
    response.sendFile(__dirname + "/dist/index.html");
});

//App opens localhost on 3000...
app.listen(port, function(){
    console.log("Application listening on port 3000....");
});