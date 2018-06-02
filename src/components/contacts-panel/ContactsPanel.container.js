import React from "react";
import {connect} from "react-redux";
import ContactsPanel from "../contacts-panel/ContactsPanel.js";
import { fetchContacts, toggleSearchPanel, searchUser } from "../../actions/contactsActionCreator.js";

const ContactsPanelContainer = ({user_profiles, fetchContactList, toggleSearchPanel, searchUser}) => (
    <ContactsPanel user_profiles = {user_profiles} fetchContactList = {fetchContactList} toggleSearchPanel = {toggleSearchPanel} searchUser={searchUser} />
);

function mapStateToProps (state, ownProps){
    return {
        user_profiles : state.user_profiles
    };
}

function mapDispatchToProps(dispatch, ownProps){
    return {
        fetchContactList : function (){
            dispatch(fetchContacts());
        },
        toggleSearchPanel : function (){
            dispatch(toggleSearchPanel());
        },
        searchUser : function (value) {
            dispatch(searchUser(value));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactsPanelContainer);