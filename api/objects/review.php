<?php
class Review 
{

	// database connection and tablename
	public $conn;
	public $tablename = "review";

	// object properties
	public $username;
	public $movie_id;
	public $skor;
	public $content;

	// constructor with $db as database connection
	public function __construct($db){

		$this->conn = $db;
	}

	// this method returns every row from the table
	public function read(){

		// query to select every row from the table
		$query = "SELECT * FROM " . $this->tablename;

		// prepare query
		$stmt = $this->conn->prepare($query);

		// evaluate query
		$stmt->execute();

		return $stmt;
	}

	// this method returns every row in the table that match the movie_id
	public function read_movie() {

		// query to select every review that match movie_id
		$query = "SELECT username, skor, content FROM " . $this->tablename . " WHERE movie_id=:movie_id" ;

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind param
		$stmt->bindParam(':movie_id', $this->movie_id);

		// evaluate query
		$stmt->execute();

		return $stmt;
	}

	// this method returns every row that match certain username
	public function read_user(){

		//query to select every review that match username
		$query = "SELECT movie_id, skor, content FROM " . $this->tablename . " WHERE username=:username";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind param
		$stmt->bindParam(':username', $this->username);


		// evaluate query
		$stmt->execute();

		return $stmt;

	}

	// this method write new review to database
	// returns true if success and false if not
	public function create() {

		// query to create new review
		$query = "INSERT INTO $this->tablename SET username=:username, movie_id=:movie_id, skor=:skor, content=:content";

		// prepare this query
		$stmt = $this->conn->prepare($query);

		// bind param
		$stmt->bindParam(':username', $this->username);
		$stmt->bindParam(':movie_id', $this->movie_id);
		$stmt->bindParam(':skor', $this->skor);
		$stmt->bindParam(':content', $this->content);

		// execute query
		if($stmt->execute()){

			return true;
		}

		return false;
	}

	// this method delete every row in database that match certain username and movie_id
	public function delete() {

		// query to delete row that match username and movie_id
		$query = "DELETE FROM ". $this->tablename . " WHERE username = :username AND movie_id = :movie_id";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// bind param
		$stmt->bindParam(':username', $this->username);
		$stmt->bindParam(':movie_id', $this->movie_id);

		// evaluate query
		if($stmt->execute()){
			return true;
		}

		return false;

	}

	// this method update row in database that match certain username and movie_id
	public function update() {

		// query to update row that match username and movie_id
		// $query = "UPDATE " . $this->tablename . " SET skor=:skor, content=:content WHERE username = " . $this->username . " AND movie_id = " . $this->movie_id;
		$query = "UPDATE ". $this->tablename. " SET skor = :skor, content = :content WHERE username = :username AND movie_id = :movie_id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind param
		$stmt->bindParam(':username', $this->username);
		$stmt->bindParam(':movie_id', $this->movie_id);
		$stmt->bindParam(':skor', $this->skor);
		$stmt->bindParam(':content', $this->content);

		//execute query 
		if($stmt->execute()){
			return true;
		}

		return false;


	}

	// this method returns true if user with certain username can give his review in certain movie
	// public function verification() {

	// 	// query to get release date of movie
	// 	$query_movie_date = "SELECT release_date FROM movie WHERE movie_id = $this->movie_id";

	// 	// prepare query 
	// 	$stmt = $this->conn->prepare($query_movie_date);

	// 	// execute query
	// 	$stmt->execute();

	// 	// get retrieved row
	// 	$row_date = $stmt->fetch(PDO::FETCH_ASSOC);

	// 	// query to get 

	// }


}