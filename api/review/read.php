<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/review.php';

// instantiate database and ticket object
$database = new Database();
$db = $database->getConnection();

// instantiate review object
$review = new Review($db);

// get every record of review and count the number of record we got
$stmt = $review->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if ($num > 0){

	// review array
	$review_arr = array();
	$review_arr['records'] = array();


	//retrieve our table contents
	while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

		//extract row
		extract($row);

		$review_item = array(
			"username" => $username,
			"movie_id" => $movie_id,
			"skor" => $skor,
			"content" => $content,
		);

		array_push($review_arr['records'], $review_item);
	}

	// set response code - 200 OK
	http_response_code(200);

	// show reviews data in json format
	echo json_encode($review_arr);

}
