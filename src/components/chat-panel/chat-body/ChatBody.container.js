import React from "react";
import {connect} from "react-redux";
import ChatBody from "./ChatBody.React.js";
import {fetch_chat_history} from "../../../actions/fetchChatActionCreator.js";

const ChatBodyContainer = ({chat_profile, user_profile, fetchChatHistory, chat_history}) => (
	<ChatBody chat_profile={chat_profile} user_profile ={user_profile} fetchChatHistory={fetchChatHistory} chat_history={chat_history} />
);

function mapStateToProps (state, ownProps){
	return {
		chat_profile : state.chat_profile.user,
		user_profile : state.user_info.user,
		chat_history : state.chat_history
	}
}

function mapDispatchToProps(dispatch, ownProps){
    return {
		fetchChatHistory : function(chat_member, user){
			dispatch(fetch_chat_history(chat_member, user))
		}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBodyContainer);