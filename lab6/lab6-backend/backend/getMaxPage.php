<?php
    include 'databaseConnection.php';
    header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

    // Number of entries to show in a page
    $per_page_record = 4;

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

    // Get nr of rooms
    //$query = "SELECT * FROM $table_name";
    $result = mysqli_query($con, $query);
    $nr_rows = mysqli_num_rows($result);

    $max_page = intdiv($nr_rows, $per_page_record);
    if ($nr_rows % $per_page_record != 0){
        $max_page = $max_page + 1;
    }
	echo json_encode($max_page);
	mysqli_close($con);
?>