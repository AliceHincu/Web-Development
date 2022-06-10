let currentPage = 1;
let currentValues = [];
let columns = [];

// When we need to add the table again, we first need to get rid of the old one
function deleteData(){
    $('#rooms').empty();
}

/* ==== SHOW STUFF ON SCREEN ====*/

// Show form for filtering by categories
$.ajax({ // get the options for each dropdown and on succes build the form and then show the rooms
    url:"backend/getFilterOptions.php",
    method:"post",
    success:function(data){
        showForm(data);
        columnsReady();
    }
})

function showForm(data){
    let innterHtml = "";

    let categoriesObj = JSON.parse(data);
    console.log(categoriesObj);
    for(let [category, values] of Object.entries(categoriesObj)){
        columns.push(category);
        innterHtml += `<label for="${category}">${category}:</label>`;
        innterHtml += `<select name="${category}" id="${category}">`;
        if(category!="Price")
            innterHtml += `<option value="%">Any</option>`;
        for(let value of values){
            innterHtml += `<option value="${value}">${value}</option>`;
        }
        innterHtml += "</select>";
    }    

    // also add the input value price in case price is a column
    if(columns.includes("Price")){
        innterHtml+=`<input type="number" id="Price-value" name="Price-value" value="0">`;
    }

    // add the button
    innterHtml += `<input id="submit-btn" onclick="submitForFiltering(event)" type="submit" value="Submit">`;
    $(innterHtml).appendTo('#optionsForm');
}


// Show initially all rooms when you know the columns 
function columnsReady(){
    currentValues = getFilteredValues();
    $.ajax({
        url:"backend/viewPage.php",
        method:"post",
        async: true,
        success:function(data){
            showRooms(data);
        }
    })
}


function showRooms(data){
    console.log(data);

    let innerHtml = "<table border='1'><tr><th>ID</th>"
    columns.forEach(column => {
        innerHtml += `<th>${column}</th>`;
    })
    innerHtml += "</tr>";

    let roomsObj = JSON.parse(data)
    for(let room of roomsObj){
        innerHtml += "<tr>";
        for(let key in room){
        innerHtml += "<td>" + room[key] + "</td>";
        }
        innerHtml += "</tr>";
    }    

    innerHtml += "</table>";
    $(innerHtml).appendTo('#rooms')
}


/* ==== For pagination: next and prev buttons + filter oprion ====*/
function next(){
    let filteredValues = getFilteredValues();
    currentPage += 1;
    filteredValues["page"] = `${currentPage}`;
    
    sendToServer(filteredValues);
}

function prev(){
    let filteredValues = getFilteredValues();
    currentPage -= 1;
    filteredValues["page"] = `${currentPage}`;

    sendToServer(filteredValues);
}

function submitForFiltering(event){
    event.preventDefault(); // do not refresh when you submit
    filteredValues = getFilteredValues();
    currentPage = 1;
    filteredValues["page"] = `1`;
    
    sendToServer(filteredValues);
}

function sendToServer(myData){
    $.ajax({
        url:"backend/viewPage.php",
        method:"get",
        data:myData,
        success:function(data){
            if(data !== "0 results"){
                deleteData();
                showRooms(data);
            } else {
                alert("There aren't any results");
            }
        },
        error:function(xhr, status, error){
            alert(error);
        }
    });
}


// get filtered option
function getFilteredValues(){
    let filteredValues = {};
    columns.forEach(column => {
        filteredValues[`${column}`] = $(`#${column}`).val();
        if(column === "Price"){
            filteredValues["Price-value"] = $(`#Price-value`).val();
        }
    })
    return filteredValues;
}