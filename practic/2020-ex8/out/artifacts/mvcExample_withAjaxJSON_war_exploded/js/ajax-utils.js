function getMotherUsername(username, callbackFunction) {
	$.get(
		"FamilyController",
		{ action: 'getMotherUsername',
			username: username },
		callbackFunction
	);
}

function getFatherUsername(username, callbackFunction) {
	$.get(
		"FamilyController",
		{ action: 'getFatherUsername',
			username: username },
		callbackFunction
	);
}

function getFamilyOfUser(username, callbackFunction) {
	$.getJSON(
		"FamilyController",
		{ action: 'getFamily',
			username: username },
		callbackFunction
	);
}

function addFamilyInDb(username, mother, father, callbackFunction) {
	$.post(
		"FamilyController",
		{ action: 'addFamily',
			username: username,
			mother: mother,
			father: father
		},
		callbackFunction
	);
}

function getMotherLine(username, callbackFunction) {
	$.getJSON(
		"FamilyController",
		{ action: 'getDescendingLineMother',
			username: username },
		callbackFunction
	).fail(console.error);
}

function getFatherLine(username, callbackFunction) {
	$.getJSON(
		"FamilyController",
		{ action: 'getDescendingLineFather',
			username: username },
		callbackFunction
	).fail(console.error);
}