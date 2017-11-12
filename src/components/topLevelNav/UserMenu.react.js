var React = require("react");

var UserMenu = React.createClass({
    render : function(){
        return (
        <div className = "user-nav-right"> 
                <div className="user-dropdown">
                    <i className="fa fa-user-circle-o fa-lg user-logo" aria-hidden="true"></i>
                    <span> Srikanth Reddy</span>
                    <i className="fa fa-caret-down"></i>
                    <div className="ink-reaction"> </div>
                </div>
        </div>);
    }
});

module.exports = UserMenu;