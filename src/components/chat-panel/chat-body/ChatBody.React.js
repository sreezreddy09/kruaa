var React = require("react");

var ChatBody = React.createClass({
	getInitialState : function (){
		return {

		}
	},

	render : function(){
		return (
			<div className="chat-body-container">
				<div className="chat-flex"> </div>
				{
					(this.props.chat_history.messages.length)?(
						<ul className="list-chats"> 
							{
								this.props.chat_history.messages.map(function(message, index){
									return <li className= {(message.sender_id == this.props.user_profile.user_name)? "chat-right" : "chat-left"} key={index}>
										<div className="chat">
											<div className="chat-text-body"> 
												{message.message}
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