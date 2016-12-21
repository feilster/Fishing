<?php 
$servername = "localhost:3307";
$username = "root";
$password = "";
$dbname = "fishing";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if(!$conn){
	die("Connection failed: " .mysqli_connecet_error());
}

$showData = "SELECT * FROM fish";
$data = array();
$result = mysqli_query($conn, $showData);

if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result)){
		$data[] = $row;
	}
} else {
	echo "0 results";
};
echo json_encode($data);
mysqli_close($conn);
?>