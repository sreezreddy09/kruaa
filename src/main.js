import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import configureStore from "./stores/ConfigureStore.js";
import LoginPageContainer  from "./components/login/LoginPageContainer";
import MainDashboard from "./components/dashboard/MainDashboard.container";

const store = configureStore();
window.onload = function(){
    ReactDOM.render((
        <Provider store = {store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path = "/" component={LoginPageContainer} />
                    <Route path = "/dashboard" component ={MainDashboard}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    ), document.getElementById("app"));
};