$(document).ready(function(){
    // get all cities from db and put them in the dropdown
    getCities(function(cities) {
        $.each(cities, function (i, item) {
            $('#cities-select').append($('<option>', {
                value: item["CityId"],
                text : item["Name"]
            }));
        });
    })

});
function logout() {
    if (confirm("Want to log out?")) {
        $.ajax('LogoutController', {
            method: 'get',
            success: function () {
                $(location).attr("href", "/")
            }
        })
    }
}

function startJourney() {
    // js: get name and id of selected city then calls function to add it to db

    let startCityName = $("#cities-select option:selected").text();
    let startCityId = $("#cities-select").val();
    setCurrentCity(startCityName, startCityId);
}

function setCurrentCity(cityName, cityId) {
    addCity(cityId, function(response) {
        alert(response);
    })
    location.reload();

}

function onClickGetNeighbours(currentCityId) {
    $("#select-neighbour").remove();

    $("#journey").append("<section id='select-neighbour'></section>");
    $("#select-neighbour").append("<label>Select neighbour: </label>");
    $("#select-neighbour").append("<select id='neighbours' class='cities-select'></select><br>");
    $("#select-neighbour").append("<button id='select-neighbour-btn' class='btn' onclick='updateCurrentCity()'>Select neighbour</button><br>");

    let cityId = currentCityId;

    getNeighbours(cityId, function(neighbours) {
        $.each(neighbours, function (i, item) {
            $('#neighbours').append($('<option>', {
                value: item["CityId"],
                text : item["Name"]
            }));
        });
    })
}

function updateCurrentCity(){
    let newCityId = $("#neighbours").val();
    let newCityName = $("#neighbours option:selected").text();

    setCurrentCity(newCityName, newCityId);
}

function finishJourney() {
    $("#finish").html("<p class='welcome-text'>This is your journey!</p><br>")

    getFinalCities(function(cities) {
        for(let city of cities){
            $("#finish").append(city["Name"] + "->");
        }
        $("#finish").append("The end!!!!!!!");
        $("#undo-journey-btn").attr("disabled", true);
        $("#select-neighbour-btn").attr("disabled", true);
        $("#finish").append("<p>Do you want to give it another try?</p>");
        $("#finish").append("<button type='button' id='restart-journey-btn' onclick='restartJourney()' class='btn'>Restart journey</button>");
    })


}

function restartJourney() {
    deleteCities(function(response){alert(response)});
    location.reload();

}

function undoJourney(){
    undoCity(function(response){alert(response)});
    location.reload();
}
