import React from "react";
import {connect} from "react-redux";
import ChatPanel from "../chat-panel/ChatPanel.js";

const ChatPanelContainer = () => (
    <ChatPanel />
);

function mapStateToProps (state, ownProps){
    return {

    };
}

function mapDispatchToProps(dispatch, ownProps){
    return {

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatPanelContainer);