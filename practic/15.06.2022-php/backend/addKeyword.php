<?php

include 'dbCon.php';

if (isset($_POST['key']) && isset($_POST['value'])) {
    $key = $_POST['key'];
    $value = $_POST['value'];

    // check if key already exists
    $sql = "SELECT * FROM keyword WHERE `Key` = '$key';";

    $result = mysqli_query($con, $sql);

    $keywordId = -1;

    if ($row = mysqli_fetch_array($result)) {
        $keywordId = $row['key'];
    }

    if ($keywordId == -1) {
        $sql = "INSERT INTO keyword(`Key`, `Value`) VALUES ('$key','$value');";
    }

    if (mysqli_query($con, $sql)) {
        echo json_encode(['message' => "Keyword added successfully"]);
    } else {
        echo json_encode(['message' => "Keyword already exists"]);
    }


} else {
    echo json_encode(['message' => 'Key or value is wrong!']);
    exit();
}

mysqli_close($con);

?>