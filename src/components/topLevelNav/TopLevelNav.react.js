var React = require("react");
var UserMenu = require("./UserMenu.react");
var TopLevelNav = React.createClass({
    render : function(){
        return (
            <div className = "top-level-nav">
                <div className="logo-nav-left">
                    <span className="logo-text"> KRUAA </span>
                </div>
                <UserMenu {...this.props}/>
            </div>
        );
    }
});

module.exports = TopLevelNav;