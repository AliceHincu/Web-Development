let currentPage = 0;
let entriesPerPage = 5;
let maxPages;
let currentUserId;

/** ---- NORMAL TABLE WITHOUT PAGINATION --- **/
const insertData = (newBody, data) => {
    let result = JSON.parse(data);
    console.log(result);
    for (let file of result) {
        let newRow = newBody.insertRow();
        for (let index of ['id', 'projectManagerID', 'name', 'description', 'members']) {
            let newCol = newRow.insertCell();
            let newText = document.createTextNode(file[index]);
            newCol.appendChild(newText);
        }
        newBody.append(newRow);
    }
}

function getProjects(userid) {
    event.preventDefault();
    let body = $('.projectTable tbody').eq(0);
    let newBody = document.createElement('tbody');
    $.ajax({
        type: 'GET',
        url: "/Main/GetProjectsByDev",
        data: { userid: userid },
        success: (data) => {
            $('#showProjects').css("display", "block");
            insertData(newBody, data);
        }
    })
    body.replaceWith(newBody);
}

function getProjectsMemberOf(name) {
    event.preventDefault();
    let body = $('.projectTable2 tbody').eq(0);
    let newBody = document.createElement('tbody');
    $.ajax({
        type: 'GET',
        url: "/Main/GetProjectsMemberOf",
        data: { username: name },
        success: (data) => {
            $('#showProjects2').css("display", "block");
            insertData(newBody, data);
        }
    })
    body.replaceWith(newBody);
}

function addDevToProjects() {
    event.preventDefault();
    let name = $('#name').val();
    let projects = $('#projects').val();
    $.ajax({
        type: 'POST',
        url: "/Main/AddDevToProjects",
        data: {
            devname: name,
            projects: projects
        },
        success: (data) => {
            console.log(data);
        }
    })
}


const insertData2 = (newBody, data) => {
    let result = JSON.parse(data);
    console.log(result);
    for (let file of result) {
        let newRow = newBody.insertRow();
        for (let index of ['id', 'name', 'age', 'skills']) {
            let newCol = newRow.insertCell();
            let newText = document.createTextNode(file[index]);
            newCol.appendChild(newText);
        }
        newBody.append(newRow);
    }
}

function getDevs() {
    event.preventDefault();
    let body = $('.developersTable tbody').eq(0);
    let newBody = document.createElement('tbody');
    $.ajax({
        type: 'GET',
        url: "/Main/GetDevelopers",
        success: (data) => {
            $('#showDevelopers').css("display", "block");
            insertData2(newBody, data);
        }
    })
    body.replaceWith(newBody);
    
}

function filter() {
    event.preventDefault();
    let body = $('.developersTable tbody').eq(0);
    let newBody = document.createElement('tbody');
    $.ajax({
        type: 'GET',
        url: "/Main/GetDevelopers",
        success: (data) => {
            devs = JSON.parse(data);
            let skill = $('#filter').val();
            devs = devs.filter(dev => { let r = dev.skills.includes(skill); console.log(dev, r); return r; })

            insertData2(newBody, JSON.stringify(devs));
        }
    })
    body.replaceWith(newBody);
}

$(document).ready(() => {
    currentUserId = $('#hiddenValue').text();
    console.log(currentUserId);
})
