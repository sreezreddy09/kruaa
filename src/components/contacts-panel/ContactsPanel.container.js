import React from "react";
import {connect} from "react-redux";
import ContactsPanel from "../contacts-panel/ContactsPanel.js";
import { fetchContacts, searchUser, current_chat_profile } from "../../actions/contactsActionCreator.js";
import {fetch_chat_history} from "../../actions/fetchChatActionCreator.js";

const ContactsPanelContainer = ({user_profiles, fetchContactList, searchUser, activeChatUser, user_profile}) => (
    <ContactsPanel user_profiles = {user_profiles} fetchContactList = {fetchContactList} searchUser={searchUser} activeChatUser={activeChatUser} user_profile={user_profile} />
);

function mapStateToProps (state, ownProps){
    return {
        user_profiles : state.user_profiles,
        user_profile : state.user_info.user
    };
}

function mapDispatchToProps(dispatch, ownProps){
    return {
        fetchContactList : function (user){
            dispatch(fetchContacts(user));
        },

        searchUser : function (value) {
            dispatch(searchUser(value));
        },

        activeChatUser : function (chat_member, user) {
            dispatch(current_chat_profile(chat_member));
            dispatch(fetch_chat_history(chat_member.conversation_id, user.user_uid));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactsPanelContainer);