<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Credentials: true");
    header('Content-Type: application/json');

    // include database and object files
    include_once '../config/database.php';
    include_once '../objects/schedule.php';

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    // prepare schedule object
    $schedule = new schedule($db);

    $query_schedule = $_GET['schedule_id'];
    $stmt = $schedule->read_schedule( $query_schedule );
    $num = $stmt->rowCount();


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
              "nama_movie" => $nama_movie,
              "poster" => $poster,
              "movie_id" => $movie_id,
              "schedule_id" => $schedule_id,
              "jam" => $jam,
              "tanggal" => $tanggal
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
