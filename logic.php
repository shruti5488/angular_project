<?php

	$data = json_decode(file_get_contents("php://input"));
    
    if($data->data == "string"){
    	// echo "Hello";
    	$bio = $data->bioguide_id;
    	$bill = "http://congress.api.sunlightfoundation.com/bills?sponsor_id=".$bio."&apikey=dc64b50ea0094b8794a3a8d96db12f86";
    	$json_bill = file_get_contents($bill);

    	$committee = "http://congress.api.sunlightfoundation.com/committees?chamber=senate&member_ids=".$bio."&apikey=dc64b50ea0094b8794a3a8d96db12f86";
    	$json_comm = file_get_contents($committee);

    	$json_string = array($json_comm, $json_bill);
    	echo json_encode($json_string);
    }
else{

	$start_url_leg = "http://congress.api.sunlightfoundation.com/legislators?apikey=dc64b50ea0094b8794a3a8d96db12f86&per_page=all";
		$json_string_leg = file_get_contents($start_url_leg);
	
	$start_url_bill = "https://congress.api.sunlightfoundation.com/bills?apikey=dc64b50ea0094b8794a3a8d96db12f86&per_page=50";
		$json_string_bill = file_get_contents($start_url_bill);

	$start_url_committee = "https://congress.api.sunlightfoundation.com/committees?chamber=house&apikey=dc64b50ea0094b8794a3a8d96db12f86&per_page=all";
		$json_string_committee_h = file_get_contents($start_url_committee);
	$start_url_committee = "https://congress.api.sunlightfoundation.com/committees?chamber=senate&apikey=dc64b50ea0094b8794a3a8d96db12f86&per_page=all";
		$json_string_committee_s = file_get_contents($start_url_committee);
	$start_url_committee = "https://congress.api.sunlightfoundation.com/committees?chamber=joint&apikey=dc64b50ea0094b8794a3a8d96db12f86&per_page=all";
		$json_string_committee_j = file_get_contents($start_url_committee);

	$json_string = array($json_string_leg, $json_string_bill, $json_string_committee_h, $json_string_committee_s, $json_string_committee_j);
	echo json_encode($json_string);

	function Bill(){
		echo "Hi";
	}
}
?>