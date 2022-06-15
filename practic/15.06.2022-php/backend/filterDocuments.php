<?php

include 'dbCon.php';

if (isset($_GET['title'])) {
    $title = $_GET['title'];

    $sql = "SELECT * FROM document WHERE title LIKE '%$title%';";

    $result = mysqli_query($con, $sql);
    $echoArray=Array();

    while($row = mysqli_fetch_assoc($result)){
        array_push($echoArray, $row);
    }

    echo json_encode($echoArray);


} else {
    echo json_encode(['error' => 'Key or value is wrong!']);
    exit();
}

mysqli_close($con);

?>