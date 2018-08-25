var chat_history ={};
var active_conversation = null;
var chatsFetchedDB = [];

export function appendChatConversation(conversation_id, messages){
	if(!chat_history[conversation_id]){
		Array.isArray(messages) ? chat_history[conversation_id] = messages : chat_history[conversation_id] = [messages];
	}else{
		Array.isArray(messages) ? chat_history[conversation_id] = messages : chat_history[conversation_id].push(messages);
	}

	return chat_history[active_conversation] || []
}


export function checkIfChatExists(conversation_id){
	active_conversation = conversation_id;
	if(chat_history[conversation_id] && chatsFetchedDB.indexOf(conversation_id) > -1){
		return true;
	}else{
		return false;
	}
}

export function fetchChatConversation (conversation_id){
	return chat_history[conversation_id];
}

export function dbFetchedChats(conversation_id){
	chatsFetchedDB.push(conversation_id);
}

