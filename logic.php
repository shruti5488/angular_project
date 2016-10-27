<?php

$start_url = "http://congress.api.sunlightfoundation.com/legislators?apikey=dc64b50ea0094b8794a3a8d96db12f86&per_page=all";

$json_string = file_get_contents($start_url);
$json = json_decode($json_string);

	$value = json_encode($json->results, JSON_HEX_QUOT);
	echo $json_string ;
?>