var React = require("react");
import ChatBodyContainer from "./chat-body/ChatBody.container.js";
import {sendMessageToSocket} from "../../models/client-socket.js";

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
                    <input className="input" placeholder="Type the message here" spellCheck="true" onKeyDown={this._sendMessage} ref="inputMessage"/>
                    <div className = "action-menu"> <i className="fa fa-lg fa-paper-plane"></i></div>
                </footer>
            </div>
        )
    },
    _sendMessage : function(event){
        event.stopPropagation();
        if(event.keyCode === 13 && this.refs.inputMessage.value.trim()){
            let msg = {
                conversation_id : this.props.chat_profile.conversation_id,
                message : this.refs.inputMessage.value,
                sender_id : this.props.user_profile.user_name,
                message_type : "text",
                createdat_time : Date.now()
            };
            this.props.appendMessageToChat(this.props.chat_profile.conversation_id, msg);
            this.props.update_user_profiles(this.props.chat_profile.conversation_id, this.props.user_profiles.users, msg);
            sendMessageToSocket(this.props.chat_profile.user_uid, msg);
            this.refs.inputMessage.value = "";
        }
    }
})

module.exports = ChatPanel;