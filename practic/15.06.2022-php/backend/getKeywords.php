<?php

include 'dbCon.php';


$sql = "SELECT * FROM keyword";
$result = mysqli_query($con, $sql);

$echoArray=Array();

while($row = mysqli_fetch_assoc($result)){
    array_push($echoArray, $row);          
} 

echo json_encode($echoArray);
    


mysqli_close($con);

?>