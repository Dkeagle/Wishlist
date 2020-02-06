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
	$stm = $db -> prepare("INSERT INTO articles(name, img, origin, bgcolor, link) VALUES(?, ?, ?, ?, ?)");

	/* Execute the statement */
	$stm -> execute([
		$_POST["name"],
		$_POST["img"],
		$_POST["origin"],
		$_POST["bgcolor"],
		$_POST["link"]
	]);
?>