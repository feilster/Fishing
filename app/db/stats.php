<?php

include_once 'db.php';

if( isset($_POST['requestType']) && !empty( isset($_POST['requestType']) ) ){
	$type = $_POST['requestType'];
	getStats($conn, $type);
}else{
	error("No request found");
}

function getStats($conn, $type){
	try{

		$data = array();

		switch ($type) {
			case "getAnglerCatches":
				$sql = "SELECT SUM(c.amount) as amount, a.nick_name as angler FROM catches c INNER JOIN anglers a ON c.angler = a.id group by angler order by amount desc";
				break;
			case "getFishCatches":
				$sql = "SELECT sum(c.amount) as amount, max(c.weight) as biggest, round(avg(c.weight),1) as avg, f.type as fishType, f.sub_type as fishSubType FROM catches c INNER JOIN fish f ON c.fish = f.code group by c.fish order by amount desc";
				break;
			default:
				error("Invalid request");
		}

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

function error($errorMessage)
{
	$data = array();
	$data['success'] = false;
	$data['message'] = $errorMessage;
	echo json_encode($data);
	exit;
}

?>
