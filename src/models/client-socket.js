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
	let profile = {...chat_info, name : store.getState().user_info.user.name, user_uid :store.getState().user_info.user.user_uid}
	socket.emit("chat profile", {
		user : user_uid,
		info : profile
	})
}

export function CreateGroupWithSocket(group_name, group_users){
	socket.emit("create group", {
		group_name : group_name,
		group_users : group_users
	});
	
}

export function UpdateGroupWithSocket(group_id, group_users, user_name, deleted_users){
	socket.emit("update group", {
		user_name : user_name,
		group_id : group_id,
		group_users : group_users
	});

	socket.emit("delete group users", {
		group_id : group_id,
		deleted_users : deleted_users
	});
	
}


export function updateMessageCounter(conversation_id, user_name, isGroup){	
	socket.emit("reset unread count", {
		conversation_id : conversation_id,
		user_name : user_name,
		isGroup : isGroup
	});
}

export function sendFriendRequestToSocket (user_uid, user_info){
	socket.emit("friend request", {
		user : user_uid,
		user_info : user_info
	})
}

socket.on("new message", function(data){
	let chatProfiles;
	if(store.getState().chat_profile.user.conversation_id === data.conversation_id){
		chatProfiles = updateContactProfiles(data.conversation_id, store.getState().user_profiles.users, data, false);
		updateMessageCounter(data.conversation_id, store.getState().user_info.user.user_name, !!store.getState().chat_profile.user.group_name);
	}else{
		chatProfiles = updateContactProfiles(data.conversation_id, store.getState().user_profiles.users, data, true)
	}
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
});

socket.on("create group", function(data){
	data.users.map((user, i) => {
		if(user.user_uid === store.getState().user_info.user.user_uid){
			data.users.splice(i, 1);
		};
	});

	let user_list = data.users;
	let chatProfiles = store.getState().user_profiles.users;
	let checkIfGroupExists = chatProfiles.some((profile) => {
		return profile.conversation_id === data.conversation_id;
	});

	if(!checkIfGroupExists){
		data["unread_count"] = 0;
		let chatProfiles = [data].concat(store.getState().user_profiles.users);
		store.dispatch(update_user_profiles(chatProfiles));
		socket.emit("join", data.conversation_id);
	};
})

socket.on("update group", function (data){
	data.users.map((user, i) => {
		if(user.user_uid === store.getState().user_info.user.user_uid){
			data.users.splice(i, 1);
		};
	});
	let user_list = data.users;
	let chatProfiles = store.getState().user_profiles.users;
	let checkIfGroupExists = chatProfiles.some((profile) => {
		return profile.conversation_id === data.conversation_id;
	});

	if(!checkIfGroupExists){
		data["unread_count"] = 0;
		let chatProfiles = [data].concat(store.getState().user_profiles.users);
		store.dispatch(update_user_profiles(chatProfiles));
		socket.emit("join", data.conversation_id);
	}
	
	chatProfiles.map((profile) => {
		if(profile.conversation_id === data.conversation_id){
			profile.users = user_list;
		}
	});
});

socket.on("delete group users", function(data){
	store.getState().user_profiles.users.map((profile, i) => {
		if(profile.conversation_id === data){
			store.getState().user_profiles.users.splice(i, 1);
		}
	});
	store.getState().chat_profile.user = {};
	store.dispatch(update_user_profiles(store.getState().user_profiles.users));
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
