let quizId;
let currentQuestionIndex;

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

function setCookie(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (2*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function showQuestion(question){
    console.log(question);
    let section = $('#show-question');
    section.append(`<p>Question number ${(Number(currentQuestionIndex)+1)}</p>`)
    section.append(`<p>${question.text}?</p>`)
    section.append(`<input type="radio" id="true" name="answer" value="${question.correctAnswer}">`)
    section.append(`<label for="true">${question.correctAnswer}</label>`)
    section.append(`<input type="radio" id="false" name="answer" value="${question.wrongAnswer}">`)
    section.append(`<label for="false">${question.wrongAnswer}</label>`)
    section.append(`<button onclick="next()">Next</button>`)
}

function next(){
    event.preventDefault();
    let answer = $("input[name='answer']:checked").val();
    console.log(answer);
    console.log(readCookie("answers"));

    //window.location.replace("question.html?quizId=" + quizId + "&currentQuestionIndex=" + (Number(currentQuestionIndex)+1));
}

$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    quizId = urlParams.get('quizId')
    currentQuestionIndex = urlParams.get('currentQuestionIndex')
    if(currentQuestionIndex === 0) {
        setCookie("answers", []);
    }

    $.ajax( {
        type: "GET",
        url: "QuizController",
        data: {
            // pass here what you need to pass
            action: "getQuestionBasedOnIndex",
            quizId: quizId,
            index: currentQuestionIndex
        },
        success:  (response) => {
            response = JSON.parse(response);
            if(response.message){
                alert("You finished!")
                window.location.replace("success.jsp");
            } else {
                showQuestion(response[0]);
            }

        }
    }).fail(console.error);


})