$(document).ready( function() {
    let today = getTodayDate();
    let tomorrow = getTomorrowDate();

    $('#today-date').append(today);
    $('#Check-in').attr("value", today);
    $('#Check-out').attr("value", tomorrow);

    getReservations();
});

function getReservations(){
    $.ajax({
        url:'backend/getReservations.php',
        type:'get',
        success:function(data){
            if(data !== "0 results"){
                emptyReservationTable();
                showReservations(data);
            } else {
                alert("There aren't any results");
            }
        }
    });
}

function emptyReservationTable(){
    $('#reservations').empty();
}

function showReservations(data){
    let innerHtml = "<table border='1'><tr><th>ID</th><th>RoomID</th><th>Check-in</th><th>Check-out</th></tr>"

    let reservationsObj = JSON.parse(data)
    for(let reservation of reservationsObj){
        innerHtml += "<tr>";
        for(let key in reservation){
        innerHtml += "<td>" + reservation[key] + "</td>";
        }
        innerHtml += "</tr>";
    }    

    innerHtml += "</table>";
    $(innerHtml).appendTo('#reservations')
}

// Helper functions
function getTodayDate(){
    let now = new Date();

    let day = now.getDate();
    if (day < 10) 
        day = "0" + day;

    let month = (now.getMonth() + 1);               
    if (month < 10) 
        month = "0" + month;
    
    let today = now.getFullYear() + '-' + month + '-' + day;
    return today;
}

function getTomorrowDate(){
    let next = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    let day = next.getDate();
    if (day < 10) 
        day = "0" + day;

    let month = (next.getMonth() + 1);               
    if (month < 10) 
        month = "0" + month;
    
    let tomorrow = next.getFullYear() + '-' + month + '-' + day;
    return tomorrow;
}

// add data to table
function submitForReserving(event){
    event.preventDefault(); // do not refresh when you submit
    
    let from = $("#Check-in").val();
    let to = $("#Check-out").val();
    let roomID = $("#Room-id").val();
    console.log("Here", from, to)

    if(validateDate(from, to, roomID)){
        $.ajax({
            url:'backend/postReservationDate.php',
            type:'post',
            data:{"Check-in":from,"Check-out":to,"Room-id":roomID},
            success:function(response){
                if(response === "New record created successfully")
                    getReservations();
                else 
                    alert(response);
            }
        });
    }   
}

function submitForCancel(event){
    event.preventDefault(); // do not refresh when you submit
    
    let reservationID = $("#Reservation-id-cancel").val();
    console.log(reservationID);
    if(validateReservation(reservationID)){
        $.ajax({
            url:'backend/deleteReservation.php',
            type:'post',
            data:{"Reservation-id":reservationID},
            success:function(response){
                if(response === "New record deleted successfully")
                    getReservations();
                else 
                    alert(response);
            }
        });
        
    } else {
        alert("Reservation ID not found!");
    }
}


/* ======== VALIDATIONS ========= */
function validateDate(date1, date2, roomID){
    let from = new Date(date1);
    let to = new Date(date2);

    if(!validateRoom(roomID)){
        alert("Room ID doesn't exist");
        return false;
    }

    if(from>=to){
        alert("Incorrect dates! Check-out date is before check-in date");
        return false;
    }

    let today = new Date(getTodayDate());
    console.log(today, from);
    if(today > from){
        alert("You can't reserve dates before today");
        return false;
    }

    reservedDates = getReservedIntervals(roomID);
    if(reservedDates){
        for(let date of reservedDates){
            if(isCheckinInInterval(from, date[0], date[1]) || isCheckoutInInterval(to, date[0], date[1])){
                alert("Incorrect dates! Interval or part of interval is already reserved!");
                return false;
            }
        }
    }

    return true;
}

function isCheckinInInterval(myDate, intervalDateLeft, intervalDateRight){
    if(intervalDateLeft <= myDate && myDate < intervalDateRight)  // you can check-in when others check-out
        return true;
    return false;
}

function isCheckoutInInterval(myDate, intervalDateLeft, intervalDateRight){
    if(intervalDateLeft < myDate && myDate <= intervalDateRight)  // you can check-out when others check-in
        return true;
    return false;
}

function getReservedIntervals(roomID){
    intervals = null;

    $.ajax({
        url:'backend/getRoomReservations.php',
        type:'get',
        async: false, // so i can return
        data:{"RoomID":roomID},
        success:function(data){
            console.log(data);
            if(data !== "0 results"){
                intervals = JSON.parse(data);
            } else {
                intervals = false;
            }
        }
    });

    if(intervals){
        intervals = intervals.map((reservation) => [new Date(reservation["CheckIn"]), new Date(reservation["CheckOut"])]);
    }
    return intervals;
}

function validateRoom(roomID){
    let rooms = [];

    $.ajax({
        url:'backend/getRoomsID.php',
        type:'get',
        async: false, // so i can return
        success:function(data){
            if(data !== "0 results")
                rooms = JSON.parse(data);
        }
    });

    for(let id of rooms){
        if(id == roomID)
            return true;
    }
    return false;
}

function validateReservation(resID){
    let res = [];

    $.ajax({
        url:'backend/getReservationsID.php',
        type:'get',
        async: false, // so i can return
        success:function(data){
            if(data !== "0 results")
                res = JSON.parse(data);
        }
    });

    for(let id of res){
        if(id == resID)
            return true;
    }
    return false;
}

