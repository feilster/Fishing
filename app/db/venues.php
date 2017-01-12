<?php

include_once 'db.php';

if( isset($_POST['requestType']) && !empty( isset($_POST['requestType']) ) ){
	$type = $_POST['requestType'];

	switch ($type) {
		case "getVenues":
			getVenues($conn);
			break;
		case "insertVenue":
			insertVenue($conn);
			break;
		case "deleteVenue":
			deleteVenue($conn, $_POST['code']);
			break;
		case "updateVenue":
			updateVenue($conn, $_POST['code']);
			break;
		default:
		error("Invalid request");
	}
}else{
	error("Invalid request");
}

function getVenues($conn){
	try{

		$data = array();

		$sql = "SELECT v.code, v.body_of_water as bodyOfWater, v.name, v.comments, v.rates, b.code as bodyOfWaterCode, b.name as bodyOfWaterName ";
		$sql .= "FROM venues v ";
		$sql .= "INNER JOIN bodies_of_water b ON v.body_of_water = b.code";

		$result = mysqli_query($conn, $sql);

		if($conn->query( $sql )){
			$data['success'] = true;
			while($row = $result->fetch_assoc()){
				$data['records'][] = $row;
			}
		} else {
			$data['success'] = false;
			$data['message'] = 'Failed: ' . $conn->sqlstate . ' - ' . $conn->error;
		};

		$conn->close();
		echo json_encode($data);
		exit;

	}catch (Exception $e){
		error($e->getMessage());
	}
}

function insertVenue($conn){
	try{
		$data = array();
		$code = $conn->real_escape_string(isset( $_POST['code'] ) ? strtoupper($_POST['code']) : '');
		$bodyOfWater = $conn->real_escape_string(isset( $_POST['bodyOfWater'] ) ? $_POST['bodyOfWater'] : '');
		$name = $conn->real_escape_string(isset( $_POST['name'] ) ? $_POST['name'] : '');
		$rates = $conn->real_escape_string(isset( $_POST['rates'] ) ? $_POST['rates'] : '');
		$comments = $conn->real_escape_string(isset( $_POST['comments'] ) ? $_POST['comments'] : '');

		if($code == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Code cannot be empty';
		} else {
			$sql = "INSERT INTO venues (code, body_of_water, name, rates, comments)  VALUES ('$code', '$bodyOfWater', '$name', '$rates', '$comments')";
			if ($conn->query( $sql )) {
				$data['success'] = true;
				$data['message'] = "Successfully added";
			} else {
				$data['success'] = false;
				$data['message'] = 'Failed: ' . $conn->sqlstate . ' - ' . $conn->error;
			}
		}

		$conn->close();
		echo json_encode($data);
		exit;

	}catch (Exception $e){
		error($e->getMessage());
	}
}

function deleteVenue($conn, $code = ''){
	try{

		$data = array();
		$code = $conn->real_escape_string(isset( $_POST['code'] ) ? $_POST['code'] : '');

		if($code == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Code cannot be empty';
		} else {
			$sql = "DELETE FROM venues WHERE code = '$code'";
			if ($conn->query( $sql )) {
				$data['success'] = true;
				$data['message'] = "Successfully deleted";
			} else {
				$data['success'] = false;
				$data['message'] = 'Failed: ' . $conn->sqlstate . ' - ' . $conn->error;
			}
		}
			$conn->close();
			echo json_encode($data);
			exit;

	}catch (Exception $e){
		error($e->getMessage());
	}
}

function updateVenue($conn){
	try{
		$data = array();
		$code = $conn->real_escape_string(isset( $_POST['code'] ) ? strtoupper($_POST['code']) : '');
		$bodyOfWater = $conn->real_escape_string(isset( $_POST['bodyOfWater'] ) ? $_POST['bodyOfWater'] : '');
		$name = $conn->real_escape_string(isset( $_POST['name'] ) ? $_POST['name'] : '');
		$rates = $conn->real_escape_string(isset( $_POST['rates'] ) ? $_POST['rates'] : '');
		$comments = $conn->real_escape_string(isset( $_POST['comments'] ) ? $_POST['comments'] : '');

		if($code == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Code cannot be empty';
		} else {
			$sql = "update venues set body_of_water = '$bodyOfWater', name = '$name', rates = '$rates', comments = '$comments' where code = '$code'";
			if ($conn->query( $sql )) {
				$data['success'] = true;
				$data['message'] = "Successfully updated";
			} else {
				$data['success'] = false;
				$data['message'] = 'Failed: ' . $conn->sqlstate . ' - ' . $conn->error;
			}
		}

		$conn->close();
		echo json_encode($data);
		exit;

	}catch (Exception $e){
		error($e->getMessage());
	}
}

function error($errorMessage)
{
	$data = array();
	$data['success'] = false;
	$data['message'] = $errorMessage;
	echo json_encode($data);
	exit;
}

?>
