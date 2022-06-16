// global variable
let usernameCurrent;
let headersQuestions = ['ID', 'text', 'correctAnswer', 'wrongAnswer']; // same as the headers from the db

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


// INSERT DATA IN THE TABLE
const insertDataTable = (table, headers, data) => {
    table.empty();
    let content = '';

    if(data.length === 0) {
        alert("You don't have any!")
    }

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


function getQuestions(){
    let section = $('#get-section');
    let table = $('#table');

    $.ajax( {
        type: "GET",
        url: "QuizController",
        data: {
            // pass here what you need to pass
            action: "getQuestions"
        },
        success:  (response) => {
            console.log(response)
            response = JSON.parse(response);
            section.css("display", "block");
            insertDataTable(table, headersQuestions, response);
        }
    }).fail(console.error);
}

function startCreatingQuiz(){
    event.preventDefault();
    let nrQuestions = $('#nrQuestions').val();
    if(nrQuestions<=0){
        alert("Please enter valid nr question");
        return;
    }

    let sectionQuiz = $('#create-quiz');
    sectionQuiz.empty();
    sectionQuiz.append(`<br>`) ;
    sectionQuiz.append(`<label for='title'>Title:</label>`) ;
    sectionQuiz.append(`<input id='title' type="text" required>`) ;
    sectionQuiz.append(`<br>`) ;
    for(let i = 1; i <= nrQuestions; i++) {
        sectionQuiz.append(`<label for='question${i}'>Question ${i} ID:</label>`) ;
        sectionQuiz.append(`<input id='question${i}' type="text" required>`) ;
        sectionQuiz.append(`<br>`) ;
    }
    sectionQuiz.append(`<button onclick="createQuiz()">Create quiz</button>`) ;
}

function createQuiz(){
    let nrQuestions = $('#nrQuestions').val();
    let title = $(`#title`).val();
    let questions = "";

    for(let i = 1; i <= nrQuestions; i++) {
        let question = $(`#question${i}`).val()
        if(question === "") {
            alert("Please fill form");
            return
        } else {
            questions += question + ";";
        }
    }

    $.ajax( {
        type: "POST",
        url: "QuizController",
        data: {
            // pass here what you need to pass
            action: "addQuiz",
            title: title,
            questions: questions
        },
        success:  (response) => {
            console.log(response);
            alert(response);
        }
    }).fail(console.error);
}

function populateDropdown(dropdown, data) {
    dropdown.empty();

    for (let i = 0; i < data.length; i++) {
        dropdown.append('<option value="' + data[i].ID + '">' + data[i].title + '</option>');
    }
}

function getQuizzes(){
    event.preventDefault();
    // -- get for dropdown
    $.ajax( {
        type: "GET",
        url: "QuizController",
        data: {
            // pass here what you need to pass
            action: "getQuizzes"
        },
        success:  (response) => {
            response = JSON.parse(response);
            populateDropdown($('#dropdown'), response)
        }
    }).fail(console.error);
}

function startQuiz(){
    event.preventDefault();
    let id = $('#dropdown').val();
    window.location.replace("question.html?quizId=" + id + "&currentQuestionIndex=0");

}

$(document).ready(function() {
    // if we have 2 pages opened, we need global variable because the cookie value will change to the latest username.
    usernameCurrent = readCookie("username");

    getQuestions();


})
