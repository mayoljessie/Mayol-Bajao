<?php 
	require ('conn.php');
	
	if($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action']=="register"){
		$pdo->beginTransaction();
		try {
			$sql = 'INSERT INTO user(idnumber, firstname, lastname, gender, bday, program, yearlevel) VALUES(:idnumber, :firstname, :lastname, :gender, :bday, :program, :yearlevel)';
			$statement = $pdo->prepare($sql);
			$statement->execute([
				':idnumber' => $_POST['userdata']['idnumber'],
				':firstname' => $_POST['userdata']['firstname'],
				':lastname' => $_POST['userdata']['lastname'],
				':gender' => (int) $_POST['userdata']['gender'],
				':bday' => $_POST['userdata']['bday'],
				':program' => $_POST['userdata']['program'],
				':yearlevel' => (int) $_POST['userdata']['yearlevel'],
			]);

			echo $pdo->lastInsertId();
			$pdo->commit();
		} catch (Exception $e) {
			$pdo->rollback();
		}
	}

	else if($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['action']=="getusers"){
	 	$sql = "SELECT * FROM user";
	 	$statement = $pdo->query($sql);
	 	$users = $statement->fetchAll(PDO::FETCH_ASSOC);
	 	echo json_encode($users);
                          }

    else if($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['act']=="deleteuser"){
 	    $id = $_GET['value'];
		$sql = "DELETE FROM user where id=$id";
		$pdo->query($sql);
		
	}
   else if($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action']=="update"){
   	    $oldid = $_POST['anoldid'];
		$idnumber2 = $_POST['anidnumber'];
		$firstname2 = $_POST['afirstname'];
		$lastname2 = $_POST['alastname'];
		$gender2 = (int) $_POST['agender'];
		$bday2 = $_POST['abday'];
		$program2 = $_POST['aprogram'];
		$yearlevel2 = (int) $_POST['ayearlevel'];

		$sql = "UPDATE user SET idnumber='$idnumber2', firstname='$firstname2', lastname='$lastname2', gender=$gender2, bday='$bday2', program='$program2', yearlevel=$yearlevel2 WHERE idnumber = '$oldid'";
		$pdo->query($sql);
		

	}


 ?>