<?php
    session_start();
    if (!isset($_GET['user_active'])){ // redirect if not logged in
        header("location: login.php");
    }
?>
