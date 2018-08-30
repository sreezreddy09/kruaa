import React from "react";
import {connect} from "react-redux";
import ChatBody from "./ChatBody.React.js";

const ChatBodyContainer = ({ user_profile,  chat_history, chat_profile}) => (
	<ChatBody user_profile ={user_profile} chat_history={chat_history} chat_profile={chat_profile} />
);

function mapStateToProps (state, ownProps){
	return {
		user_profile : state.user_info.user,
		chat_history : state.chat_history,
		chat_profile : state.chat_profile.user
	}
}

function mapDispatchToProps(dispatch, ownProps){
	return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBodyContainer);