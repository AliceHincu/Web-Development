<?php
    include 'databaseConnection.php';
    header("Access-Control-Allow-Origin: *");


    $from = $_POST['Check-in'];
    $to = $_POST['Check-out'];
    $room_id = cleanUserInput($_POST['Room-id'], $con); 

    $query = "INSERT INTO Reservations (`RoomID`, `CheckIn`, `CheckOut`)
              VALUES ($room_id, '$from', '$to')";

    $result = mysqli_query($con, $query);
 
    if ($result === TRUE) {
        echo "New record created successfully";
      } else {
        echo "Error: " . $sql . "<br>" . $con->error;
    }
    mysqli_close($con);
?>