<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    // include database and object files
    include_once '../config/database.php';
    include_once '../objects/user.php';

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();
    // initialize object
    $movie = new User($db);

    //query products
    $stmt = $movie->read();
    $num = $stmt->rowCount();

    //check if more than 0 records found
    if ($num > 0)
    {
        //create result array
        $product_arr = array();
        $product_arr["records"] = array();

        //retrieve each row
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            //extract row content
            extract($row);

            $product_item = array(
              "username" => $username,
              "password" => $password,
              "email" => $email,
              "profile_pic" => $profile_pic,
              "phone" => $phone
            );

            array_push( $product_arr["records"], $product_item );
        }

        //set HTTP response code
        http_response_code(200);

        //show products data in JSON
        echo json_encode( $product_arr );

    }
    else
    {

        // set response code - 404 Not found
        http_response_code(404);

        // tell the user no products found
        echo json_encode(
            array("message" => "No movies found.")
        );
    }
