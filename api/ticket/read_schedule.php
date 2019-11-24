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

// set schedule_id for ticket, sanitize it first
$ticket->schedule_date = isset($_GET['schedule_date']) ? htmlspecialchars(strip_tags($_GET['schedule_date'])) : die();
$ticket->movie_id = isset($_GET['movie_id']) ? htmlspecialchars(strip_tags($_GET['movie_id'])) : die();

$stmt = $ticket->read_schedule_date();
$num = $stmt->rowCount();

if($num > 0){

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
			"seat_no" => $seat_no,
		);

		array_push($tickets_arr["records"], $ticket_item);
	}

	// set response code 200 - OK
	http_response_code(200);

	// show username and kursi in json format
	echo json_encode($tickets_arr);

} else {

	// set response code - 404 Not Found
	http_response_code(404);

	// tell the user ticket for such schedule does not exist
	echo json_encode(array("message" => "No tickets found for this schedule"));
}
