<?php

include 'dbCon.php';
session_start();

if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // get usernames and passwords
    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = mysqli_query($con, $sql);

    if ($row = mysqli_fetch_array($result)) {
        // set cookie with the username
        $cookie_name = "username";
        $cookie_value = $username;
        setcookie($cookie_name, $cookie_value, time() + (86400 * 1), "/"); // 86400 = 1 day
        echo json_encode(['ok' => "It's all good, you can proceed..."]);
    } else {
        echo json_encode(['error' => 'Incorrect username and/or password']);
    }
} else {
    echo json_encode(['error' => 'No data inserted']);
}

mysqli_close($con);

?>