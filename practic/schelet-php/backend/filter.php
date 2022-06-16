<?php

include 'dbCon.php';

if (isset($_GET['name'])) {
    $name = $_GET['name'];

    $sql = "SELECT * FROM entities WHERE `name` LIKE '%$name%';";

    $result = mysqli_query($con, $sql);
    $echoArray=Array();

    while($row = mysqli_fetch_assoc($result)){
        array_push($echoArray, $row);
    }

    echo json_encode($echoArray);


} else {
    echo json_encode(['error' => 'Input is wrong!']);
    exit();
}

mysqli_close($con);

?>