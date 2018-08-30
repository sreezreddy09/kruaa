const io = require('socket.io-client');
import{append_message_to_chat} from "../actions/fetchChatActionCreator";
import {update_user_profiles} from "../actions/contactsActionCreator";
import {store} from "../main";
import { updateContactProfiles } from './contactsHelper';
import {UpdateApprovalStatusSuccessful} from "../actions/notificationActionCreator";



const socket = io('/users', {
	transports: ['websocket']
});
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
export function joinGroupChatRooms(rooms){
	rooms.forEach(room => {
		console.log("Creating chat room for group", room.user_uid);
		socket.emit("join", room.user_uid);
	});
}

export function sendChatInfoToSocket (user_uid, chat_info){
	let chatProfiles = [chat_info].concat(store.getState().user_profiles.users);
	store.dispatch(update_user_profiles(chatProfiles));
	let profile = {...chat_info, name : store.getState().user_info.user.name}
	socket.emit("chat profile", {
		user : user_uid,
		info : profile
	})
}

export function sendFriendRequestToSocket (user_uid, user_info){
	socket.emit("friend request", {
		user : user_uid,
		user_info : user_info
	})
}

socket.on("new message", function(data){
	let chatProfiles = updateContactProfiles(data.conversation_id, store.getState().user_profiles.users, data);
	store.dispatch(update_user_profiles(chatProfiles));
	store.dispatch(append_message_to_chat(data.conversation_id, data))
});

socket.on("chat profile", function(data){
	let chatProfiles = [data].concat(store.getState().user_profiles.users);
	store.dispatch(update_user_profiles(chatProfiles));
})

socket.on("friend request",  function(data){
	let approvals = store.getState().user_approvals.approvals;
	approvals.push(data);
	store.dispatch(UpdateApprovalStatusSuccessful(approvals));
})

socket.on("disconnect", function(reason){
	console.log("socket disconnected", reason);
	socket.connect();
	socket.emit("join", store.getState().user_info.user.user_uid);
	let rooms = store.getState().user_profiles.users.filter((d) => d.group_name);
	rooms.forEach(room => {
		console.log("Creating chat room for group", room.user_uid);
		socket.emit("join", room.user_uid);
	});
});

socket.on('reconnecting', (attemptNumber) => {
	console.log("socket reconnecting", attemptNumber);
  });

socket.on('reconnect_failed', () => {
	console.log("socket reconnecting");

});
