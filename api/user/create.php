<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and review object
include_once '../config/database.php';
include_once '../objects/user.php';
include_once '../parse.php';
 
$database = new Database();
$db = $database->getConnection();
 
$user = new User($db);
 
// get posted data
// echo utf8_encode(file_get_contents("php://input"));
// $data = json_decode(utf8_encode(file_get_contents("php://input")));

$raw_data = utf8_encode(file_get_contents("php://input"));
//var_dump('raw data\n',$raw_data);
$parsed = parsejson($raw_data);

// var_dump($parsed);
// echo "username".$parsed['username'];
// foreach ($parsed as $key => $value) {
// 	# code...
// 	echo $key ;
// 	echo $value;
// }
// var_dump(parsejson(utf8_encode(file_get_contents("php://input"))));
// var_dump($data);
// make sure data is complete
if (
	!empty($parsed['username']) && 
    !empty($parsed['email']) &&
    !empty($parsed['phone']) && 
	!empty($parsed['password'])
) {

	// set review properties, but sanitize it first
	$user->username = (($parsed['username']));
	$user->email = ((($parsed['email'])));
    $user->phone = ((($parsed['phone'])));
    $user->password = ((($parsed['password'])));
    $user->profile_pic = ((($parsed['profile_pic'])));
    
	// $review->content = htmlspecialchars(strip_tags($data->content));

	// write the review
	if($user->create()){

		// set response code - 200 OK
		http_response_code(200);

		// tell user
		echo json_encode(array("message" => "User was created."));
	} else {

		// set response code - 503 Service Unavailable
		http_response_code(503);

		//tell user
		echo json_encode(array("message" => "Unable to create user."));
	}
} else { // if data is not complete

	// set response code - 400 Bad Request
	http_response_code(400);

	if(empty($parsed['username'])){
		echo "no username specified";
	}
	if(empty($parsed['schedule_id'])){
		echo "no schedule_id id specified";
	}
	if(empty($parsed['kursi'])){
		echo "no kursi specified";
	}
	// if(empty($data->content)){
	// 	echo "no content specified";
	// }
	// tell the user
	echo json_encode(array("message" => "Incomplete data."));
}
