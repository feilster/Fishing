<?php

include_once 'db.php';

if( isset($_POST['requestType']) && !empty( isset($_POST['requestType']) ) ){
	$type = $_POST['requestType'];

	switch ($type) {
		case "getFish":
			getFish($conn);
			break;
		case "insertFish":
			insertFish($conn);
			break;
		case "deleteFish":
			deleteFish($conn, $_POST['code']);
			break;
		case "updateFish":
			updateFish($conn, $_POST['code']);
			break;
		default:
		error("Invalid request");
	}
}else{
	error("Invalid request");
}

function getFish($conn){
	try{

		$data = array();

		$sql = "SELECT * FROM fish";

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

function insertFish($conn){
	try{
		$data = array();
		$code = $conn->real_escape_string(isset( $_POST['code'] ) ? $_POST['code'] : '');
		$description = $conn->real_escape_string(isset( $_POST['description'] ) ? $_POST['description'] : '');
		$water_type = $conn->real_escape_string(isset( $_POST['waterTypeCode'] ) ? $_POST['waterTypeCode'] : '');

		if($code == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Code cannot be empty';
		} else {
			$sql = "INSERT INTO fish (code, description, water_type)  VALUES ('$code', '$description', '$water_type')";
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

function deleteFish($conn, $code = ''){
	try{

		$data = array();
		$code = $conn->real_escape_string(isset( $_POST['code'] ) ? $_POST['code'] : '');

		if($code == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Code cannot be empty';
		} else {
			$sql = "DELETE FROM fish WHERE code = '$code'";
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

function updateFish($conn){
	try{
		$data = array();
		$code = $conn->real_escape_string(isset( $_POST['code'] ) ? $_POST['code'] : '');
		$type = $conn->real_escape_string(isset( $_POST['type'] ) ? $_POST['type'] : '');
		$sub_type = $conn->real_escape_string(isset( $_POST['subType'] ) ? $_POST['subType'] : '');
		$description = $conn->real_escape_string(isset( $_POST['description'] ) ? $_POST['description'] : '');
		$water_type = $conn->real_escape_string(isset( $_POST['waterTypeCode'] ) ? $_POST['waterTypeCode'] : '');
		$other_names = $conn->real_escape_string(isset( $_POST['otherNames'] ) ? $_POST['otherNames'] : '');

		if($code == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Code cannot be empty';
		} else {
			$sql = "update fish set type = '$type', sub_type = '$sub_type', description = '$description', water_type = '$water_type', other_names = '$other_names' where code = '$code'";
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
