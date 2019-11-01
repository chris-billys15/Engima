<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/ticket.php';

// instantiate database and ticket object
$database = new Database();
$db = $database->getConnection();

// instatiate ticket object
$ticket = new Ticket($db);

// get every record of ticket and count the number of record we got
$stmt = $ticket->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if ($num > 0) {

	// ticket array
	$ticket_arr = array();
	$ticket_arr["records"] = array();

	//retrieve our table contents
	while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
		// extract row
		// this will make $row['name'] to 
		// just name only
		extract($row);

		$ticket_item = array(
			"schedule_id" => $schedule_id,
			"username" => $username,
			"kursi" => $kursi,
		);

		array_push($ticket_arr["records"], $ticket_item);
	}

	// set response code - 200 OK
	http_response_code(200);

	//show tickets data in json format
	echo json_encode($ticket_arr);

} else {

	// set response code - 404 Not Found
	http_response_code(404);

	//tell the user no ticket found
	echo json_encode(
		array("message" => "No tickets found")
	);
}