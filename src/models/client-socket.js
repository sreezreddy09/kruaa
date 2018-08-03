const io = require('socket.io-client');
import{append_message_to_chat} from "../actions/fetchChatActionCreator";
import {update_user_profiles} from "../actions/contactsActionCreator";
import {store} from "../main";
import { updateContactProfiles } from './contactsHelper';


const socket = io('/users');

export function sendMessageToSocket(user, data){
	socket.emit("new message", {
		user : user,
		message : data
	});
}

export function createSocketUser(user){
	console.log("Creating chat room for user", user);
	socket.emit("join", user);
}

socket.on("new message", function(data){
	let contactProfiles = updateContactProfiles(data.conversation_id, store.getState().user_profiles.users, data);
	store.dispatch(update_user_profiles(contactProfiles));
	store.dispatch(append_message_to_chat(data.conversation_id, data))
});

