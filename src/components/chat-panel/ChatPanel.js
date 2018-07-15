var React = require("react");
// var ChatBodyContainer = require("./chat-body/ChatBody.container.js");
import ChatBodyContainer from "./chat-body/ChatBody.container.js";

var ChatPanel = React.createClass({
    getInitialState : function (){
        return {

        }
    },

    render : function (){
        return (
            <div className="chat-container">
                <header className="chat-header">
                    <div className="text-primary"> {(this.props.chat_profile)?this.props.chat_profile.name:""} </div>
                </header>
                <div className ="chat-body">
                    <ChatBodyContainer/>
                </div>
                <footer className ="chat-footer"> 
                    <div className="emoji-menu"><i className= "fa fa-2x fa-plus-square" ></i></div>
                    <input className="input" placeholder="Type the message here" spellCheck="true"/>
                    <div className = "action-menu"> <i className="fa fa-lg fa-paper-plane"></i></div>
                </footer>
            </div>
        )
    }
})

module.exports = ChatPanel;