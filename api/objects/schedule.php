<?php
class Schedule
{

    // database connection and table name
    public $conn;
    public $table_name = "schedule";

    // object properties
    public $nama_movie;
    public $movie_id;
    public $schedule_id;
    public $jam;
    public $tanggal;
    public $poster;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    function read_movie($movie_id)
    {
        $query = " SELECT m.nama_movie, m.poster, s.movie_id, s.schedule_id, s.jam, s.tanggal
                FROM ". $this->table_name . " s JOIN movie m
                ON s.movie_id = m.movie_id
                WHERE
                    s.movie_id = $movie_id" ;

        //prepare query statement
        $stmt = $this->conn->prepare( $query );

        //execute query
        $stmt->execute();

        return $stmt;
    }

    function read_schedule($schedule_id)
    {
        $query = " SELECT m.nama_movie, m.poster, s.movie_id, s.schedule_id, s.jam, s.tanggal
                FROM ". $this->table_name . " s JOIN movie m
                ON s.movie_id = m.movie_id
                WHERE
                    s.schedule_id = $schedule_id" ;

        //prepare query statement
        $stmt = $this->conn->prepare( $query );

        //execute query
        $stmt->execute();

        return $stmt;
    }
}
