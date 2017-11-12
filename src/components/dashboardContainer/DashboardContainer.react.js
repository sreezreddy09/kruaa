var React = require("react");
var ProgressBar = require("../progressBar/ProgressBar.react");

var DashboardContainer = React.createClass({
    getInitialState : function(){
        return {
            loading : true
        }
    },
    render : function(){
        return (
            <div className = "dashboard-container">
                {
                    (this.state.loading)?(<ProgressBar/>):""
                }
            </div>
        );
    }
});
module.exports = DashboardContainer;