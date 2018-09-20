var React = require("react");
var ProgressBar = require("../progressBar/ProgressBar.react.js");
import {CSSTransition, TransitionGroup} from "react-transition-group";
var commonUtils = require("../../models/utilsHelper");

var NotificationPanel = React.createClass({

	getInitialState : function (){
		return {
			showGroupPanel : false,
			ViewCreateGroup : false,
			ViewUpdateGroup : false
		}
	},

	componentWillMount : function (){
		this._fetchApprovals();
	},

	render : function (){
		var editableGroups = this.props.user_profiles.users.filter((group) => {
			if(group.group_name){
				return {
					group_name : group.group_name,
					conversation_id : group.conversation_id
				}
			}
		});
		var userGroupPanel = <div className= "user-group-panel">
			
			<div className= {"create-panel" + ((this.state.ViewCreateGroup) ? " show":" hide")} onClick={(!this.state.ViewCreateGroup) ?(this._toggleViewCreateGroup):""}>
				<header className = "title">
					Create a group
					<i className="fa  fa-times" onClick={this._toggleViewCreateGroup}> </i>
				</header>
				{
					(this.state.ViewCreateGroup)?(
					<div className= "form-container">
						<div className="group-title"> 
							<i className="fa fa-file-image-o"> </i>
							<input className="group-input" placeholder="Name your group" spellCheck="false" ref="groupTitle"/>
						</div>
						<div className="user-search"> 
							<i className = "fa fa-search" > </i>
							<input className="input-box" placeholder="Search for people to add" spellCheck="false" onChange ={this._searchUser} ref="searchUser"/>
						</div>
						<div className = "search-user-results"> 
							<ul className="users">
								{
									(this.props.user_approvals.groupUsers.length)?(
										this.props.user_approvals.groupUsers.map(function(user, index){
											return (<li className="user-item" key={index}>
												{user.name}
												<div className={"user-action" + ((!user.isUser)?"" : " remove")}>
													{
														(!user.isUser)?(<span className = "action-button" onClick={this._UpdateGroupUser.bind(this, user.user_uid, true)} > Add </span>):(
															<span className = "action-button" onClick={this._UpdateGroupUser.bind(this, user.user_uid, false)} > Added <i className= "fa fa-times"></i></span>
														)
													}
												</div>
											</li>)
										}.bind(this))
									):""
								}
							
							</ul>
						</div>
						<div className="action-buttons">
							<div className="cancel-button" onClick={this._toggleViewCreateGroup}> Cancel  </div>
							<div className="create-button" onClick={this._CreateGroup}> Create  </div>
						</div>
					</div>) : ""
				}
			</div>

			<div className= {"update-panel" + ((this.state.ViewUpdateGroup) ? " show":" hide")} onClick={(!this.state.ViewUpdateGroup) ?(this._toggleViewUpdateGroup): ""}> 
				<header className = "title">
					Update a group
					<i className="fa  fa-times" onClick={this._toggleViewUpdateGroup}> </i>
				</header>
				{
					(this.state.ViewUpdateGroup)?(
					<div className= "form-container">
						<div className="group-title"> 
							<i className="fa fa-file-image-o"> </i>
							<div className ="group-select">
								<select className ="group-select" onChange={this._GroupSelected} ref="UpdateGroupTitle">
									<option className="select-fields" key={-1} value = "">Select the group..</option>
									{
										editableGroups.map((item, i) => {
											return (<option className="select-fields" key={i} value={item.conversation_id}>{item.group_name}</option>)
										})
									}
								</select>

							</div>
						</div>
						<div className="user-search"> 
							<i className = "fa fa-search" > </i>
							<input className="input-box" placeholder="Search for people to add" spellCheck="false" ref="searchUser"/>
						</div>
						<div className = "search-user-results"> 
							<ul className="users">
								{
									(this.props.user_approvals.groupUsers.length)?(
										this.props.user_approvals.groupUsers.map(function(user, index){
											return (<li className="user-item" key={index}>
												{user.name}
												<div className={"user-action" + ((!user.isUser)?"" : " remove")}>
													{
														(!user.isUser)?(<span className = "action-button" onClick={this._UpdateGroupUser.bind(this, user.user_uid, true)} > Add </span>):(
															<span className = "action-button" onClick={this._UpdateGroupUser.bind(this, user.user_uid, false)} > Added <i className= "fa fa-times"></i></span>
														)
													}
												</div>
											</li>)
										}.bind(this))
									):""
								}
							
							</ul>
						</div>
						<div className="action-buttons">
							<div className="cancel-button" onClick={this._toggleViewUpdateGroup}> Cancel  </div>
							<div className="create-button" onClick={this._UpdateGroup}> Update  </div>
						</div>
					</div>) : ""
				}
			</div>
		</div>;



		return <div className="notification-panel">
			<div className = "notification-header">
				<div className= "buddy-header"> Buddy Requests
						{
							(this.props.user_profile.user.admin)?(
								<div className = "buddy-groups-icon" onClick={this._toggleGroupPanel}>
									<i className = "fa fa-users fa-lg" aria-hidden = "true" > </i>
								</div>
								):""
						}
				</div>
			</div>
			{
				(this.state.showGroupPanel)? (userGroupPanel) :
				<div className="approval-container">
					{
						(this.props.user_approvals.loading)?(""):(
							<ul className="approval-users">
								<TransitionGroup className="todo-list">
								{
									(this.props.user_approvals.approvals.length)?(this.props.user_approvals.approvals.map((user, index) => {
										return (
											<CSSTransition key={index} timeout={500} classNames="fade" >
											<li className= "user-item" key= {index} >
													{user.name}
													<div className="action-buttons">
														<div className="accept-button" onClick={this._updateApprovalStatus.bind(this, user, true)}>ACCEPT</div>
														<div className="reject-button" onClick={this._updateApprovalStatus.bind(this, user, false)}>REJECT</div>
													</div>
												</li>
											</CSSTransition>
										)
									})):(<div className="no-items"> No buddy requests</div>)

								}
								</TransitionGroup>
							</ul>
						)
					}
				</div>
			}
		</div>
	},

	_fetchApprovals : function (){
		this.props.fetchApprovals(this.props.user_profile.user.user_name);
	},

	_updateApprovalStatus : function (user, approve, event){
		event.stopPropagation();
		this.props.updateApprovalStatus(user, this.props.user_profile.user.user_name, approve, this.props.user_approvals.approvals);
	},

	_toggleGroupPanel : function (event) {
		event.stopPropagation();
		this.state.showGroupPanel = !this.state.showGroupPanel;
		this.setState({});
	},

	_searchUser : function(event){
		event.stopPropagation();
        let value = this.refs.searchUser.value;
        this.props.searchGroupUsers(value, this.props.user_profile.user.user_name);
	},
	_toggleViewCreateGroup : function(event){
		event.stopPropagation();
		this.state.ViewUpdateGroup = false;
		this.state.ViewCreateGroup = !this.state.ViewCreateGroup;
		this.props.user_approvals.groupUsers = [];
		this.setState({});
	},

	_UpdateGroupUser : function(user_uid, approve, event){
		event.stopPropagation();
		this.props.user_approvals.groupUsers.map(user => {
			if(user.user_uid == user_uid) user.isUser = approve;
		})
		this.setState({});
	},

	_CreateGroup : function(event){
		event.stopPropagation();
		let group_name = this.refs.groupTitle.value;
		let group_users = this.props.user_approvals.groupUsers.filter((user) => {
			return user.isUser === true;
		});
		group_users.push({user_uid : this.props.user_profile.user.user_uid, name : this.props.user_profile.user.name});
		this.props.CreateGroupUsers(group_name, group_users);
		this.state.ViewCreateGroup = !this.state.ViewCreateGroup;
		this.setState({});
	},

	_UpdateGroup : function (event){
		event.stopPropagation();
		let conversation_id = this.refs.UpdateGroupTitle.value;
		let group_users = this.props.user_approvals.groupUsers.filter((user) => {
			return user.isUser === true;
		});
		let new_user_list = group_users.map((user) => {
			return user.user_uid;
		});
		let deleted_users = this.state.existing_group_users.diff(new_user_list);
		group_users.push({user_uid : this.props.user_profile.user.user_uid, name : this.props.user_profile.user.name});
		this.props.UpdateGroupUsers(conversation_id, group_users, this.props.user_profile.user.user_name, deleted_users);
		this.state.ViewUpdateGroup = !this.state.ViewUpdateGroup;
		this.props.user_approvals.groupUsers = [];
		this.setState({});
	},

	_toggleViewUpdateGroup: function (event){
		event.stopPropagation();
		this.state.ViewUpdateGroup = !this.state.ViewUpdateGroup;
		this.state.ViewCreateGroup = false;
		this.props.user_approvals.groupUsers = [];
		this.setState({});
	},
	_GroupSelected : function (event){
		event.stopPropagation();
		let group_users = this.props.user_profiles.users.filter((profile) => {
			return profile.conversation_id === event.target.value;
		})[0].users.map((user) => {
			return user.user_uid;
		});
		this.state.existing_group_users = group_users;
		this.props.searchGroupUsers("value", this.props.user_profile.user.user_name, group_users);
	}
});


module.exports = NotificationPanel;