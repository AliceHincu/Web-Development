
function getUserJournals(username, callbackFunction) {
	$.getJSON(
		"ArticlesController",
		{ action: 'getJournals', username: username },
		callbackFunction
	);
}

function getJournalArticles(journalId, callbackFunction) {
	$.getJSON(
		"ArticlesController",
		{ action: 'getArticles', journalId: journalId },
		callbackFunction
	).fail(console.error);
}

function getJournalId(journalName, callbackFunction) {
	$.getJSON(
		"ArticlesController",
		{ action: 'getJournalId', journalName: journalName},
		callbackFunction
	).fail(console.error);
}

function addArticle(username, journalName, summary, date, callbackFunction) {
	$.post(
		"ArticlesController",
		{ action: 'addArticle',
			journalName: journalName,
			username: username,
			summary: summary,
			date: date
		},
		callbackFunction
	).fail(console.error);
}

function getNewArticles(username, callbackFunction) {
	$.getJSON(
		"ArticlesController",
		{
			action: "getNewArticles",
			username: username
		},
		callbackFunction
	).fail(console.error);
}

function getUsers(callbackFunction) {
	$.getJSON(
		"ArticlesController",
		{
			action: "getUsers",
		},
		callbackFunction
	).fail(console.error);
}

function getLastArticle(callbackFunction) {
	$.getJSON(
		"ArticlesController",
		{
			action: "getLastArticle",
		},
		callbackFunction
	).fail(console.error);
}