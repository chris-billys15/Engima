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

// isntantiate review 
$review = new Review($db);

// set username of review to get, but sanitize it first
$review->username = isset($_GET['username']) ? htmlspecialchars(strip_tags($_GET['username'])) : die();

$stmt = $review->read_user();
$num = $stmt->rowCount();

if($num > 0){

	// create review array
	$reviews_arr = array();
	$reviews_arr['records'] = array();

	// retrieve our table contents
	while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

		// extract row
		extract($row);

		// fill the array
		$review_item = array(
			"movie_id" => $movie_id,
			"skor" => $skor,
			"content" => $content,
		);

		array_push($reviews_arr['records'], $review_item);
	}

	// set response code - 200 OK
	http_response_code(200);

	// tell the user
	echo json_encode(array($reviews_arr));
} else {

	// set response code - 404 Not Found
	http_response_code(404);

	// tell the user
	echo json_encode(array("message" => "No review found for this user"));
}