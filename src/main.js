import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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
				<Route path ="/dashboard" render={(props) => (
					(!sessionStorage.getItem("user")) ? (
						<Redirect to ="/"/>
					):(<MainDashboard/>)
				)}/>
			</Switch>
            </BrowserRouter>
        </Provider>
    ), document.getElementById("app"));
};