<?php

include_once 'db.php';

if( isset($_POST['requestType']) && !empty( isset($_POST['requestType']) ) ){
	$type = $_POST['requestType'];

	switch ($type) {
		case "getCatches":
			getCatches($conn);
			break;
		case "insertCatch":
			insertCatch($conn);
			break;
		case "deleteCatch":
			deleteCatch($conn, $_POST['id']);
			break;
		case "updateCatch":
			updateCatch($conn, $_POST['id']);
			break;
		default:
		error("Invalid request");
	}
}else{
	error("Invalid request");
}

function getCatches($conn){
	try{

		$data = array();

		$sql = "SELECT c.id, c.session, c.angler, c.fish, c.weight, c.amount, s.date as sessionDate, s.venue as sessionVenue, ";
		$sql .= "a.nick_name as anglerName, s.date as sessionDate, f.type as fishType, f.sub_type as fishSubType ";
		$sql .= "FROM catches c ";
		$sql .= "INNER JOIN sessions s ON c.session = s.id ";
		$sql .= "INNER JOIN anglers a ON c.angler = a.id ";
		$sql .= "INNER JOIN fish f ON c.fish = f.code ";
		$sql .= "order by c.id desc";

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

function insertCatch($conn){
	try{
		$data = array();
		$session = $conn->real_escape_string(isset( $_POST['session'] ) ? $_POST['session'] : '');
		$angler = $conn->real_escape_string(isset( $_POST['angler'] ) ? strtoupper($_POST['angler']) : '');
		$fish = $conn->real_escape_string(isset( $_POST['fish'] ) ? $_POST['fish'] : '');
		$amount = $conn->real_escape_string(isset( $_POST['amount'] ) ? $_POST['amount'] : '');
		$weight = $conn->real_escape_string(isset( $_POST['weight'] ) ? $_POST['weight'] : '');

		if($session == '' || $angler == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Fish or session cannot be empty';
		} else {
			$sql = "INSERT INTO catches (session, angler, fish, amount, weight)  VALUES ('$session', '$angler', '$fish', $amount, '$weight')";
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

function deleteCatch($conn, $id = ''){
	try{

		$data = array();
		$id = $conn->real_escape_string(isset( $_POST['id'] ) ? $_POST['id'] : '');

		if($id == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Id cannot be empty';
		} else {
			$sql = "DELETE FROM catches WHERE id = '$id'";
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

function updateCatch($conn){
	try{
		$data = array();
		$id = $conn->real_escape_string(isset( $_POST['id'] ) ? strtoupper($_POST['id']) : '');
		$session = $conn->real_escape_string(isset( $_POST['session'] ) ? $_POST['session'] : '');
		$angler = $conn->real_escape_string(isset( $_POST['angler'] ) ? strtoupper($_POST['angler']) : '');
		$fish = $conn->real_escape_string(isset( $_POST['fish'] ) ? $_POST['fish'] : '');
		$amount = $conn->real_escape_string(isset( $_POST['amount'] ) ? $_POST['amount'] : '');
		$weight = $conn->real_escape_string(isset( $_POST['weight'] ) ? $_POST['weight'] : '');

		if($id == ''){
			$data['success'] = false;
			$data['message'] = 'Failed: Id cannot be empty';
		} else {
			$sql = "update catches set session = '$session', angler = '$angler', fish = '$fish', amount = '$amount' where id = '$id'";
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
