var React = require("react");
var _ = require("lodash");
var SubscriptionAPI = require('../../api/SubscriptionAPI');

const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

var UserMenu = React.createClass({
    getInitialState : function () {
        return {
            showUserSettings : false,
            status : false
        }
    },
    componentWillMount : function () {
        this.fetchNotificationPermission();
    },
    render : function(){
        var user_name = (this.props.user_profile.user)?this.props.user_profile.user.name:"";
        return (
        <div className = "user-nav-right"> 
                <div className="user-dropdown" onClick = {this.displayUserSettings} >
                    <i className="fa fa-user-circle-o fa-lg user-logo" aria-hidden="true"></i>
                    <span>{_.startCase(_.toLower(user_name))}</span>
                    <i className="fa fa-caret-down"></i>
                </div>
                {
                    (this.state.showUserSettings)?(
                        <div className="user-settings">
                            <div className = "notification">
                                <div className="pretty p-switch p-fill">
                                    {
                                        (this.state.denied)?(<input type="checkbox" onChange={this.checkboxClicked} checked = {this.state.status} disabled/>):(<input type="checkbox" onChange={this.checkboxClicked} checked = {this.state.status} />)
                                    }
                                    <div className ="state p-success">
                                        <label> Push notifications </label>
                                    </div>
                                </div>
                            </div>
                            <div className="profile"> 
                                <label> Profile settings</label>
                            </div>
                            <div className="update-pwd"> 
                                <label> Change password</label>
                            </div>
                            <div className = "footer"> 
                                <label> Logout </label>
                            </div>
                        </div>
                    ):""
                }
        </div>);
    },
    displayUserSettings : function (event) {
        event.stopPropagation();
        this.setState({
            showUserSettings : !this.state.showUserSettings
        })
    },
    checkboxClicked : function (event) {        
        event.stopPropagation();
        this.updateUserSubscription(!this.state.status);
    },
    fetchNotificationPermission : function () {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            return this.setState({
                denied : true,
                status : false
            })
        }

        let permissionStatus = Notification.permission;
        if(permissionStatus === 'default') {
            return this.setState({
                status : false
            })
        }
        if(permissionStatus === 'granted') {
            return navigator.serviceWorker.ready.then((sw_instance) => {
                return sw_instance.pushManager.getSubscription().then((subscriptions) => {
                    if(subscriptions) {
                        return this.setState({
                            status : true
                        })
                    }
                    return this.setState({
                        status : false
                    })
                })
            })
        }

        if(permissionStatus === "denied") {
            return this.setState({
                denied : true,
                status : false
            })
        }
    },

    updateUserSubscription : function (status) {
        let permissionStatus = Notification.permission;
        
        if(status && permissionStatus === "granted") {
            return this.subscribeUser(true);
        }
        
        if(!status && permissionStatus === "granted") {
            return this.subscribeUser(false);
        }

        if(status && permissionStatus === "default") {
            Notification.requestPermission().then((result) => {
                if(result === "denied" || result === "default") {
                    console.log("User has denied the access for notifications");
                    return this.setState({
                        denied : true,
                        status : false
                    })
                }

                if(result === "granted") {
                    console.log("User has granted the access for notificaitons");
                    this.subscribeUser(true);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    },

    subscribeUser : function (status) {
        let options = {
            "applicationServerKey" : urlB64ToUint8Array("BOVlM6LHcVtS4di5jYsGLEI1KQcmlx4L-LJn-9q_Jo5z8aZx8RP6aiIA4nIjofslpxSJmmvi5SBb7zqul-muTjY"),
            "userVisibleOnly" : true
        };
        return navigator.serviceWorker.ready.then((sw_instance) => {
            if(status) {
                sw_instance.pushManager.subscribe(options).then((subscription) => {
                    console.log("User has successfully subscribed");
                    let subscriptionInfo = {
                        user : this.props.user_profile.user,
                        subscription : JSON.stringify(subscription)
                    };
                    SubscriptionAPI.addSubscription(subscriptionInfo).then((data) => {
                        return this.setState({
                            status : true
                        });
                    })
                }).catch((err) => {
                    console.log(err);
                })
            }else{
                sw_instance.pushManager.getSubscription().then((subscription) => {
                    SubscriptionAPI.addSubscription({user : this.props.user_profile.user}).then((data) => {
                        subscription.unsubscribe().then((result) => {
                            if(result) {
                                console.log("User has unsubscribed from the notifications", result);
                                return this.setState({
                                    status : false
                                })
                            }
                        })
                    })
                })
            }
        })
    }
});

module.exports = UserMenu;