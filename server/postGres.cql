//user table for login and user search;

CREATE TABLE userinfo (
	user_uid UUID NOT NULL DEFAULT uuid_generate_v4(),
	user_name VARCHAR(50) UNIQUE NOT NULL,
	email_id VARCHAR(50) UNIQUE NOT NULL,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	password VARCHAR(50) NOT NULL,
	time_created bigint NOT NULL,
	PRIMARY KEY(user_uid, user_name, email_id)
);


// request table that stores the friend request sent b/w users and maintain their status

CREATE TABLE friend_requests (
	request_id UUID NOT NULL DEFAULT uuid_generate_v4(),
	users_bond VARCHAR(50) UNIQUE NOT NULL,
	request_status VARCHAR(50) NOT NULL,
	status_time BIGINT NOT NULL,
	comments VARCHAR(50),
	PRIMARY KEY(request_id, users_bond)
);

// chat_list table provides the list of chats along with user information

CREATE TABLE chat_list (
	conversation_id UUID NOT NULL DEFAULT uuid_generate_v4(),
	users_bond VARCHAR(50) UNIQUE NOT NULL,
	last_message VARCHAR(50),
	created_time BIGINT NOT NULL,
	updated_time BIGINT,
	deleted_time BIGINT,
	PRIMARY KEY (conversation_id, users_bond)
);

// messages table will store all the messages between the users

CREATE TABLE messages (
	message_id SERIAL NOT NULL,
	conversation_id UUID NOT NULL,
	sender_id VARCHAR(50) NOT NULL,
	message_type VARCHAR(50) NOT NULL,
	message VARCHAR(50) NOT NULL,
	createdAt_time BIGINT NOT NULL,
	attachment_url VARCHAR(50) NOT NULL,
	attachment_thumb_url VARCHAR(50) NOT NULL
)

// subscription table will store user's notification authentication

CREATE TABLE subscription (
	user_name VARCHAR(50) UNIQUE NOT NULL,
	subscription VARCHAR(50),
	PRIMARY KEY (user_name)
)



