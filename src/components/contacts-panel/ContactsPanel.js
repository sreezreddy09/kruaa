var React = require("react");

var ContactsPanel = React.createClass({
    getInitialState : function (){
        return {

        };
    },

    render : function (){
        return (
            <div className ="contacts-container">
                <div className="contact-header">
                    <header className="text-primary"> Online Users</header>
                </div>
            </div>
        );
    }
});

module.exports = ContactsPanel;