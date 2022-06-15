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

function addKeyword(){
    event.preventDefault();
    let key = $('#key').val();
    let value = $('#value').val();
    
    $.ajax( {
        type: "POST",
        url: "backend/addKeyword.php",
        data: {
            key: key,
            value: value
        },
        success:  (data) => {
            console.log(data);
        }
    }).fail(console.error);
}

function filterDocuments(){
    event.preventDefault();
    let title = $('#title').val();
    let table = $('.table');
    let list = $('.list');
    
    $.ajax( {
        type: "GET",
        url: "backend/filterDocuments.php",
        data: {
            title: title,
        },
        success:  (data) => {
            if(data.error){
                alert(data.error);
            } else {
                $('#section').css("display", "block");
                insertDataTableButton(table, ['id', 'title', 'listoftemplates'], data);
                insertDataListButton(list, ['id', 'title', 'listoftemplates'], data)
                //insertDataList(data)
            }
        }
    }).fail(console.error);
}

// INSERT DATA IN THE TABLE
const insertDataTableButton = (table, headers, data) => {
    table.empty();
    let content = '';

    let result = JSON.parse(data);
    if(result.length == 0) {
        alert("You don't have any documents!")
    }

    // add headers
    content += '<tr>';
    for(let header of headers) {
        content += `<th>${header}</th>`;
    }
    content += '<th>Select</th>'
    content += '</tr>';

    // add body
    for (let document of result) {
        content += '<tr>';
        for (let index of headers) {
            content += `<td>${document[index]}</td>`;
        }
        content += `<td><button onclick=selectedRow(${document.id})>Select me</button></td>`;
        content += '</tr>';
    }

    table.append(content);
}

// INSERT DATA IN THE LIST
const insertDataListButton = (list, headers, data) => {
    list.empty();
    let content = '';

    let result = JSON.parse(data);
    // if(result.length == 0) {
    //     alert("You don't have any documents!")
    // }

    for (let document of result) {
        content += '<li>';
        for (let index of headers) {
            content += `${index}: ${document[index]}   `;
        }
        content += `<button onclick=selectedRow(${document.id})>Select me</button>`;
        content += '</li>';
    }

    list.append(content);
}


const insertDataTable = (table, headers, data) => {
    table.empty();
    let content = '';

    // add headers
    content += '<tr>';
    for(let header of headers) {
        content += `<th>${header}</th>`;
    }
    content += '</tr>';

    // add body
    for (let template of data) {
        content += '<tr>';
        for (let index of headers) {
            content += `<td>${template[index]}</td>`;
        }
        content += '</tr>';
    }

    table.append(content);
}

function selectedRow(id) {
    console.log("Selected document is: ", id);

    $.ajax( {
        type: "GET",
        url: "backend/getTemplatesOfDocument.php",
        data: {
            documentId: id,
        },
        success:  (data) => {
            if(data.error){
                alert(data.error);
            } else {
                replaceKeywords(JSON.parse(data));
            }
        }
    }).fail(console.error);
}




function replaceKeywords(templates) {
    $.ajax( {
        type: "GET",
        url: "backend/getKeywords.php",
        success:  (data) => {
            data = JSON.parse(data);
            if(data.error){
                alert(data.error);
            } else {
                for(let template of templates) {
                    for(let keyword of data){
                        let key = keyword["Key"];
                        let value = keyword["Value"];
                        template["textcontent"] = template["textcontent"].replace(`{{${key}}}`, value);
                    }
                }

                let table = $('.table2');
                $('#section2').css("display", "block");
                
                insertDataTable(table, ['id', 'name', 'textcontent'], templates);
            }
        }
    }).fail(console.error);
}