<?php

include_once 'db.php';

if( isset($_POST['requestType']) && !empty( isset($_POST['requestType']) ) ){
	$type = $_POST['requestType'];

	switch ($type) {
		case "getAnglers":
			getAnglers($conn);
			break;
		case "insertAngler":
			insertAngler($conn);
			break;
		case "deleteAngler":
			deleteAngler($conn, $_POST['id']);
			break;
		case "updateAngler":
			updateAngler($conn, $_POST['id']);
			break;
		default:
		error("Invalid request");
	}
}else{
	error("Invalid request");
}

function getAnglers($conn){
	try{

		$data = array();

		$sql = "SELECT id, first_name as firstName, surname, nick_name as nickName FROM anglers";

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

function insertAngler($conn){
	try{
		$data = array();
		$nickName = $conn->real_escape_string(isset( $_POST['nickName'] ) ? $_POST['nickName'] : '');
		$firstName = $conn->real_escape_string(isset( $_POST['firstName'] ) ? $_POST['firstName'] : '');
		$surname = $conn->real_escape_string(isset( $_POST['surname'] ) ? $_POST['surname'] : '');

		if($nickName == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Nick Name cannot be empty';
		} else {
			$sql = "INSERT INTO anglers (nick_name, first_name, surname)  VALUES ('$nickName', '$firstName', '$surname')";
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

function deleteAngler($conn, $id = ''){
	try{

		$data = array();
		$id = $conn->real_escape_string(isset( $_POST['id'] ) ? $_POST['id'] : '');

		if($id == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Id cannot be empty';
		} else {
			$sql = "DELETE FROM anglers WHERE id = '$id'";
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

function updateAngler($conn){
	try{
		$data = array();
		$id = $conn->real_escape_string(isset( $_POST['id'] ) ? strtoupper($_POST['id']) : '');
		$nickName = $conn->real_escape_string(isset( $_POST['nickName'] ) ? $_POST['nickName'] : '');
		$firstName = $conn->real_escape_string(isset( $_POST['firstName'] ) ? $_POST['firstName'] : '');
		$surname = $conn->real_escape_string(isset( $_POST['surname'] ) ? $_POST['surname'] : '');

		if($id == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Id cannot be empty';
		} else {
			$sql = "update anglers set nick_name = '$nickName', first_name = '$firstName', surname = '$surname' WHERE id = '$id'";
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
