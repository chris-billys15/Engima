<?php
	$email = $mysqli->real_escape_string($_POST['email']);
	$result = $mysqli->query("SELECT * FROM user WHERE email='$email'");
	if ($result->num_rows == 0) {
		echo "<script>alert('Email belum terdaftar')</script>";
	} else {
		$user = $result->fetch_assoc();
		$hot = $user['username'];
		if (password_verify($_POST['password'], $user['password'])) {
			header("location: home.php?id_active=$hot");
		} else {
			echo "<script>alert('Password salah!')</script>";
		}
	}
?>
