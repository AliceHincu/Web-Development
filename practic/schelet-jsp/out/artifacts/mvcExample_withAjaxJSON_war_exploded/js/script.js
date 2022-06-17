let usernameCurrent ="name1";// -> if you use this scrip and uncomment this line, you need to comment the other
// script in html because you will have 2global variables with the same name
let usernameCurrentPosition;
let headersPlayers = ['ID', "name", "position"];
let degreePlayers = [];

/**
 * Helper function to read a cookie.
 * @type {string}
 */
function readCookie(name) {
    let allCookies = document.cookie;

    // Get all the cookies pairs in an array
    let cookieArray = allCookies.split(';');
    console.log(cookieArray)

    // Now take key value pair out of this array
    for (let i = 0; i < cookieArray.length; i++) {
        let cookieName = cookieArray[i].split('=')[0];
        let cookieValue = cookieArray[i].split('=')[1];
        console.log(cookieName, cookieValue)
        if(cookieName === name){
            return cookieValue;
        }
    }

    return '';
}

function compare( a, b ) {
    if ( a.name < b.name ){
        return -1;
    }
    if ( a.name > b.name ){
        return 1;
    }
    return 0;
}


// INSERT DATA IN THE TABLE
const insertDataTable = (table, headers, data) => {
    table.empty();
    let content = '';

    // if(data.length == 0) {
    //     alert("You don't have any!")
    // }

    // --- add headers
    content += '<tr>';
    for(let header of headers) {
        content += `<th>${header}</th>`;
    }
    //content += '<th>Select</th>'
    content += '</tr>';

    // --- add body
    for (let entity of data) {
        content += '<tr>';
        for (let index of headers) {
            content += `<td>${entity[index]}</td>`;
        }
        //content += `<td><button onclick=selectedRow(${entity.id})>Select me</button></td>`;
        content += '</tr>';
    }

    table.append(content);
}

function filter(search_term){
    console.log(search_term);

    $.ajax( {
        type: "GET",
        url: "MyController",
        data: {
            // pass here what you need to pass
            action: "filter",
            name: search_term,
        },
        success:  (response) => {
            response = JSON.parse(response);
            response.sort(compare);
            console.log(response);
            let tableFilter = $('#table-filter');
            insertDataTable(tableFilter, headersPlayers, response);

        }
    }).fail(console.error);
}

function getDegree(){
    let degree = $('#degree-input').val();
    console.log(degree);
    if(degree != 1 && degree != 2 && degree != 3 ) {
        alert("Enter valid degree")
        return
    }

    console.log(readCookie("username"))
    $.ajax( {
        type: "GET",
        url: "MyController",
        data: {
            // pass here what you need to pass
            action: "getPlayersDegree",
            degree: degree,
            username: usernameCurrent,
        },
        success:  (response) => {
            response = JSON.parse(response);
            console.log(response);
            let tableFilter = $('#table');
            $('#get-section').css("display", "block");
            degreePlayers = response;
            insertDataTable(tableFilter, headersPlayers, response);
        }
    }).fail(console.error);
}

function isChecked(){
    // Get the checkbox
    var checkBox = document.getElementById("myCheck");

    // If the checkbox is checked, display the output text
    if (checkBox.checked === true){
        console.log("checked");

        $.ajax( {
            type: "GET",
            url: "MyController",
            data: {
                // pass here what you need to pass
                action: "getPositionPlayer",
                username: usernameCurrent,
            },
            success:  (response) => {
                response = JSON.parse(response);
                response = response[0];
                const result = degreePlayers.filter(player => {
                    console.log(player, response);
                    return player["position"] === response
                });
                console.log(result);
                let tableFilter = $('#table');
                insertDataTable(tableFilter, headersPlayers, result);
            }
        }).fail(console.error);
        //console.log(usernameCurrentPosition);


    } else {
        console.log("unchecked");
        let tableFilter = $('#table');
        insertDataTable(tableFilter, headersPlayers, degreePlayers);
    }
}

$( document ).ready(function() {
    //usernameCurrent = readCookie("username");
    console.log(usernameCurrent);
    //usernameCurrentPosition = readCookie("position");

    const search_input = document.getElementById('filter-input');
    let search_term = '';

    search_input.addEventListener('input', e => {
        // saving the input value
        search_term = e.target.value;

        // re-displaying
        filter(search_term);
    });



})