var React = require("react");

var ChatPanel = React.createClass({
    getInitialState : function (){
        return {

        };
    },

    render : function (){
        return (
            <div className="chat-container">
                <header className="chat-header">
                    <div className="text-primary"> Srikanth Reddy </div>
                </header>
                <div className ="chat-body"> 
                </div>
                <footer className ="chat-footer"> 
                    <div className="input" contentEditable="true" spellCheck="true" ></div>
                    <div className = "action-menu"> </div>
                </footer>
            </div>
        )
    }
})

module.exports = ChatPanel;