<?php
	/* Import the password and the config file */
	include("password.php");
	include("config.php");

	/* Check password */
	if($_POST["passwd"] != $passwd){
		echo 'P10';
		exit();
	}

	/* prepare the statement */
	$stm = $db -> prepare("DELETE FROM articles WHERE id = ?");

	/* Execute the statement */
	$stm -> execute([
		$_POST["id"]
	]);
?>