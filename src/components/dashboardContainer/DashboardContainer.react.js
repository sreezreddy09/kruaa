var React = require("react");
var ProgressBar = require("../progressBar/ProgressBar.react");
import ContactsPanelContainer from "../contacts-panel/ContactsPanel.container.js";
import ChatPanelContainer from "../chat-panel/ChatPanel.container.js";
import NotificationPanelContainer from "../notification-panel/NotificationPanel.container.js";

var DashboardContainer = React.createClass({
    
    render : function(){
        return (
            <div className = "dashboard-container">
                <ContactsPanelContainer/>
                <ChatPanelContainer/>
                <NotificationPanelContainer/>
            </div>
        );
    }
});
module.exports = DashboardContainer;