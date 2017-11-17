var React = require("react");
import TopLevelNavContainer from "../topLevelNav/TopLevelNav.container";
var DashboardContainer = require("../dashboardContainer/DashboardContainer.react");

var MainDashboard = React.createClass({
    componentWillMount : function(){
        if(this.props.user == null){
            this.props.requireAuth();
        }
    },
    render : function (){
        return (
        <div className = "dashboard">
            <TopLevelNavContainer />
            <DashboardContainer />
        </div>
    );
    },

});

module.exports = MainDashboard;