var React = require("react");
import {formatDate} from "../../../models/timeHelper";

var ChatBody = React.createClass({

	render : function(){
		let sender;
		return (
			<div className="chat-body-container">
				<div className="chat-flex"> </div>
				{
					(this.props.chat_profile.name && this.props.chat_history.messages.length)?(
						<ul className="list-chats">
							{
								this.props.chat_history.messages.map(function(message, index){
									const ranges = [
										'\ud83c[\uDC04\uDCCF\uDD70-\uDD71\uDD7E-\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01-\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50-\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96-\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]',
										'\ud83d[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F-\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95-\uDD96\uDDA4-\uDDA5\uDDA8\uDDB1-\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB-\uDEEC\uDEF0\uDEF3-\uDEF6]',
										'\ud83e[\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0]',
										'[\u2100-\u29ff]|\u2B50|\u2620|\uFE0F',
										' ',
									].join('|');
									const removeEmoji = str => str.replace(new RegExp(ranges, 'g'), '');
									const isOnlyEmojis = str => !removeEmoji(str).length;
									(this.props.chat_profile.group_name && message.sender_id !== this.props.user_profile.user_name)?(
										sender = this.props.chat_profile.users.filter((d) => message.sender_id === d.user_name)[0]
									):sender = true
									return sender && <li className= {(message.sender_id == this.props.user_profile.user_name)? "chat-right" : "chat-left"} key={index}>
										<div className="chat">
											<div className={"chat-text-body" + ((isOnlyEmojis(message.message))?(" is-only-emoji"):"")}>
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