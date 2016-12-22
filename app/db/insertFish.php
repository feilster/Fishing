<?php

include_once 'db.php';

$conn = mysqli_connect($servername, $username, $password, $dbname);
if(!$conn){
	die("Connection failed: " .mysqli_connecet_error());
}

$code = $mysqli->real_escape_string($_GET['code']);
$description = $mysqli->real_escape_string($_GET['description']);

$insertData = "INSERT INTO fish (code, description)  VALUES ('$code', '$description')";
$result = mysqli_query($conn, $insertData);

echo json_encode($result);

mysqli_close($conn);

?>
