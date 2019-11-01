<?php
class User
{

    // database connection and table name
    private $conn;
    private $table_name = "user";

    // object properties
    public $username;
    public $password;
    public $email;
    public $profile_pic = Null;
    public $phone;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    public function read()
    {
        $query = " SELECT * FROM " . $this->table_name;

        //prepare query statement
        $stmt = $this->conn->prepare( $query );

        //execute query
        $stmt->execute();

        return $stmt;
    }

  	public function create()
  	{

    		// query to insert record
    		$query = "INSERT INTO `user` (`username`, `password`, `email`, `profile_pic`, `phone`) VALUES ('".$this->username."', '".$this->password."', '".$this->email."', '".$this->profile_pic."', '".$this->phone."')";

    		//prepare query
    		$stmt = $this->conn->prepare($query);

    		// execute query
    		if($stmt->execute()) {
    			return true;
    		}

    		return false;

  	}


	// update the product
	public function update()
	{

  		// update query
  		$query = "UPDATE
  					" . $this->table_name . "
  				SET
  					username=:username, password=:password, email=:email, profile_pic=:profile_pic, phone=:phone
  				WHERE
  					username = :username";

  		// prepare query statement
  		$stmt = $this->conn->prepare($query);

  		// sanitize
  		$this->username=htmlspecialchars(strip_tags($this->username));
  		$this->password=htmlspecialchars(strip_tags($this->password));
  		$this->email=htmlspecialchars(strip_tags($this->email));
  		$this->profile_pic=htmlspecialchars(strip_tags($this->profile_pic));
  		$this->phone=htmlspecialchars(strip_tags($this->phone));

  		// bind new values
  		$stmt->bindParam(":username", $this->username);
  		$stmt->bindParam(":password", $this->password);
  		$stmt->bindParam(":email", $this->email);
  		$stmt->bindParam(":profile_pic", $this->profile_pic);
  		$stmt->bindParam(":phone", $this->phone);

  		// execute the query
  		if($stmt->execute()) {
  			return true;
  		}

  		return false;
	}

		// used when filling up the update product form
	public function readOne( $email )
	{
  			// query to read single record
  			$query = "SELECT * FROM user WHERE email='$email' ";

  			// prepare query statement
  			$stmt = $this->conn->prepare( $query );

  			// execute query
  			$stmt->execute();

        return $stmt;
	}

	// used when filling up the update product form
	public function readOneEmail( $query_email )
	{
  			// query to read single record
  			$query = "SELECT * FROM user WHERE email='$query_email' ";

  			// prepare query statement
  			$stmt = $this->conn->prepare( $query );

  			// execute query
  			$stmt->execute();

        return $stmt;
	}

	// used when filling up the update product form
	public function readOneUsername( $username )
	{
  			// query to read single record
  			$query = "SELECT * FROM user WHERE username='$username' ";

  			// prepare query statement
  			$stmt = $this->conn->prepare( $query );

  			// execute query
  			$stmt->execute();

        return $stmt;
	}

	// used when filling up the update product form
	public function readOnePhone( $phone )
	{
  			// query to read single record
  			$query = "SELECT * FROM user WHERE phone='$phone' ";

  			// prepare query statement
  			$stmt = $this->conn->prepare( $query );

  			// execute query
  			$stmt->execute();

        return $stmt;
	}

	// search products
	public function search($keywords)
	{
  		// select all query
  		$query = "SELECT
  						u.username, u.password, u.email, u.profile_pic, u.phone
  					FROM
  						" . $this->table_name . " u
  					WHERE
  						u.username LIKE ?
  					ORDER BY
  						u.username DESC";

  		// prepare query statement
  		$stmt = $this->conn->prepare($query);

  		// sanitize
  		$keywords=htmlspecialchars(strip_tags($keywords));
  		$keywords = "%{$keywords}%";

  		// bind
  		$stmt->bind_param('s', $keywords);

  			// execute query
  			$stmt->execute();
  			$result = $stmt->get_result();

  			$row = $result->fetch_assoc();


  			// set values to object properties
  			$this->username = $row['username'];
  			$this->password = $row['password'];
  			$this->email = $row['email'];
  			$this->profile_pic = $row['profile_pic'];
  			$this->phone = $row['phone'];

	}


	public function login()
	{
			// select all query
			$query = "SELECT
						`username`, `password`
					FROM
						" . $this->table_name . "
					WHERE
						username='".$this->username."' AND password='".$this->password."'";
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			// execute query
			$stmt->execute();
			return $stmt;
	}

}
