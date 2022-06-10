<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

    include 'databaseConnection.php';

    $id = file_get_contents("php://input");

    $query = "DELETE FROM Reservations 
              WHERE ID=$id";

    $result = mysqli_query($con, $query);
 
    if ($result === TRUE) {
        echo json_encode("New record deleted successfully");
    } else {
        echo json_encode("Oops...something went wrong. Here is the sql: " . $query);
    }
    mysqli_close($con);
?>