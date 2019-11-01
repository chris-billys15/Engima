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
// echo file_get_contents("php://input");
// echo "username is " . $data->username;
// echo "movie id is" . $data->movie_id;
// set review username and movie_id, but santize it first
$review->username = htmlspecialchars(strip_tags($data->username));
$review->movie_id = htmlspecialchars(strip_tags($data->movie_id));
// echo "username is " . $review->username;
// echo "movie id is" . $review->movie_id;

if($review->delete()){

	// set response code - 200 OK
	http_response_code(200);

	// tell the user
	echo json_encode(array("message" => "Review deleted"));
} else {

	// set response code - 503 Service Unavailable
	http_response_code(503);

	// tell the user
	echo json_encode(array("message" => "Unable to delete review"));
}
