import React from "react";
import {connect} from "react-redux";
import ChatPanel from "./ChatPanel.js";
import {append_message_to_chat} from "../../actions/fetchChatActionCreator";
import {update_user_profiles} from "../../actions/contactsActionCreator";
import {updateContactProfiles} from "../../models/contactsHelper";

const ChatPanelContainer = ({chat_profile, user_profile, user_profiles, appendMessageToChat, update_user_profiles}) => (
    <ChatPanel chat_profile={chat_profile} user_profiles = {user_profiles} user_profile={user_profile} appendMessageToChat={appendMessageToChat} update_user_profiles={update_user_profiles} />
);

function mapStateToProps (state, ownProps){
    return {
        chat_profile : state.chat_profile.user,
        user_profile : state.user_info.user,
        user_profiles : state.user_profiles
    };
}

function mapDispatchToProps(dispatch, ownProps){
    
    return {
        appendMessageToChat : (conversation_id, msg) => {
            dispatch(append_message_to_chat(conversation_id, msg));
        },

        update_user_profiles : (conversation_id, chat_profiles, msg) => {
            let contact_profiles = updateContactProfiles(conversation_id, chat_profiles, msg);
            dispatch(update_user_profiles(contact_profiles));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatPanelContainer);