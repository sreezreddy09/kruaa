var React = require("react");
var ProgressBar = require("../progressBar/ProgressBar.react.js");

var ContactsPanel = React.createClass({
    getInitialState : function (){
        return {
            searchUserPanel : false
        };
    },

    componentWillMount : function(){
        this.props.fetchContactList();        
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
                                    <span className = "action-button"> Pending </span>
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
                                            return (<li className = "contact-item" onClick={this._activeChatUser.bind(this, user)} key={index} >
                                                <div className="item item-icon"></div>
                                                <div className="item item-text">
                                                    <span ref="userInfo">{user.name}</span>
                                                    <small className="item item-small"> No messages yet... </small>
                                                </div>
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

    _toggleSearchPanel : function (event){
        event.stopPropagation();
        this.state.searchUserPanel = !this.state.searchUserPanel;
        this.setState({});
    },

    _searchUser : function (event) {
        event.stopPropagation();
        let value = this.refs.searchInput.value;
        this.props.searchUser(value);
    },

    _activeChatUser : function (user, event){
        event.stopPropagation();
        this.props.activeChatUser(user, this.props.user_profile.user_name);
    }
});

module.exports = ContactsPanel;