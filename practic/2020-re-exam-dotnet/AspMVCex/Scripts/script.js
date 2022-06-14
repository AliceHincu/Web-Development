let currentPage = 0;
let entriesPerPage = 5;
let maxPages;
let currentUserId;

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
        if (cookieName === name) {
            return cookieValue;
        }
    }

    return '';
}

/** ---- NORMAL TABLE WITHOUT PAGINATION --- **/
const insertData = (newBody, data) => {
    let result = JSON.parse(data);
    console.log(result);
    for (let file of result) {
        let newRow = newBody.insertRow();
        for (let index of ['id', 'userid', 'filename', 'filepath', 'size']) {
            let newCol = newRow.insertCell();
            let newText = document.createTextNode(file[index]);
            newCol.appendChild(newText);
        }
        newBody.append(newRow);
    }
}

function getFiles(userid) {
    event.preventDefault();
    let body = $('.fileTable tbody').eq(0);
    let newBody = document.createElement('tbody');
    $.ajax({
        type: 'GET',
        url: "/Main/GetFilesByUser",
        data: { userid: userid },
        success: (data) => {
            $('#showFiles').css("display", "block");
            insertData(newBody, data);
        }
    })
    body.replaceWith(newBody);
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

function getFilesPaginated(userid) {
   // event.preventDefault();
    let body = $('.fileTablePaginated tbody').eq(0);
    let newBody = document.createElement('tbody');
    $.ajax({
        type: 'GET',
        url: "/Main/GetFilesByUser",
        data: { userid: userid },
        success: (data) => {
            $('#showFilesPaginated').css("display", "block");
            insertDataPaginated(newBody, data);
        }
    })
    body.replaceWith(newBody);
}


function next(userid) {
    currentPage++;
    getFilesPaginated(userid);
}

function prev(userid) {
    if (currentPage > 0) {
        currentPage--;
    } 
    getFilesPaginated(userid);
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


/** ---- TABLE WITH PAGINATION server side --- **/

const insertDataPaginatedServer = (newBody, data) => {
    let result = JSON.parse(data);
    console.log(result);

    if (currentPage <= 0) {
        $('#previousButton2').prop("disabled", true);
    } else {
        $('#previousButton2').prop("disabled", false);
    }

    if (result.length < entriesPerPage) {
        $('#nextButton2').prop("disabled", true);
    } else {
        $('#nextButton2').prop("disabled", false);
    }


    for (let file of result) {
        let newRow = newBody.insertRow();
        for (let index of ['id', 'userid', 'filename', 'filepath', 'size']) {
            let newCol = newRow.insertCell();
            let newText = document.createTextNode(file[index]);
            newCol.appendChild(newText);
        }
        newBody.append(newRow);
    }
    
}

function getFilesPaginatedServer(userid) {
    let body = $('.fileTablePaginatedServer tbody').eq(0);
    let newBody = document.createElement('tbody');
    $.ajax({
        type: 'GET',
        url: "/Main/GetFilesByUserPaginated",
        data: {
            userid: userid,
            currentPage: currentPage,
            pageSize: entriesPerPage
        },
        success: (data) => {
            $('#showFilesPaginatedServer').css("display", "block");
            insertDataPaginatedServer(newBody, data);
        }
    })
    body.replaceWith(newBody);
}

function next2(userid) {
    currentPage++;
    getFilesPaginatedServer(userid);
}

function prev2(userid) {
    if (currentPage > 0) {
        currentPage--;
    }
    getFilesPaginatedServer(userid);
}

function findMostPopularFile(userid) {
    $.ajax({
        type: 'GET',
        url: "/Main/GetFilesByUser",
        data: { userid: userid },
        success: (data) => {
            let array = JSON.parse(data);
            if (array.length == 0)
                return null;

            let freqMap = {};
            let maxCount = 0;

            for (let element of array) {
                var filename = element.filename;
                if (freqMap[filename] == null)
                    freqMap[filename] = 1;
                else
                    freqMap[filename]++;

                if (freqMap[filename] > maxCount) {
                    maxCount = freqMap[filename];
                }
            }

            let maxArray = [];
            for (let element of array) {
                var filename = element.filename
                if (freqMap[filename] === maxCount && !maxArray.includes(filename))
                    maxArray.push(filename);
            }

            let div = $('#mostPopularFiles');
            div.empty();
            div.append("<p> The most popular file(s): ");
            for (let f of maxArray) {
                div.append(f + ", ");
            }
            div.append(" ; with the count of: " + maxCount + "</p > ");
        }
    })
}

$(document).ready(() => {
    currentUserId = $('#hiddenValue').text();
    console.log(currentUserId);
})
