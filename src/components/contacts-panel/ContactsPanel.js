var React = require("react");
var ProgressBar = require("../progressBar/ProgressBar.react.js");
import { formatDate } from "../../models/timeHelper";

var ContactsPanel = React.createClass({
    getInitialState : function (){
        return {
            searchUserPanel : false
        };
    },

    componentWillMount : function(){
        this.props.fetchContactList(this.props.user_profile.user_name);        
    },

    render : function (){        
        var searchUserPanel = <div className="search-user-panel">
            <header className="search-user">
                <input className="input-box" placeholder="Search" spellCheck="false" onChange={this._searchUser} ref="searchInput"/>
                <i className = "fa fa-search" onClick={this._searchUser}> </i>
            </header>
            <div className="search-user-results">
                
                {
                    (this.props.user_profiles.loading)?(<ProgressBar/>):(
                        <ul className="users">
                            {
                                (this.props.user_profiles.userSearchResults.length)?this.props.user_profiles.userSearchResults.map(function(user, index){
                                    return (<li className="user-item" key={index}>
                                    {user.name}
                                    <button className="user-action">
                                    <span className = "action-button" onClick={this._updateUserRequest.bind(this, user)}> {this.map_status[user.status]} </span>
                                    </button>
                                    </li>)
                                }.bind(this)):""
                            }
                        </ul>
                    )
                }
            </div>
        </div>;
        return (
            <div className ="contacts-container">
                <div className="contact-header">
                    < header className = "text-primary" >
                        < span > Recent Chats </span>
                        < div className="add-contact" onClick={this._toggleSearchPanel}>
                        {
                            (!this.state.searchUserPanel)?(<i className = "fa fa-user-plus fa-lg" aria-hidden = "true" > </i>) :
                            (<i className = "fa fa-arrow-left fa-lg" aria-hidden = "true" > </i>)
                        }
                        </div >
                    </header>
                </div>
                {
                    (this.state.searchUserPanel)?(searchUserPanel):
                    (this.props.user_profiles.loading)?(<ProgressBar/>):(
                        <div className="contacts">
                            <ul className="contacts-list">
                                {
                                    (this.props.user_profiles.users.length)?(
                                        this.props.user_profiles.users.map(function (user, index) {
                                            return (<li className = {"contact-item" + ((this.state.active_user == user.user_uid)?" active":"")} onClick={this._activeChatUser.bind(this, user)} key={index} >
                                                <div className="item item-icon"></div>
                                                <div className="item item-text">
                                                    <span ref="userInfo" title = {user.name} >{user.name}</span>
                                                    <small className="item item-small">{user.last_message || "No Messages Yet"} </small>
                                                </div>
                                                <div className="item item-date"> { user.updated_time ? (formatDate(user.updated_time )) : ""} </div>
                                            </li>)
                                        }.bind(this))
                                    ): ""
                                }
                            </ul>
                        </div>
                    )
                }
            </div>
        );
    },

    map_status : {
        "success" : "Open",
        "pending" : "Pending",
        "none" : "Add"
    },

    _toggleSearchPanel : function (event){
        event.stopPropagation();
        this.state.searchUserPanel = !this.state.searchUserPanel;
        this.setState({});
    },

    _searchUser : function (event) {
        event.stopPropagation();
        let value = this.refs.searchInput.value;
        this.props.searchUser(value, this.props.user_profile.user_name);
    },

    _activeChatUser : function (user, event){
        event.stopPropagation();
        this.props.activeChatUser(user, this.props.user_profile);
        this.setState({active_user : user.user_uid})
    },

    _updateUserRequest : function (user, event){
        event.stopPropagation();
        if(user.status == "none"){
            this.props.updateUserRequest(user, this.props.user_profile);
            return;
        }
        if(user.status == "success"){
            let active_user = this.props.user_profiles.users.filter((d) => d.user_uid === user.user_uid )[0];
            this.state.searchUserPanel = !this.state.searchUserPanel;
            this.props.activeChatUser(active_user, this.props.user_profile);
            this.props.clearSearch();
            this.setState({active_user : active_user.user_uid})
            this.setState({});
        }
    }
});

module.exports = ContactsPanel;