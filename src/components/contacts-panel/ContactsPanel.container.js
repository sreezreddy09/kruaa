import React from "react";
import {connect} from "react-redux";
import ContactsPanel from "../contacts-panel/ContactsPanel.js";

const ContactsPanelContainer = () => (
    <ContactsPanel />
);

function mapStateToProps (state, ownProps){
    return {

    };
}

function mapDispatchToProps(dispatch, ownProps){
    return {

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactsPanelContainer);