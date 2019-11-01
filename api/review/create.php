<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and review object
include_once '../config/database.php';
include_once '../objects/review.php';
 
$database = new Database();
$db = $database->getConnection();
 
$review = new Review($db);
 
// get posted data
$data = json_decode(utf8_encode(file_get_contents("php://input")));

// make sure data is complete
if (
	!empty($data->username) && 
	!empty($data->movie_id) &&
	!empty($data->skor) &&
	!empty($data->content)
) {

	// set review properties, but sanitize it first
	$review->username = htmlspecialchars(strip_tags($data->username));
	$review->movie_id = htmlspecialchars(strip_tags($data->movie_id));
	$review->skor = htmlspecialchars(strip_tags($data->skor));
	$review->content = htmlspecialchars(strip_tags($data->content));

	// write the review
	if($review->create()){

		// set response code - 200 OK
		http_response_code(200);

		// tell user
		echo json_encode(array("message" => "Review was created."));
	} else {

		// set response code - 503 Service Unavailable
		http_response_code(503);

		//tell user
		echo json_encode(array("message" => "Unable to create review."));
	}
} else { // if data is not complete

	// set response code - 400 Bad Request
	http_response_code(400);

	if(empty($data->username)){
		echo "no username specified";
	}
	if(empty($data->movie_id)){
		echo "no movie id specified";
	}
	if(empty($data->skor)){
		echo "no skor specified";
	}
	if(empty($data->content)){
		echo "no content specified";
	}
	// tell the user
	echo json_encode(array("message" => "Incomplete data."));
}
