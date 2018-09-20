var React = require("react");
import ChatBodyContainer from "./chat-body/ChatBody.container.js";
import {sendMessageToSocket} from "../../models/client-socket.js";
import EmojiPicker from 'emoji-picker-react';

var ChatPanel = React.createClass({
    getInitialState : function (){
        return {
            showEmoji : false
        }
    },

    render : function (){
        return (
            <div>
            {
                (this.props.chat_profile.name)?(
                    <div className="chat-container">
                        <header className="chat-header">
                            <div className="text-primary"> {(this.props.chat_profile)?this.props.chat_profile.name:""} </div>
                        </header>
                        <div className ={"chat-body" + ((this.state.showEmoji)?(" emoji"):"")}>
                            <ChatBodyContainer/>
                        </div>
                        <footer className ={"chat-footer" + ((this.state.showEmoji)?(" emoji"):"")}> 
                            <div className ="emoji-menu" onClick={this._showEmojiTab}><i className = "fa fa-2x fa-plus-square" ></i></div>
                            <input className ="input" placeholder ="Type the message here" spellCheck="true" onKeyDown={this._sendMessage.bind(this, false)} ref = "inputMessage"/>
                            <div className = "action-menu" onClick={this._sendMessage.bind(this, true)} > <i className = "fa fa-lg fa-paper-plane"></i></div>
                            {
                                (this.state.showEmoji)?(<EmojiPicker onEmojiClick={this.EmojiClick} preload/>):""
                            }
                            
                        </footer>
                    </div>
                ):(
                    <div className="chat-container">
                        <div className="landing-page"> </div>
                     </div>
                )
            }
            </div>
        )
    },
    _sendMessage : function(ss, event){
        event.stopPropagation();
        if((event.keyCode === 13 || ss) && this.refs.inputMessage.value.trim()){
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
    },
    EmojiClick : function(unicode, info){  
        let emoji = String.fromCodePoint("0x" + unicode);
        this.refs.inputMessage.value = this.refs.inputMessage.value + emoji;
    },
    _showEmojiTab : function(event){
        event.stopPropagation();
        this.state.showEmoji = !this.state.showEmoji;
        this.setState({});
    }
})

module.exports = ChatPanel;