var chat_history ={};
var active_conversation = null;

export function appendChatConversation(conversation_id, messages){
	if(!chat_history[conversation_id]){
		Array.isArray(messages) ? chat_history[conversation_id] = messages : chat_history[conversation_id] = [messages];
		return chat_history[conversation_id];
	}else{
		chat_history[conversation_id].push(messages);
		if(active_conversation === conversation_id){
			return chat_history[conversation_id];
		}
		return chat_history[active_conversation];
	}
}


export function checkIfChatExists(conversation_id){
	active_conversation = conversation_id;
	if(chat_history[conversation_id]){
		return true;
	}else{
		return false;
	}
}

export function fetchChatConversation (conversation_id){
	return chat_history[conversation_id];
}

