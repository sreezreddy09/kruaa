var React = require("react");

var ProgressBar = React.createClass({
    render : function(){
        return (
            <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            </div>
        );
    }
});

module.exports = ProgressBar;