<?php
class Movie
{
 
    // database connection and table name
    public $conn;
    public $table_name = "movie";
 
    // object properties
    public $movie_id;
    public $nama_movie;
    public $poster;
    public $synopsis;
    public $release_date;
    public $durasi;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    function read()
    {
        $query = " SELECT * FROM " . $this->table_name;

        //prepare query statement
        $stmt = $this->conn->prepare( $query );

        //execute query
        $stmt->execute();

        return $stmt;
    }
    
    function search($keywords){
 
        // select all query
        $query = "SELECT * FROM `" .$this->table_name. "` WHERE nama_movie LIKE '%" .$keywords. "%'";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $keywords=htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";
    
        // bind
        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);
        $stmt->bindParam(3, $keywords);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
	}
	
	public function readPaging($from_record_num, $records_per_page){
	 
		// select query
		$query = "SELECT *
				FROM
					" . $this->table_name . " p
				LIMIT ?, ?";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind variable values
		$stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
		$stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);
	 
		// execute query
		$stmt->execute();
	 
		// return values from database
		return $stmt;
	}
	
	// used for paging products
	public function count(){
		$query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";
	 
		$stmt = $this->conn->prepare( $query );
		$stmt->execute();
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		return $row['total_rows'];
	}
}




