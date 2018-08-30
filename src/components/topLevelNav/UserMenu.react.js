var React = require("react");
var _ = require("lodash");

var UserMenu = React.createClass({
    render : function(){
        var user_name = (this.props.user_profile.user)?this.props.user_profile.user.name:"";
        return (
        <div className = "user-nav-right"> 
                <div className="user-dropdown">
                    <i className="fa fa-user-circle-o fa-lg user-logo" aria-hidden="true"></i>
                    <span>{_.startCase(_.toLower(user_name))}</span>
                    <i className="fa fa-caret-down"></i>
                    <div className="ink-reaction"> </div>
                </div>
        </div>);
    }
});

module.exports = UserMenu;