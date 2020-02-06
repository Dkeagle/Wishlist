<?php
	/* Include the config file */
	include("config.php");

	/* prepare the statement */
	$stm = $db -> prepare("SELECT id, name, img, origin, bgcolor, link FROM articles WHERE id >= ?");

	/* Execute the statement */
	$stm -> execute([
		0
	]);

	/* Set the header to return XML */
	header("Content-type: text/xml");
	
	/* Display everything */
	echo '<?xml version="1.0" encoding="utf-8"?>';
	echo '<tab>';
	while($item = $stm -> fetch()){
		echo '<item>';
		echo '<id>'.$item["id"].'</id>';
		echo '<name>'.$item["name"].'</name>';
		echo '<img>'.$item["img"].'</img>';
		if($item["origin"] != ""){
			echo '<origin>'.$item["origin"].'</origin>';
		}
		if($item["bgcolor"] != ""){
			echo '<bgcolor>'.$item["bgcolor"].'</bgcolor>';
		}
		echo '<link>'.$item["link"].'</link>';
		echo '</item>';
	}
	echo '</tab>'
?>