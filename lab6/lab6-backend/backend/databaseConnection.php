<?php
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 01 Jan 1996 00:00:00 GMT');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials');
header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// Here we connect to the database and find the table name and the columns that we need 
$con = mysqli_connect("localhost", "root", "", "roomsmanagementdb");
if (!$con) {
    die('Could not connect: ' . mysqli_error());
}

function clean($data){
    $data = htmlspecialchars($data); // function converts some predefined characters to HTML entities. ex: & (ampersand) becomes &amp;
    $data = stripslashes($data); // removes backslashes
    $data = trim($data); // removes whitespace and other predefined characters from both sides of a string.
    return $data;
}

function cleanUserInput($userinput, $con) {
    if (empty($userinput)) {
        return;
    } else {
        $userinput = clean($userinput);
        
        // Clean input using the database  
        $userinput = mysqli_real_escape_string($con, $userinput);
        }
        
    // Return a cleaned string
    return $userinput;
}

// all columns for the Rooms table from which we can receive an input from the user
$table_name = "Rooms";
$query = "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N" . "'$table_name'" ;
$result = mysqli_query($con, $query); 
$columns = Array();

while($row = mysqli_fetch_assoc($result)){
    if ($row["COLUMN_NAME"] !== "ID")
        array_push($columns, $row["COLUMN_NAME"]);
}
?>