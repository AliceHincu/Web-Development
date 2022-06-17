
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

function getLastArticle(callbackFunction) {
	$.getJSON(
		"ArticlesController",
		{
			action: "getLastArticle",
		},
		callbackFunction
	).fail(console.error);
}