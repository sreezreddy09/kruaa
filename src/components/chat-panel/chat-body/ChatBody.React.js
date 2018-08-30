var React = require("react");
import {formatDate} from "../../../models/timeHelper";

var ChatBody = React.createClass({

	render : function(){
		let sender;
		debugger;
		return (
			<div className="chat-body-container">
				<div className="chat-flex"> </div>
				{
					(this.props.chat_profile.name && this.props.chat_history.messages.length)?(
						<ul className="list-chats"> 
							{
								this.props.chat_history.messages.map(function(message, index){
									(this.props.chat_profile.group_name && message.sender_id !== this.props.user_profile.user_name)?(
										sender = this.props.chat_profile.users.filter((d) => message.sender_id === d.user_name)[0]
									):""
									return <li className= {(message.sender_id == this.props.user_profile.user_name)? "chat-right" : "chat-left"} key={index}>
										<div className="chat">
											<div className="chat-text-body">
												{
													(this.props.chat_profile.group_name && message.sender_id !== this.props.user_profile.user_name)?(
													<div className="chat-head" style={{"color" : sender.color}}>
														{sender.name}
													</div>
													):null
												}
												<span>{message.message}</span>
												<small>{formatDate(message.createdat_time, true)}</small>
											</div>
										</div>
									</li>
								}.bind(this))
							}
						</ul>
					):""
				}
			
			</div>
		)
	}
});

module.exports = ChatBody;