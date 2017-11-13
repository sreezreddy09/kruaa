var React = require("react");
var TopLevelNav = require("../topLevelNav/TopLevelNav.react");
var DashboardContainer = require("../dashboardContainer/DashboardContainer.react");

var MainDashboard = React.createClass({
    render : function (){
        return (
        <div className = "dashboard">
            <TopLevelNav />
            <DashboardContainer />
        </div>
    );
    }
});

module.exports = MainDashboard;