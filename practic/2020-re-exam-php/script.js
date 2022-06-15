let usernameCurrent;
let currentPage = 0;
let entriesPerPage = 5;

function readCookie(name) {
    /**
     * Helper function to read a cookie.
     * @type {string}
     */
    let allCookies = document.cookie;

    // Get all the cookies pairs in an array
    let cookieArray = allCookies.split(';');

    // Now take key value pair out of this array
    for (let i = 0; i < cookieArray.length; i++) {
        let cookieName = cookieArray[i].split('=')[0];
        let cookieValue = cookieArray[i].split('=')[1];
        if(cookieName === name){
            return cookieValue;
        }
    }

    return '';
}


function getAllFiles() {
    event.preventDefault();
    let body = $('.table tbody').eq(0);
    let newBody = document.createElement('tbody');

    $.ajax( {
        type: "GET",
        url: "backend/getFilesByUser.php",
        success:  (data) => {
            $('#section').css("display", "block");
            insertData(newBody, data);
        }
    }).fail(console.error);

    body.replaceWith(newBody);
}


const insertData = (newBody, data) => {
    let result = JSON.parse(data);
    if(result.length == 0) {
        alert("You don't have any files!")
    }

    for (let file of result) {
        console.log(file);
        let newRow = newBody.insertRow();
        for (let index of ['id', 'userid', 'filename', 'filepath', 'size']) {
            let newCol = newRow.insertCell();
            let newText = document.createTextNode(file[index]);
            newCol.appendChild(newText);
        }
        newBody.append(newRow);
    }
}



/** ---- TABLE WITH PAGINATION client side --- **/

const insertDataPaginated = (newBody, data) => {
    let result = JSON.parse(data);
    console.log(result);
    for (let file of result) {
        let newRow = newBody.insertRow();

        if (result.indexOf(file) >= entriesPerPage * currentPage) {
            for (let index of ['id', 'userid', 'filename', 'filepath', 'size']) {
                let newCol = newRow.insertCell();
                let newText = document.createTextNode(file[index]);
                newCol.appendChild(newText);
            }
            newBody.append(newRow);
        }
        if (result.indexOf(file) >= entriesPerPage * currentPage + (entriesPerPage-1)) {
            break;
        }
    }
    maxPages = Math.floor(result.length / entriesPerPage);
    if (result.length % entriesPerPage != 0)
        maxPages = maxPages + 1;
    checkDisabledButtons();
}

function getFilesPaginated() {
    event.preventDefault();
    let body = $('.fileTablePaginated tbody').eq(0);
    let newBody = document.createElement('tbody');

    $.ajax( {
        type: "GET",
        url: "backend/getFilesByUser.php",
        success:  (data) => {
            $('#showFilesPaginated').css("display", "block");
            insertDataPaginated(newBody, data);
        }
    }).fail(console.error);

    body.replaceWith(newBody);
}


function next() {
    currentPage++;
    getFilesPaginated();
}

function prev() {
    if (currentPage > 0) {
        currentPage--;
    } 
    getFilesPaginated();
}

function checkDisabledButtons() {
    if (currentPage <= 0) {
        $('#previousButton').prop("disabled", true);
    } else {
        $('#previousButton').prop("disabled", false);
    }

    console.log(currentPage, maxPages)
    if (currentPage >= maxPages - 1) {
        $('#nextButton').prop("disabled", true);
    } else {
        $('#nextButton').prop("disabled", false);
    }
}


$( document ).ready(function() {
    usernameCurrent = readCookie("username");

    $('#loginForm').submit(function (e) {
        e.preventDefault();

        $.ajax( {
            type: "POST",
            url: "backend/login.php",
            data: $(this).serialize()
        }).then(function (response) {
            let data = JSON.parse(response);
            console.log(data);
            
            if (data.error) {
                alert(data.error);
                return;
            }

            location.href = "index.html";
        });
    });
});
