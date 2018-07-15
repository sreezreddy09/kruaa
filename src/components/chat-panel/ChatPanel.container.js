import React from "react";
import {connect} from "react-redux";
import ChatPanel from "./ChatPanel.js";

const ChatPanelContainer = ({chat_profile}) => (
    <ChatPanel chat_profile={chat_profile}/>
);

function mapStateToProps (state, ownProps){
    return {
        chat_profile : state.chat_profile.user
    };
}

function mapDispatchToProps(dispatch, ownProps){
    return {

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatPanelContainer);