 
<?php
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$user = new User($db);
// set ID property of user to be edited
$user->username = isset($_GET['username']) ? $_GET['username'] : die();
$user->password = base64_encode(isset($_GET['password']) ? $_GET['password'] : die());
// read the details of user to be edited
$stmt = $user->login();
if($row=mysqli_fetch_array($result)){
    // get retrieved row
   // $row=mysqli_fetch_array($result)
    // create array
    $user_arr=array(
        "message" => "Successfully Login!",
        "username" => $row['username']
    );
}
else{
    $user_arr=array(
        "status" => false,
        "message" => "Invalid Username or Password!",
    );
}
// make it json format
print_r(json_encode($user_arr));
?>
