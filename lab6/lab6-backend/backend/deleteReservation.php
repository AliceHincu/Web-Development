<?php
    include 'databaseConnection.php';
    header("Access-Control-Allow-Origin: *");


    $reservation_id = $_POST['Reservation-id']; 

    $query = "DELETE FROM Reservations 
              WHERE ID=$reservation_id";

    $result = mysqli_query($con, $query);
 
    if ($result === TRUE) {
        echo "New record deleted successfully";
      } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
      }
    mysqli_close($con);
?>