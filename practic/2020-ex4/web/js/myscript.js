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

function getUserPosts() {
    getUserPostsFromDb(usernameCurrent, function(response){
        populatePostsTable(response)
    })
}

function populatePostsTable(posts){
    /**
     * fill the table with posts of a user
     * @type {jQuery|HTMLElement|*}
     */
    let table = $('#tablePosts');
    table.empty();

    if(posts.length === 0){
        alert("You don't have any posts yet! You can create a new post down.")
    } else {
        table.append("<tr style='background-color: mediumseagreen'><td>Id</td><td>User</td><td>TopicName</td><td>Text</td><td>Date</td><td>Edit</td></tr>");

        for (let post of posts) {
            table.append("<tr>" +
                "<td class='asset-name'>" + post.id + "</td>" +
                "<td>" + post.user + "</td>" +
                "<td>" + post.topicname + "</td>" +
                "<td>" + post.text + "</td>" +
                "<td>" + post.date + "</td>" +
                "<td><button onclick='showEditSection(" + post.id +")'>Edit</button></td>" +
                "</tr>");

        }
    }
}


function showEditSection(postId) {
    /**
     * show edit post section
     * @type {jQuery|HTMLElement|*}
     */
    let form = $('#editForm');
    form.css("display", "block");
    form.append("<span style='font-weight: bold; background-color: mediumseagreen'>Edit Post</span>")
    form.append("<br/>");
    form.append("<label>Topic: </label>");
    form.append("<input type='text' id='inputTopic'>");
    form.append("<label>Text: </label>");
    form.append("<input type='text' id='inputText'>");
    form.append("<button onclick='editPost("+ postId +")'>Edit Post</button>")
}

function getTodayDate(){
    /**
     * Helper function to get today's date.
     * @type {Date}
     */
    const today =  new Date();
    const day = today && today.getDate() || -1;
    const dayWithZero = day.toString().length > 1 ? day : '0' + day;
    const month = today && today.getMonth() + 1 || -1;
    const monthWithZero = month.toString().length > 1 ? month : '0' + month;
    const year = today && today.getFullYear() || -1;

    return `${year}-${monthWithZero}-${dayWithZero}`;
}

function editPost(postId){
    /**
     * edit post in db
     */
    event.preventDefault();
    let topicName = $('#inputTopic').val();
    let text = $('#inputText').val();
    let username = usernameCurrent;
    let date = getTodayDate();

    editPostInDb(postId, username, topicName, text, date, function (response){
        if(response){
            alert("Post was edited!");
            $('#editForm').css("display", "none");
        } else {
            alert("Oops...something went wrong!");
        }

    });
}

function addPost(){
    /**
     * add post in db.
     */
    event.preventDefault();
    let topicName = $('#inputTopicAdd').val();
    let text = $('#inputTextAdd').val();
    let username = usernameCurrent;
    let date = getTodayDate();

    addPostInDb(username, topicName, text, date, function (response){
        if(response){
            alert("Post was added!");
        } else {
            alert("Oops...something went wrong!");
        }

    });
}

function notifyNewPosts() {
    /**
     *  If someone adds a new post, the current user will be notified.
     *  Uses short polling.
     */

    let lastSeenPost;
    getLastPost(function (response) {
        lastSeenPost = response[0];

        // start loop
        setInterval(function () {
            getLastPost(function (response) {
                let post = response[0];
                console.log("before: ", lastSeenPost);
                console.log("after: ", post);
                console.log(lastSeenPost.user, usernameCurrent);

                if (post.id !== lastSeenPost.id && lastSeenPost.user !== usernameCurrent) {
                    alert("New post! " + post.user + " said: " + post.text);
                    lastSeenPost = post;
                } else {
                    console.log("Nothing changed");
                }
            });
        }, 5000);
    });
}

$(document).ready(function() {
    // if we have 2 pages opened, we need global variable because the cookie value will change to the latest username.
    usernameCurrent = readCookie("username");

    notifyNewPosts();
})