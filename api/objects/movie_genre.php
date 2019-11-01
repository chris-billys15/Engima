<?php
class MovieGenre
{
 
    // database connection and table name
    public $conn;
    public $table_name = "movie_genre";
 
    // object properties
    public $movie_id;
    public $genre_id;
    public $genre_name;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    function read_movie( $movie_id )
    {
        $query = "SELECT * 
                    FROM  
                        movie_genre natural join genre 
                    WHERE
                        movie_id = '" . $movie_id . "'";

        //prepare query statement
        $stmt = $this->conn->prepare( $query );

        //execute query
        $stmt->execute();

        return $stmt;
    }
}




