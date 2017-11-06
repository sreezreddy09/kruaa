var React = require("react");
var ReactDOM = require('react-dom');

var App = require("./components/App.js");

window.onload = function(){
    ReactDOM.render(
        <App />, document.getElementById("app")
    );
};