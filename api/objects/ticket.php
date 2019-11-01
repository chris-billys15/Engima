<?php
class Ticket
{

	// database connection and table name
	private $conn;
	private $tablename = "tiket";

	// object properties
	public $schedule_id;
	public $username;
	public $kursi;

	// constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}

	// read tickets
	public function read(){

		// query to select every row in the table
		$query = "SELECT * FROM " . $this->tablename;

		// prepare query
		$stmt = $this->conn->prepare($query);

		//evaluate query
		$stmt->execute();

		return $stmt;
	}

	// this method write new ticket to the database, the value that written is taken from ticket's properties (schedule_id, username, and kursi)
	public function create() {

		//query to insert record
		$query = "INSERT INTO `tiket` (`schedule_id`, `username`, `kursi`	) VALUES(". $this->schedule_id .", '". (string) $this->username ."', ". (string) $this->kursi .")";
		
		// prepare query
		$stmt = $this->conn->prepare($query);

		// bind values
		// $stmt->bindParam(":schedule_id", $this->schedule_id);
		// $stmt->bindParam(":username", $this->username);
		// $stmt->bindParam(":kursi", $this->kursi);

		// execute query
		if ($stmt->execute()) {
			return true;
		}

		return false;
	}


	// this method set ticket properties (schedule_id and kursi) to the one that match the username in the database
	public function read_user(){

			// query to read single ticket
			$query = "SELECT *  FROM " . $this->tablename . " WHERE username = :username" ;

			// prepare query statement
			$stmt = $this->conn->prepare($query);

			// bind values
			$stmt->bindParam(':username', $this->username);
			// execute query
			$stmt->execute();
			return $stmt;
			// get retrieved row
			// $row = $stmt->fetch(PDO::FETCH_ASSOC);

			// set values to object properties;
			// $this->schedule_id = $row['schedule_id'];
			// $this->kursi = $row['kursi'];
	}

	// this method returns rows that match certain schedule_id
	public function read_schedule(){

		// query to select every row that match the schedule_id
		$query = "SELECT * FROM ". $this->tablename . " WHERE schedule_id = :schedule_id " ;

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind param
		$stmt->bindParam(':schedule_id', $this->schedule_id);

		//execute query
		$stmt->execute();

		return $stmt;
	}

}