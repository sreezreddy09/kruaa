var React = require("react");
var UserMenu = require("./UserMenu.react");
import {createSocketUser} from "../../models/client-socket";
var TopLevelNav = React.createClass({
    componentWillMount : function(){
        createSocketUser(this.props.user_profile.user.user_uid);
    },
    render : function(){
        return (
            <div className = "top-level-nav">
                <div className="logo-nav-left">
                    <img className="logo-png" src="./lib/images/kruaa-logo.png"/>
                </div>
                <UserMenu {...this.props}/>
            </div>
        );
    }
});

module.exports = TopLevelNav;