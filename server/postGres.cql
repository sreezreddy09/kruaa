//user table for login and user search;

CREATE TABLE user_info (
	username CHAR(20) PRIMARY KEY,
	email_id VARCHAR(50) PRIMARY KEY,
	first_name CHAR(20) NOT NULL,
	last_name CHAR(20) NOT NULL,
	full_name VARCHAR(50) NOT NULL,
	password CHAR(16) NOT NULL,
	time_created bigint NOT NULL
);


// request table that stores the friend request sent b/w users and maintain their status

CREATE TABLE friend_requests (
	request_id NOT NULL DEFAULT uuid_generate_v4(),
	users_bond VARCHAR(50) UNIQUE NOT NULL,
	request_status CHAR(16) NOT NULL,
	status_time BIGINT NOT NULL,
	comments VARCHAR
	PRIMARY KEY(request_id, users_bond)
);

// chat_list table provides the list of chats along with user information

CREATE TABLE chat_list (
	conversation_id NOT NULL DEFAULT uuid_generate_v4(),
	users_bond VARCHAR(50) UNIQUE NOT NULL,
	last_message VARCHAR(50),
	createdAt_time BIGINT NOT NULL,
	updatedAt_time BIGINT,
	deletedAt_time BIGINT,
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



