<?php
class Genre
{
 
    // database connection and table name
    public $conn;
    public $table_name = "genre";
 
    // object properties
    public $genre_id;
    public $genre_name;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    function read_name($name)
    {
        $query = " SELECT * 
                FROM "  
                    . $this->table_name . "
                WHERE 
                    genre.genre_name = '". $name . "'";

        //prepare query statement
        $stmt = $this->conn->prepare( $query );

        //execute query
        $stmt->execute();

        return $stmt;
    }
}




