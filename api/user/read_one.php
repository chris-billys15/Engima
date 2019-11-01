<?php
// required headers
error_reporting(E_ERROR | E_PARSE);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$user = new User($db);

//switch condition
if(isset($_GET['username'])){
    $query = $_GET['username'];
    $stmt = $user->readOneUsername($query);
}
else if(isset($_GET['email'])){
    $query = $_GET['email'];
    $stmt = $user->readOneEmail($query);
}
else if(isset($_GET['phone'])){
    $query = $_GET['phone'];
    $stmt = $user->readOnePhone($query);
}

 
if($stmt->rowCount() > 0){

    //create result array
    $result_arr = array();
    $result_arr["records"] = array();

    //retrieve each row
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        //extract row content
        extract($row);

        $result_item = array(
            "username" =>  $username,
            "password" => $password,
            "email" => $email,
            "profile_pic" => $profile_pic,
            "phone" => $phone    
        );

        array_push( $result_arr["records"], $result_item );
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode( $result_arr );
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user product does not exist
    echo json_encode(array("message" => "User does not exist."));
}
?>
