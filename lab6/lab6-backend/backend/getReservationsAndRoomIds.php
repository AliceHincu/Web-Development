<?php
    include 'databaseConnection.php';
    header("Access-Control-Allow-Origin: *");


    $query = "SELECT * FROM Reservations";
    $result = mysqli_query($con, $query);
    $nr_rows = mysqli_num_rows($result);
    
    $echoArray=Array();
    $echoArray["reservations"] = Array();
    $echoArray["roomIds"] = Array();
    $reservations=Array();
    $roomIds=Array();

    if($result->num_rows > 0){
		while($row = mysqli_fetch_assoc($result)){
			array_push($echoArray["reservations"], $row);
		}
    }

    $query = "SELECT ID FROM Rooms";
    $result = mysqli_query($con, $query);
    $nr_rows = mysqli_num_rows($result);

    if($result->num_rows > 0){
		while($row = mysqli_fetch_assoc($result)){
			array_push($echoArray["roomIds"], $row["ID"]);
		}
	} else {
		echo "0 results";
        return;
	}

	echo json_encode($echoArray);
    mysqli_close($con);
?>