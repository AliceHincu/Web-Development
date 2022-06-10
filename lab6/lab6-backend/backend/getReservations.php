<?php
    include 'databaseConnection.php';
    header("Access-Control-Allow-Origin: *");


    $query = "SELECT * FROM Reservations";
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