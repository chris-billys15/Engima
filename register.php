<?php
	if ($_SERVER['REQUEST_METHOD'] == 'POST')
	{
		if (isset($_POST['register']))
		{
			require 'api/user/create.php';
		}
	}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Register Engima</title>
    <link rel="stylesheet" href="register.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="validation.js"></script>
<head>
<body>
    <div class="wrap">
        <form method="POST" class="register-form" name="register-form" action="register.php"   onsubmit="return validateFormRegistrasi()">
            <div class="register-header">
                <h2>Welcome to <b>Engi</b>ma!</h2>
            </div>

            <div class="register-group">
              <label>Username</label>
              <input type="text" name="username" placeholder="john.johndoe" id="username" required>
              <div id="un" class="error"></div>
            </div>

            <div class="register-group">
              <label>Email Address</label>
              <input type="text" name="email" placeholder="john@email.com" id="email" required>
              <div id="em" class="error"></div>
            </div>

            <div class="register-group">
              <label>Phone Number</label>
              <input type="text" name="phone" placeholder="+62813xxxxxxxx" id="phone" required>
              <div id="pn" class="error"></div>
            </div>

            <div class="register-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="make as strong as possible" id="password" required>
              <div class="error" id="pass"></div>
            </div>

            <div class="register-group">
              <label>Confirm Password</label>
              <input type="password" name="confirm_password" placeholder="same as above" required>
              <div class="error" id="cpass"></div>
            </div>

            <div class="register-group">
              <label>Profil Picture</label>
              <input type="file" name="profil_pic" id="profil_pic"   >
            </div>

            <div class="register-group">
              <button type="submit"  name="register">Register </button>
            </div>
            <div class="form-footer">
              <p>Already have account? <a href="login.php">Login here</a> </p>
            </div>
        </form>
    </div><!--/.wrap-->
</body>
</html>
