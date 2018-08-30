var React = require("react");
var ProgressBar = require("../progressBar/ProgressBar.react.js");
import {CSSTransition, TransitionGroup} from "react-transition-group";

var NotificationPanel = React.createClass({

	componentWillMount : function (){
		this._fetchApprovals();
	},

	render : function (){
		return <div className="notification-panel">
			<div className = "notification-header">
				<div className= "buddy-header"> Buddy Requests
				</div>
			</div>
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
		</div>
	},

	_fetchApprovals : function (){
		this.props.fetchApprovals(this.props.user_profile.user.user_name);
	},

	_updateApprovalStatus : function (user, approve, event){
		event.stopPropagation();
		this.props.updateApprovalStatus(user, this.props.user_profile.user.user_name, approve, this.props.user_approvals.approvals);
	}
});


module.exports = NotificationPanel;