export function updateContactProfiles(conversation_id, chat_profiles, msg, unreadCounter){
	let counter = 0;
	let current_profile = chat_profiles.filter((user) => {
		return user.conversation_id === conversation_id;
	});
	let other_profiles = chat_profiles.filter((user) => {
		return user.conversation_id !== conversation_id;
	});

	current_profile[0].last_message = msg.message;
	current_profile[0].updated_time = msg.createdat_time;
	current_profile[0].unread_count = unreadCounter ? (current_profile[0]["unread_count"] + 1 || 0): 0

	return current_profile.concat(other_profiles);
}