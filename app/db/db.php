<?php
$servername = "localhost:3307";
$username = "root";
$password = "";
$dbname = "fishing";

$conn = new mysqli($servername, $username, $password, $dbname);
if(mysqli_connect_errno()){
	echo("Connection failed: " .mysqli_connect_error());
  exit();
}

?>
