var React = require("react");
var ReactDOM = require('react-dom');
import { BrowserRouter, Switch, Route } from 'react-router-dom';

var LoginPage = require("./components/login/LoginPage");
var MainDashboard = require("./components/dashboard/MainDashboard");


window.onload = function(){
    ReactDOM.render((
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component={LoginPage} />
                <Route path = "/dashboard" component ={MainDashboard} />
            </Switch>
        </BrowserRouter>
    ), document.getElementById("app"));
};