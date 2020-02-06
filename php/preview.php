<?php
	/* Set the header to return XML */
	header("Content-type: text/xml");
	
	/* Display everything */
	echo '<?xml version="1.0" encoding="utf-8"?>';
	echo '<tab>';
		echo '<item>';
		echo '<name>'.$_POST["name"].'</name>';
		echo '<img>'.$_POST["img"].'</img>';
		if($_POST["origin"] != ""){
			echo '<origin>'.$_POST["origin"].'</origin>';
		}
		if($_POST["bgcolor"] != ""){
			echo '<bgcolor>'.$_POST["bgcolor"].'</bgcolor>';
		}
		echo '<link>'.$_POST["link"].'</link>';
		echo '</item>';
	echo '</tab>'
?>