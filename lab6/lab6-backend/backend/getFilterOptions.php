<?php
    include 'databaseConnection.php';
    header("Access-Control-Allow-Origin: *");


    // get all possible options from which a user can choose(for drop-downs) except the price since you have to input it
    $echo_array = Array();

    foreach ($columns as $column_name){
        if($column_name === "Price"){
            $column_array = array('>', '<', "=");
            $echo_array[$column_name] = $column_array;
            continue;
        }
        // get the unique values in each columns for drop down options
        $query = "SELECT DISTINCT $column_name FROM Rooms ORDER BY $column_name";
        $unique_values = mysqli_query($con, $query);
        $column_array = Array();

        while($row = mysqli_fetch_assoc($unique_values)){
			array_push($column_array, $row[$column_name]);
		}

        // final array is of form: column_name => [unique_values_array]
        $echo_array[$column_name] = $column_array;
        
    }
    echo json_encode($echo_array);
	mysqli_close($con);
?>