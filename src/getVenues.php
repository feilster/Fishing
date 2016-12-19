<?php 
   console.log('getting db');
$servername = "localhost:3306";
$username = "root";
$password = "password";
$dbname = "fishing";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if(!$conn){
	die("Connection failed: " .mysqli_connecet_error());
}

$showData = "SELECT * FROM venues";
$data = array();
$result = mysqli_query($conn, $showData);

if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result)){
		$data[] = $row;
	}
} else {
	echo "0 results";
};
print json_encode($data);
mysqli_close($conn);
?>