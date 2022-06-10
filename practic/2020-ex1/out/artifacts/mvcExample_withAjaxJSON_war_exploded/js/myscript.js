// global variable
let usernameCurrent;

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

function getJournals(username) {
    /**
     * Get journals of a user from backend then populate dropdown.
     */
    getUserJournals(username, function (journals){
        populateJournalsDd(journals);
    })
}

function populateJournalsDd(journals) {
    for (let i = 0; i < journals.length; i++) {
        $('#userJournals').append('<option value="' + journals[i].id + '">' + journals[i].name + '</option>');
    }
}

function getArticles() {
    let journalId = $('#userJournals').val();
    getJournalArticles(journalId, function(articles){
        populateArticlesTable(articles);
    })
}


function populateArticlesTable(articles) {
    $('#articlesSection').css("display", "block");
    let table = $("#articlesTable");
    table.empty(); //

    table.append("<tr style='background-color: mediumseagreen'><td>Id</td><td>User</td><td>JournalId</td><td>Summary</td><td>Date</td></tr>");
    for(let article of articles) {
        table.append("<tr>" +
            "<td class='asset-name'>"+article.id+"</td>" +
            "<td>"+article.user+"</td>" +
            "<td>"+article.journalid+"</td>" +
            "<td>"+article["summary"]+"</td>" +
            "<td>"+article.date+"</td>" +
            "</tr>");
    }
}

function getTodayDate(){
    const today =  new Date();
    const day = today && today.getDate() || -1;
    const dayWithZero = day.toString().length > 1 ? day : '0' + day;
    const month = today && today.getMonth() + 1 || -1;
    const monthWithZero = month.toString().length > 1 ? month : '0' + month;
    const year = today && today.getFullYear() || -1;

    return `${year}-${monthWithZero}-${dayWithZero}`;
}

function addArticleToDb(event) {
    event.preventDefault();
    let journalName = $('#inputJournalName').val();
    let summary = $('#inputSummary').val();
    let username = usernameCurrent;
    let date = getTodayDate();
    console.log(journalName, summary, username, date);

    addArticle(username, journalName, summary, date, function (response){
        if(response){
            alert("Article was added!");
        } else {
            alert("Oops...something went wrong!");
        }
    });
}


function notifyNewArticles(){
    // If someone adds a new article, the current user will be notified
    // short polling
    let lastSeenArticle;
    getLastArticle(function (response) {
        lastSeenArticle = response[0];
        console.log(lastSeenArticle);

        // start loop
        setInterval(function () {
            getLastArticle(function (response) {
                let article = response[0];
                console.log("before: ", lastSeenArticle);
                console.log("after: ", article);
                console.log(lastSeenArticle.user, usernameCurrent);

                if(article.id !== lastSeenArticle.id && lastSeenArticle.user !== usernameCurrent){
                    alert("New article!" + article);
                    lastSeenArticle = article;
                } else {
                    console.log("Nothing changed");
                }
            });
        }, 5000);
    });

}

$(document).ready(function() {
    usernameCurrent = readCookie("username");
    pageCurrent = 1;
    notifyNewArticles();
})


