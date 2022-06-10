<?php
    include 'databaseConnection.php';
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

    // Number of entries to show in a page
    $per_page_record = 4;

    // Look for a GET variable page if not found default is 1.        
    if (!isset ($_GET['page'])) {  
        $page = 1;  
    } else {  
        $page = (int)$_GET['page'];  
    }  

    // default values for categories
    foreach ($columns as $column_name){
        if($column_name === "Price"){
            if (!isset ($_GET["Price"]))
                $_GET["Price"] = ">";
            if (!isset ($_GET["Price-value"]))
                $_GET["Price-value"] = "0";
            continue;
        }

        if (!isset ($_GET[$column_name]))
            $_GET[$column_name] = "%";
    }

    // Build the query
    $query = "SELECT * FROM $table_name WHERE 1";
    foreach ($columns as $column_name){
        if($column_name === "Price"){
            $query = $query . ' AND Price ' . $_GET["Price"] . " " . $_GET["Price-value"] . " ";
            continue;
        }
        $query = $query . " AND " . $column_name . " LIKE '" . $_GET[$column_name] . "' ";
    }

    $result = mysqli_query($con, $query);
    $nr_rows = mysqli_num_rows($result);

    // Formula for pagination
    $start_from = ($page-1) * $per_page_record;

    // Retrieve data and display on webpage
    if($nr_rows - $start_from <= 0 || $page < 1){ // for next and prev conditions
        // echo "0 results"; //-> comment if it's for angular, uncomment otherwise
        return;
    }

    if($nr_rows - $start_from >= 4)
        $query = $query . "LIMIT $start_from, $per_page_record ";  
    else if($nr_rows - $start_from > 0){ // in case on the last page are less than 4
        $remaining_rows = ($nr_rows - $start_from);
        $query = $query . "LIMIT $start_from, $remaining_rows ";  
    } 

    //echo json_encode($query);

    $result = mysqli_query($con, $query);  

    $echoArray=Array();

	if($result->num_rows > 0){
		while($row = mysqli_fetch_assoc($result)){
			array_push($echoArray, $row);
		}
	} else {
		// echo "0 results"; //-> comment if it's for angular, uncomment otherwise
        return;
	}

	echo json_encode($echoArray);
	mysqli_close($con);
?>