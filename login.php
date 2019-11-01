<?php
  	session_start();

  	if ($_SERVER['REQUEST_METHOD'] == 'POST')
  	{
    		if (isset($_POST['login']))
    		{
    			   require 'api/user/readOne.php';
    		}
  	}
?>

<!DOCTYPE html>
<head>
	<title>Bioskop Engima</title>
  <link rel="stylesheet" href="login.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<head>
<body>
    <div class="wrap">
        <form method="POST" class="login-form" action="login.php" name="myForm">
            <div class="form-header">
                <h2>Welcome to <b>Engi</b>ma!</h2>
            </div>
            <!--Email Input-->
            <div class="form-group">
              <label for="email">Email</label>
              <input type="text" name="email" placeholder="john@doe.com" id="email" required>
            </div>
            <!--Password Input-->
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" name="password" placeholder="place here"  id="password" required>
            </div>
            <!--Login Button-->
            <div class="form-group">
              <button name="login" type="submit">Login</button>
            </div>
            <div class="form-footer">
              <p>Don't have an account? <a href="register.php">Register here</a> </p>
            </div>

        </form>
    </div>
</body>
</html>
