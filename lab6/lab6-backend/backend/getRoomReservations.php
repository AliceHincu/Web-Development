<?php
    include 'databaseConnection.php';
    header("Access-Control-Allow-Origin: *");


    if(!isset($_GET['RoomID']))
        $_GET['RoomID'] = 1;
    $roomID = $_GET['RoomID'];
    $query = "SELECT * FROM Reservations WHERE RoomID=$roomID";

    $result = mysqli_query($con, $query);
    $nr_rows = mysqli_num_rows($result);
    
    $echoArray=Array();

    if($result->num_rows > 0){
		while($row = mysqli_fetch_assoc($result)){
			array_push($echoArray, $row);
		}
	} else {
		echo "0 results";
        return;
	}

	echo json_encode($echoArray);
    mysqli_close($con);
?>