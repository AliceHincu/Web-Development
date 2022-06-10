<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

    include 'databaseConnection.php';

    $reservation = json_decode(file_get_contents("php://input"), true);
    $from = $reservation['CheckIn'];
    $to = $reservation['CheckOut'];
    $room_id = $reservation['RoomID'];

    $query = "INSERT INTO Reservations (`RoomID`, `CheckIn`, `CheckOut`)
              VALUES ($room_id, '$from', '$to')";

    $result = mysqli_query($con, $query);
 
    if ($result === TRUE) {
        echo json_encode("New record created successfully");
    } else {
        echo json_encode("Oops...something went wrong. Here is the sql: " . $query);
    }
    mysqli_close($con);
?>