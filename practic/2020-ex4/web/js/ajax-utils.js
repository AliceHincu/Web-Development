function getUserPostsFromDb(username, callbackFunction){
	$.getJSON(
		"PostsController",
		{ action: 'getUserPosts', username: username },
		callbackFunction
	).fail(console.error);
}

function editPostInDb(postId, username, topicName, text, date, callbackFunction){
	$.post(
		"PostsController",
		{ action: 'updatePost',
			id: postId,
			username: username,
			topicName: topicName,
			text: text,
			date: date
		},
		callbackFunction
	).fail(console.error);
}

function addPostInDb(username, topicName, text, date, callbackFunction){
	$.post(
		"PostsController",
		{ action: 'addPost',
			username: username,
			topicName: topicName,
			text: text,
			date: date
		},
		callbackFunction
	).fail(console.error);
}

function getLastPost(callbackFunction) {
	$.getJSON(
		"PostsController",
		{
			action: "getLastPost",
		},
		callbackFunction
	).fail(console.error);
}
