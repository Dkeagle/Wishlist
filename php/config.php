<?php
	/* Connect to the SQLite file */
	try {
		$db = new PDO("sqlite:../articles.sqlite");
	} catch (PDOException $error) {
		exit($error->getMessage());
	}
?>