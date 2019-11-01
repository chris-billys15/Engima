<?php
	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	 
	// include database and object files
	include_once '../config/core.php';
	include_once '../config/database.php';
	include_once '../objects/movie.php';
	 
	// instantiate database and movie object
	$database = new Database();
	$db = $database->getConnection();
	 
	// initialize object
	$movie = new movie($db);
	 
	// get keywords
	$keywords=isset($_GET["movie"]) ? $_GET["movie"] : "";
	 
	// query movies
	$stmt = $movie->search($keywords);
	$num = $stmt->rowCount();
	 
	// check if more than 0 record found
	if($num>0){
	 
		// movies array
		$movies_arr=array();
		$movies_arr["records"]=array();
	 
		// retrieve our table contents
		// fetch() is faster than fetchAll()
		// http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			// extract row
			// this will make $row['name'] to
			// just $name only
			extract($row);
	 
			$movie_item=array(
                "movie_id" => $movie_id,
                "nama_movie" => $nama_movie,
                "poster" => $poster,
                "synopsis" => $synopsis,
                "release_date" => $release_date,
                "durasi" => $durasi
			);
	 
			array_push($movies_arr["records"], $movie_item);
		}
	 
		// set response code - 200 OK
		http_response_code(200);
	 
		// show movies data
		echo json_encode($movies_arr);
	}
	 
	else{
		// set response code - 404 Not found
		http_response_code(404);
	 
		// tell the user no movies found
		echo json_encode(
			array("message" => "No movies found.")
		);
	}
