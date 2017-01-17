<?php

include_once 'db.php';

if( isset($_POST['requestType']) && !empty( isset($_POST['requestType']) ) ){
	$type = $_POST['requestType'];

	switch ($type) {
		case "getSessions":
			getSessions($conn);
			break;
		case "insertSession":
			insertSession($conn);
			break;
		case "deleteSession":
			deleteSession($conn, $_POST['id']);
			break;
		case "updateSession":
			updateSession($conn, $_POST['id']);
			break;
		default:
		error("Invalid request");
	}
}else{
	error("Invalid request");
}

function getSessions($conn){
	try{

		$data = array();

		$sql = "SELECT s.id, s.date, s.venue, v.body_of_water as bodyOfWater, v.name as venueName ";
		$sql .= "FROM sessions s ";
		$sql .= "INNER JOIN venues v ON s.venue = v.code ";
		$sql .= "order by id desc";

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

function insertSession($conn){
	try{
		$data = array();
		$venue = $conn->real_escape_string(isset( $_POST['venue'] ) ? $_POST['venue'] : '');
		$date = $conn->real_escape_string(isset( $_POST['date'] ) ? $_POST['date'] : '');
		$date = date('Y-m-d', strtotime($date));

		if($venue == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Venue cannot be empty';
		} else {
			$sql = "INSERT INTO sessions (venue, date)  VALUES ('$venue', '$date')";
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

function deleteSession($conn, $id = ''){
	try{

		$data = array();
		$id = $conn->real_escape_string(isset( $_POST['id'] ) ? $_POST['id'] : '');

		if($id == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Id cannot be empty';
		} else {
			$sql = "DELETE FROM sessions WHERE id = '$id'";
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

function updateSession($conn){
	try{
		$data = array();
		$id = $conn->real_escape_string(isset( $_POST['id'] ) ? $_POST['id'] : '');
		$venue = $conn->real_escape_string(isset( $_POST['venue'] ) ? strtoupper($_POST['venue']) : '');
		$date = $conn->real_escape_string(isset( $_POST['date'] ) ? $_POST['date'] : '');

		if($id == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Id cannot be empty';
		} else {
			$sql = "update sessions set venue = '$venue', date = '$date' where id = '$id'";
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
