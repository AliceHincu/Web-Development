<?php

include 'dbCon.php';

if (isset($_COOKIE['username'])) {
    $username = $_COOKIE['username'];

    // get files of user
    $sql = "SELECT * FROM `files` WHERE userid IN (SELECT id FROM users where username='$username');";
    $result = mysqli_query($con, $sql);
    $echoArray=Array();

    while ($row = mysqli_fetch_assoc($result)) {
        array_push($echoArray, $row);
    } 
    
    echo json_encode($echoArray);
} else {
    echo json_encode(['error' => 'Not logged']);
}

mysqli_close($con);

?>