<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    // include database and object files
    include_once '../config/database.php';
    include_once '../objects/genre.php';
    
    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // initialize object
    $genre = new Genre($db);
    
    // read products

    $query_genre = $_GET['genre'];

    //query products
    $stmt = $genre->read_name( $query_genre );
    $num = $stmt->rowCount();

    //check if more than 0 records found
    if ($num > 0)
    {
        //create result array
        $result_arr = array();
        $result_arr["records"] = array();

        //retrieve each row
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            //extract row content
            extract($row);

            $result_item = array(
                "genre_id" => $genre_id,
                "genre_name" => $genre_name
            );

            array_push( $result_arr["records"], $result_item );
        }
    
        //set HTTP response code
        http_response_code(200);

        //show products data in JSON
        echo json_encode( $result_arr );
    
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