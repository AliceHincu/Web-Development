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

$(document).ready(() => {
    currentUserId = $('#hiddenValue').text();
    console.log(currentUserId);
})
