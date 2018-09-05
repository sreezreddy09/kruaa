import React from "react";
import {connect} from "react-redux";
import ContactsPanel from "../contacts-panel/ContactsPanel.js";
import { fetchContacts, searchUser, current_chat_profile, updateUserRequest, clearSearchResults } from "../../actions/contactsActionCreator.js";
import {fetch_chat_history} from "../../actions/fetchChatActionCreator.js";
import {updateMessageCounter} from "../../models/client-socket.js";

const ContactsPanelContainer = ({user_profiles, fetchContactList, searchUser, activeChatUser, user_profile, updateUserRequest, clearSearch}) => (
    <ContactsPanel user_profiles = {user_profiles} fetchContactList = {fetchContactList} searchUser={searchUser} activeChatUser={activeChatUser} user_profile={user_profile} updateUserRequest={updateUserRequest} clearSearch={clearSearch}/>
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

        searchUser : function (value, user) {
            dispatch(searchUser(value, user));
        },

        clearSearch : function(){
            dispatch(clearSearchResults());
        },

        activeChatUser : function (chat_member, user, isGroup) {
            if(chat_member.unread_count){
                updateMessageCounter(chat_member.conversation_id, user.user_name, isGroup);
            }
            dispatch(current_chat_profile(chat_member));
            dispatch(fetch_chat_history(chat_member.conversation_id, user.user_uid));
        },

        updateUserRequest : function(chat_member, user){
            dispatch(updateUserRequest(chat_member, user));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactsPanelContainer);