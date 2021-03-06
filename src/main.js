import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from "react-redux";
import configureStore from "./stores/ConfigureStore.js";
import LoginPageContainer  from "./components/login/LoginPageContainer";
import MainDashboard from "./components/dashboard/MainDashboard.container";

export const store = configureStore();
window.onload = function(){
    initServiceWorker()
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

function initServiceWorker () {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        return;
    }

    navigator.serviceWorker.register("./service-worker.js").then((swRegistration) => {
        console.log("Successfully registered service-worker", Notification.permission);
    }).catch((err) => {
        console.log("Failed to register the service worker", err);
    })
}