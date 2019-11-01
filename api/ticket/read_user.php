<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/ticket.php';

// instantiate database and ticket object
$database = new Database();
$db = $database->getConnection();

// instatiate ticket object
$ticket = new Ticket($db);

// set username of ticket to get
$ticket->username = isset($_GET['username']) ? htmlspecialchars(strip_tags(($_GET['username']))) : die();

// get every record of ticket and count the number of record we got
$stmt = $ticket->read_user();
$num = $stmt->rowCount();


// check if more than 0 record found
if ($num > 0) {

	//create tickets array
	$tickets_arr = array();
	$tickets_arr["records"] = array();

	// retrieve our table contents
	
	while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
		// extract row
		// this will make row['name'] to
		// just $name only
		extract($row);
		
		// fill the array
		$ticket_item = array(
			"username" => $username,
			"kursi" => $kursi,
			"schedule_id" => $schedule_id,
		);

		array_push($tickets_arr["records"], $ticket_item);
	}

	// // build ticket array
	// $ticket_arr = array(
	// 	//"username" => $this->username,
	// 	"schedule_id" => $ticket->schedule_id,
	// 	"kursi" => $ticket->kursi,
	// );
	

	// set response code - 200 OK
	http_response_code(200);

	//show tickets data in json format
	echo json_encode($tickets_arr);

} else {

	// set response code - 404 Not Found
	http_response_code(404);

	//tell the user no ticket found
	echo json_encode(
		array("message" => "Ticket does not exist")
	);
}