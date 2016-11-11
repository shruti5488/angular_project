<?php

	$data = json_decode(file_get_contents("php://input"));
    
    if($data->data == "string"){
    	$bio = $data->bioguide_id;
    	$bill = "http://104.198.0.197:8080/bills?sponsor_id=".$bio."&apikey=dc64b50ea0094b8794a3a8d96db12f86&per_page=5";
    	$json_bill = file_get_contents($bill);

    	// $committee = "http://congress.api.sunlightfoundation.com/committees?member_ids=".$bio."&apikey=dc64b50ea0094b8794a3a8d96db12f86";
    	$committee = "http://104.198.0.197:8080/committees?member_ids=".$bio."&apikey=dc64b50ea0094b8794a3a8d96db12f86&per_page=5";
    	$json_comm = file_get_contents($committee);

    	$json_string = array($json_comm, $json_bill);
    	echo json_encode($json_string);
    }
else{

	$start_url_leg = "http://104.198.0.197:8080/legislators?apikey=c401bf0c6bee4abcae170e8225dce1fe&per_page=all";
	$json_string_leg = file_get_contents($start_url_leg);
	
	$start_url_bill_active = "https://congress.api.sunlightfoundation.com/bills?history.active=false&apikey=dc64b50ea0094b8794a3a8d96db12f86&per_page=50";
	$json_string_bill_active = file_get_contents($start_url_bill_active);

	$start_url_bill_new = "https://congress.api.sunlightfoundation.com/bills?history.active=true&apikey=dc64b50ea0094b8794a3a8d96db12f86&per_page=50";
	$json_string_bill_new = file_get_contents($start_url_bill_new);

	$start_url_committee = "https://congress.api.sunlightfoundation.com/committees?chamber=house&apikey=dc64b50ea0094b8794a3a8d96db12f86&per_page=all";
		$json_string_committee_h = file_get_contents($start_url_committee);
	$start_url_committee = "https://congress.api.sunlightfoundation.com/committees?chamber=senate&apikey=dc64b50ea0094b8794a3a8d96db12f86&per_page=all";
		$json_string_committee_s = file_get_contents($start_url_committee);
	$start_url_committee = "https://congress.api.sunlightfoundation.com/committees?chamber=joint&apikey=dc64b50ea0094b8794a3a8d96db12f86&per_page=all";
		$json_string_committee_j = file_get_contents($start_url_committee);

	$json_string = array($json_string_leg, $json_string_bill_active, $json_string_bill_new, $json_string_committee_h, $json_string_committee_s, $json_string_committee_j);
	echo json_encode($json_string);

	function Bill(){
		echo "Hi";
	}
}
?>