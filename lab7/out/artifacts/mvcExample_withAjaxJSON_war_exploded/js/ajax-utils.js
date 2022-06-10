function getCookieValue(name){
	return document.cookie.split('; ')
		.find(row => row.startsWith(name))
		.split('=')[1];
}

function getCities(callbackFunction) {
	$.getJSON(
		"CitiesController",
		{action: 'getCities'},
		callbackFunction
	)
}

function getFinalCities(callbackFunction) {
	let userId = getCookieValue("userId");
	$.getJSON(
		"CitiesController",
		{action: 'getFinalCities',
			userId: userId},
		callbackFunction
	)
}

function getNeighbours(currentCityId, callbackFunction) {
	$.getJSON(
		"CitiesController",
		{action: 'getNeighbours', currentCityId: currentCityId},
		callbackFunction
	)
}

function addCity(cityId, callbackFunction){
	let userId = getCookieValue("userId");

	$.post("CitiesController",
		{ action: "addCurrentCity",
			userId: userId,
			cityId: cityId,
		},
		callbackFunction
	)

}

function deleteCities(callbackFunction){
	let userId = getCookieValue("userId");

	$.post("CitiesController",
		{ action: "deleteCities",
			userId: userId
		},
		callbackFunction
	)
}

function undoCity(callbackFunction){
	let userId = getCookieValue("userId");

	$.post("CitiesController",
		{ action: "undoCity",
			userId: userId
		},
		callbackFunction
	)
}