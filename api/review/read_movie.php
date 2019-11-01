<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/review.php';

// instantiate database and ticket object
$database = new Database();
$db = $database->getConnection();

// instatiate ticket object
$review = new Review($db);

// set username of ticket to get, dont forget to sanitize it
$review->movie_id = isset($_GET['movie_id']) ? htmlspecialchars(strip_tags($_GET['movie_id'])) : die();

// get every records that match the movie_id
$stmt = $review->read_movie();
$num = $stmt->rowCount();

// check if more than 0 found
if($num > 0){

	// create review array
	$review_arr = array();
	$review_arr['records'] = array();

	// retrieve our table content
	while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

		// extract row
		extract($row);

		// fill the array
		$review_item = array(
			"username" => $username,
			"skor" => $skor,
			"content" => $content,
		);

		array_push($review_arr['records'], $review_item);

	}

	// set response code - 200 OK
	http_response_code(200);

	// show review array in json format
	echo json_encode($review_arr);

} else {

	// set response code
	http_response_code(404);

	// tell the user
	echo json_encode(array("message" => "No reviews found for this movie"));
}