<?php

$start_url = "congress.api.sunlightfoundation.com/legislators?apikey=dc64b50ea0094b8794a3a8d96db12f86";

$json_string = file_get_contents($start_url);
$json = json_decode($json_string);

$value = json_encode($json->results, JSON_HEX_QUOT);
$value = htmlspecialchars($json->results, ENT_QUOTES, 'UTF-8');
echo $json->results;

?>