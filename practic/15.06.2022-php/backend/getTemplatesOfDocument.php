<?php

include 'dbCon.php';

if (isset($_GET['documentId'])) {
    $id = $_GET['documentId'];

    $sql = "SELECT * FROM document WHERE id = $id;";

    $result = mysqli_query($con, $sql);

    $echoArray=Array();

    if($row = mysqli_fetch_assoc($result)){
        $templates = explode(";", $row['listoftemplates']);
        
        foreach($templates as $key => $val){
            if($val != null){
                // val represents id of template
                $sql = "SELECT * FROM template WHERE id = $val;";
                $result = mysqli_query($con, $sql);
                if($row = mysqli_fetch_assoc($result)){
                    array_push($echoArray, $row);
                }
            }
        } 

        echo json_encode($echoArray);
        
    } else {
        echo json_encode(['error' => 'Document with that id does not exist!']);
        exit();
    }


} else {
    echo json_encode(['error' => 'Document id is nor set!']);
    exit();
}

mysqli_close($con);

?>