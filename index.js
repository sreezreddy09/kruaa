var express = require('express');
var app = express();

//Loads the index page
app.get('/', function(request, response){
    return response.sendFile(__dirname + "/dist/index.html");
});

//Using the static webpacked script files
app.use(express.static(__dirname + '/dist'));

//App opens localhost on 3000...
app.listen(3000, function(){
    console.log("Application listening on port 3000....");
});