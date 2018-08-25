var React = require("react");
import {formatDate} from "../../../models/timeHelper";

var ChatBody = React.createClass({

	render : function(){
		return (
			<div className="chat-body-container">
				<div className="chat-flex"> </div>
				{
					(this.props.chat_profile.name && this.props.chat_history.messages.length)?(
						<ul className="list-chats"> 
							{
								this.props.chat_history.messages.map(function(message, index){
									return <li className= {(message.sender_id == this.props.user_profile.user_name)? "chat-right" : "chat-left"} key={index}>
										<div className="chat">
											<div className="chat-tail"> </div>
											<div className="chat-text-body">
												<span>{message.message}</span>
												<small>{formatDate(message.createdat_time)}</small>
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