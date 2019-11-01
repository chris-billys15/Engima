<?php

    error_reporting(E_ERROR | E_PARSE);
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Credentials: true");

    // include database and object files
    include_once 'api/config/database.php';
    include_once 'api/objects/user.php';

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    // prepare product object
    $user = new User($db);

    // set property of record to read
    $query_user = $_POST['email'];

    $stmt = $user->readOne( $query_user );

    $num = $stmt->rowCount();

    //check if more than 0 records found
    if ($num > 0)
    {
        //retrieve each row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $hot = $row['username'];
        if ($_POST['password'] == $row['password']) {
    			header("location: home.html");
    		} else {
    			echo "<script>alert('Password salah!')</script>";
    		}

    }
    else
    {
        echo "<script>alert('Email belum terdaftar')</script>";
    }
