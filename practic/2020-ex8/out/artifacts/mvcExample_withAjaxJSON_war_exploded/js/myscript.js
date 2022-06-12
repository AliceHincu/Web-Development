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

function addMother(){
    event.preventDefault();

    let username = readCookie("username");
    getFamilyOfUser(username, function(response) {
        let motherOfUsername = response["mother"];
        let mother = $('#inputMotherNameOfMother').val();
        let father = $('#inputFatherNameOfMother').val();
        addFamilyInDb(motherOfUsername, mother, father, function (response) {
            if(response){
                disableMotherForm();
            } else {
                alert("Oops...Something went wrong!")
            }
        });
    })
}

function addFather(){
    event.preventDefault();

    let username = readCookie("username");
    getFamilyOfUser(username, function(response) {
        let fatherOfUsername = response["father"];
        let mother = $('#inputMotherNameOfFather').val();
        let father = $('#inputFatherNameOfFather').val();
        addFamilyInDb(fatherOfUsername, mother, father, function (response) {
            if(response){
                disableFatherForm();
            } else {
                alert("Oops...Something went wrong!")
            }
        });
    })
}

function descendingLineMother() {
    /**
     * Show mother descending family line. You add to the webpage a paragraph with all the mothers and disable the button
     * after
     * @type {string|string}
     */
    let username  = readCookie("username");
    getMotherLine(username, function (response){
        let paragraph = $('#descendingLineMother');

        paragraph.append("<p>")
        for(let mother of response){
            paragraph.append(mother + "<- ")
        }
        paragraph.append(" STOP </p>")

        $('#descendingLineMotherBtn').prop( "disabled", true );
    })
}

function descendingLineFather() {
    /**
     * Show father descending family line. You add to the webpage a paragraph with all the fathers and disable the button
     * after
     * @type {string|string}
     */
    let username  = readCookie("username");
    getFatherLine(username, function (response){
        let paragraph = $('#descendingLineFather');

        paragraph.append("<p>")
        for(let father of response){
            paragraph.append(father + "<- ")
        }
        paragraph.append(" STOP </p>")

        $('#descendingLineFatherBtn').prop( "disabled", true );
    })
}

function disableMotherForm(){
    /**
     * If mother has an entry in the Family Relations table, we disable the form
     */
    $('#addMotherFamily').append("<p>The mother already exists in the table!</p>");
    $( "#inputMotherNameOfMother" ).prop( "disabled", true );
    $( "#inputFatherNameOfMother" ).prop( "disabled", true );
    $( "#addMotherBtn" ).prop( "disabled", true );
}

function disableFatherForm(){
    /**
     * If father has an entry in the Family Relations table, we disable the form
     */
    $('#addFatherFamily').append("<p>The father already exists in the table!</p>");
    $( "#inputMotherNameOfFather" ).prop( "disabled", true );
    $( "#inputFatherNameOfFather" ).prop( "disabled", true );
    $( "#addFatherBtn" ).prop( "disabled", true );
}

function isMotherExisting() {
    /**
     * If mother already exists in the Family Relations table, then disable her form
     */
    let username = readCookie("username");
    getFamilyOfUser(username, function(response) {
        let mother = response["mother"];

        getFamilyOfUser(mother, function (response) {
            // if object is empty => the mother doesn't have a family added.

            if(Object.keys(response).length !== 0){
                disableMotherForm();
            }

            isFatherExisting();
        })

    })
}

function isFatherExisting() {
    /**
     * If father already exists in the Family Relations table, then disable his form
     */
    let username = readCookie("username");
    getFamilyOfUser(username, function(response) {
        let father = response["father"];

        getFamilyOfUser(father, function (response) {
            // if object is empty => the mother doesn't have a family added.

            if(Object.keys(response).length !== 0){
                disableFatherForm();
            }
        })

    })
}

$(document).ready(function() {
    isMotherExisting();
    //isFatherExisting(); => we chech the father after mother, because else we get 500ERROR since there are 2result sets
    // for the same statement.
})