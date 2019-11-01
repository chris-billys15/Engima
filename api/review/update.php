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
// var_dump($data);
// set username and movie_id of review to be edited
$review->username = htmlspecialchars(strip_tags($data->username));
$review->movie_id = htmlspecialchars(strip_tags($data->movie_id));

// set new skor and content of review
$review->skor = htmlspecialchars(strip_tags($data->skor));
$review->content = htmlspecialchars(strip_tags($data->content));

// update the review
if($review->update()){

	// set response code - 200 OK
	http_response_code(200);

	// tell user
	echo json_encode(array("message" => "Review updated."));
} else {

	// set response code - 503 Service unavailable
	http_response_code(503);

	//tell user
	echo json_encode(array("message" => "Unable to update review"));
}