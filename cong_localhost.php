<?php 
session_save_path('/home/scf-37/shrutipr/apache2/htdocs/hw6');
session_start();
?>
<html>
<head>
<meta charset="utf-8"/>
<title>Forecast</title>
<style type="text/css">
.font_class { 	font-family: sans-serif;
    			font-weight: normal;
    			font-size: small;	
			}
.left_align{
	    text-align: left;
	    padding-left: 60px;
}
.view{
    border: 0;
    padding: 0;
    display: inline;
    background: none;
    font-size: inherit;
    text-decoration: underline;
    color: blue;
}
</style>
<script type="text/javascript">
function ChooseContact(data) {
	document.getElementById ("keyword1").value = data.value;
	document.getElementById ("keyword2").value = "";
}

function validate() {
	var count, error, err_check;
	count = 0;
	err_check = 0;
	var flag;

	// var special = /^([a-z]+[A-Z]+\.)+[\w-]{2,4})?$/;

	error = "Please enter the following missing information:\n";
	if (document.getElementById("cong").value === "Select your option"){
		error += "Congress database";
		count = 1;
		err_check = 1;
	}
	var key = document.getElementById("keyword2").value;
	if (key.trim() === ""){
		if (count == 1) { error += ", "; }
		error += "keyword";
		err_check = 1;
	}
	if (err_check == 1) {
		alert (error);	
		return false;
	} 
	else {
		return true;
	}
   	
}
function clearform()
{
	document.getElementById("myForm").reset();
    document.getElementById("cong").selectedIndex = 0; 
    document.getElementById("keyword1").value="Keyword*";
    document.getElementById("keyword2").value= null ;
   	document.getElementById("congress_div").innerHTML = "";
    return;
}

function View_details1(value)
	{
		var json = JSON.parse(value.getAttribute('value'));
		var view = "";

		var leg_image = "http://theunitedstates.io/images/congress/225x275/" + json.bioguide_id + ".jpg";
		var full_name = json.first_name + " " + json.last_name ;
		var term_end;
		if (json.term_end === null) { term_end = "N.A";}
		else { term_end =  json.term_end; }

		var website =  json.website;
		if (json.website) { 
			website  =  "https://twitter.com/" + json.website;
		}
		else if (json.website  === null) { 
				website  = "N.A" ; 
		}
		else { 
			website  = "N.A" ;
		}
		
		var office;
		if (json.office === null) { office = "N.A";}
		else { office = json.office; }

		var facebook;
		if (json.facebook_id) { 
			facebook =  "https://twitter.com/" + json.facebook_id;
		}
		else if (json.facebook_id  === null) { 
				facebook = "N.A" ; 
		}
		else { 
			facebook = "N.A" ;
		}
		
		var twitter_id;
		if (json.twitter_id) { 
			twitter =  "https://twitter.com/" + json.twitter_id;
		}
		else if (json.twitter_id === null) { 
				twitter_id = "N.A" ; 
		}
		else { 
			twitter = "N.A" ;
		}
			
		view = "<br><div id='leg_div' style='text-align:center; border: solid 1px; margin: 0px 100px 50px 100px;padding: 20px;'>";
		view += "<br><img src='" + leg_image + "' ></a><br>";
		view += "<br><table width='60%'; align='center'; style='table-layout: fixed'>";
		view += "<tr><td>Full Name</td><td> Rep " + full_name +"</td></tr>";
    	view += "<tr><td>Term Ends on</td><td>"+ term_end +"</td></tr>";
    		
    	if (website === null) { view += "<tr><td>Website</td><td>N.A.</td></tr>"; }
		else { view += "<tr><td>Website</td><td><a href='" + website + "' target='_blank'>" + website + "</a></td></tr>"; } 
    	view += "<tr><td>Office</td><td>" + office + "</td></tr>";
    	view += "<tr><td>Facebook</td><td>";
    	if (facebook === "N.A") { view += facebook; }
    	else { view += "<a href='" + facebook + "' target='_blank'>" + full_name + "</a>" ;}
    	view += "</td></tr>";
    	
    	view += "<tr><td>Twitter</td><td>";
    	if (twitter === "N.A") { view +=twitter; }
    	else { view += "<a href='"+ twitter +"' target='_blank'>" + full_name +"</a>" ;}
    	view +=  "</td></tr>";
    	view +=  "</table>";
		view +=  "</div>";
		document.getElementById("congress_div").innerHTML = "";
		document.getElementById("congress_div").innerHTML = view;
	}

function View_details2(value)
	{
		var json = JSON.parse(value.getAttribute('value'));
		var view = "";

		var bill_id = json.bill_id;
		var short_title, introduced_on;
		if (json.short_title === null) { short_title = "N.A" ;}
		else { short_title = json.short_title;}
		if (json.introduced_on === null) { introduced_on = "N.A";}
    	else { introduced_on = json.introduced_on; } 
    	if (json.last_version.version_name === null && json.last_action_at === null) { json.last_version.version_name = "N.A"; }
     	
     	view += "<br><div style='text-align:center; border: solid 1px; margin: 10px 100px 0px 100px; padding-top: 20px;'>";
		view += "<br><table width='70%'; align='center'; style='table-layout: fixed'>"; 
    	view += "<tr><td>Bill ID</td><td>" + bill_id + "</td></tr>";
    	view += "<tr><td>Bill Title</td><td>" + short_title + "</td></tr>";
    	view += "<tr><td>Sponsor</td><td>" + json.sponsor.title + " " + json.sponsor.first_name + " " +  json.sponsor.last_name + " " + json.sponsor.title + "</td></tr>";
    	view += "<tr><td>Introduced On</td><td>" + introduced_on + "</td></tr>";
    	view += "<tr><td>Last Action with date</td><td>" + json.last_version.version_name + ", " + json.last_action_at +"</a></td></tr>";
    	var pdf = json.last_version.urls.pdf;
    	view += "<tr><td>Bill URL</td><td>";
    	if (short_title === "N.A") { short_title = bill_id; }
    		view +="<a href='" + pdf + "' target= '_blank'>" + short_title + "</a>"; 
    	view += "</td></tr>";
    	view += "</table><br><br></div>";	
		document.getElementById("congress_div").innerHTML = "";
		document.getElementById("congress_div").innerHTML = view;
	}	

</script>
</head>
<body>
<h2 align="center">Congress Information Search</h2>
<form id="myForm" action="" method="POST" onsubmit="return validate();" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
<?php
	$submit = 1;
	$cong_value = null;
		if (isset($_POST["cong"])) { 
			$_SESSION["cong"] = 0;
			$_SESSION["cong"] =  $_POST["cong"] ; 
			$cong_value = $_SESSION["cong"];
		}	
		if (isset($_POST["chamber"])) {
			$_SESSION["chamber"] = 0;
			$chamber_value = 0;
			$chamber_value = null;
			$_SESSION["chamber"] =  $_POST["chamber"] ; 
			$chamber_value = $_SESSION["chamber"];
		}
		if (isset($_POST["key"]) || isset($_POST["cong"])) {
			$_SESSION["key"] = 0;
			$_SESSION["key"] =  $cong_value ;
			$key_value = $_SESSION["key"];
		}
		if (isset($_POST["keyword*"])) {
			$_SESSION["keyword*"] = 0;
		 	$_SESSION["keyword*"] =  $_POST["keyword*"] ; 
		 	$keyword_value = $_SESSION["keyword*"];
		}	
$actual_link = 0;
$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
if ($actual_link !== "http://cs-server.usc.edu:13161/hw6/congress.php"){
if (isset($_SESSION["cong"])) { $submit = 0; $cong_value = 0; $cong_value = $_SESSION["cong"];}
if (isset($_SESSION["chamber"])) { $chamber_value = 0 ; $chamber_value = null;  $chamber_value = $_SESSION["chamber"];}
if (isset($_SESSION["key"])) { $key_value = 0; $key_value = $_SESSION["key"];}
if (isset($_SESSION["keyword*"])) { $keyword_value = 0; $keyword_value = $_SESSION["keyword*"];}
}
?>
<table class="font_class" align="center" style="text-align:center; border: solid 1px">
	<tr>
		<td>Congress Database</td>
		<td>
			<select name='cong' id='cong' onchange='ChooseContact(this);'>
			<option selected> Select your option</option>
  			<option <?php if ($cong_value == "State/Representative*" ) echo 'selected' ;?> value="State/Representative*">Legislators</option>
  			<option <?php if ($cong_value == "Committee ID*" ) echo 'selected' ;?> value="Committee ID*">Committees</option>
  			<option <?php if ($cong_value == "Bill ID*" ) echo 'selected' ; ?> value="Bill ID*">Bills</option>
  			<option <?php if ($cong_value == "Amendment ID*" ) echo 'selected' ; ?> value="Amendment ID*">Amendments</option>
		</select>
		</td>
	</tr>
	<tr>
		<td>Chamber</td>
		<td>
			<input type="radio" name="chamber" value="senate" 
			<?php 
			if (isset($_POST["chamber"]) == "")  { echo "checked" ; } 
			elseif ($chamber_value === "senate" ) { echo "checked"; } 
			?> >Senate
  			<input type="radio" name="chamber" value="house"
  			 <?php if (isset($chamber_value)) {if ($chamber_value === "house") { echo "checked"; }}
  			?> > House
  		</td>
	</tr>
	<tr>
		<td>
			<?php
			echo "<input type='text' id='keyword1' name='key' value='";
			if (isset($key_value)) {
				echo $key_value;
			} else {
				echo "Keyword*";
			}
			echo "' style='border: none; text-align: center; font-size: inherit;'>";
			?>
		</td>
		<?php
		if (isset($keyword_value)) {
			echo "<td><input type='text' id='keyword2' name='keyword*' value='" . $keyword_value . "'></td>";
		} else {
			echo "<td><input type='text' id='keyword2' name='keyword*'></td>";
		}
		?>
	</tr>
	<tr>
		<td></td>	
		<td>
			<button name="Submit" type="submit" class="style1" value="Submit">Submit</button>	
			<button type="button" name="Clear"  class="style1" value="Clear" onclick="clearform()">Clear</button>
		</td>
	</tr>
	<tr><td colspan="2"><a href="http://sunlightfoundation.com/" target='_blank' align="middle" style="text-align: center; display: block;">Powered by Sunlight Foundation</a></td></tr>
</table>
</form>
<?php
	$states = array (
        'AL'=>'Alabama',
        'AK'=>'Alaska',
        'AZ'=>'Arizona',
        'AR'=>'Arkansas',
        'CA'=>'California',
        'CO'=>'Colorado',
        'CT'=>'Connecticut',
        'DE'=>'Delaware',
        'DC'=>'District Of Columbia',
        'FL'=>'Florida',
        'GA'=>'Georgia',
        'HI'=>'Hawaii',
        'ID'=>'Idaho',
        'IL'=>'Illinois',
        'IN'=>'Indiana',
        'IA'=>'Iowa',
        'KS'=>'Kansas',
        'KY'=>'Kentucky',
        'LA'=>'Louisiana',
        'ME'=>'Maine',
        'MD'=>'Maryland',
        'MA'=>'Massachusetts',
        'MI'=>'Michigan',
        'MN'=>'Minnesota',
        'MS'=>'Mississippi',
        'MO'=>'Missouri',
        'MT'=>'Montana',
        'NE'=>'Nebraska',
        'NV'=>'Nevada',
        'NH'=>'New Hampshire',
        'NJ'=>'New Jersey',
        'NM'=>'New Mexico',
        'NY'=>'New York',
        'NC'=>'North Carolina',
        'ND'=>'North Dakota',
        'OH'=>'Ohio',
        'OK'=>'Oklahoma',
        'OR'=>'Oregon',
        'PA'=>'Pennsylvania',
        'RI'=>'Rhode Island',
        'SC'=>'South Carolina',
        'SD'=>'South Dakota',
        'TN'=>'Tennessee',
        'TX'=>'Texas',
        'UT'=>'Utah',
        'VT'=>'Vermont',
        'VA'=>'Virginia',
        'WA'=>'Washington',
        'WV'=>'West Virginia',
        'WI'=>'Wisconsin',
        'WY'=>'Wyoming',
        );
	if(isset($_SESSION['keyword*'])){
	$key = trim($_SESSION['keyword*']);
	$match = 0;
	foreach( $states as $abbr => $name ) {
		$state = trim(strtolower($_SESSION['keyword*']));
		$name = strtolower($name);
		if ($name === $state){
			$match = 1;
			$key = $abbr;
			$state_rep = "&state=" . $key;
		} 
	}
	if ($match !=1) {
			$rep_name = ucwords(strtolower(trim($_SESSION['keyword*'])));
			$words = explode(' ', $rep_name);
			$rep_count = count($words);
			if ($rep_count === 1){ 
				$state_rep = "&query=". $rep_name; 
			}
			elseif ($rep_count === 2){ 
				$state_rep = "&query=".trim($words[0])."&query=".trim($words[1]);
			}else {
				$state_rep = "&query=".$words[0]."&query=".$words[1]."&query=".$words[2];
			}	
	}
	}
	$leg = 0;
	if (isset($_POST["cong"])) {
    	if ($_POST["cong"] === 'State/Representative*'){
			$leg = 'legislators';
		}
		elseif ($_POST["cong"] === 'Committee ID*') {
			$leg = 'committees';
		}
		elseif ($_POST["cong"] === 'Bill ID*') {
			$leg = 'bills';
		}
		elseif ($_POST["cong"] === 'Amendment ID*') {
			$leg = 'amendments';
		}
	}
	if (isset($_SESSION['chamber'])) { $chamber = $_SESSION['chamber']; }
	if(isset($_POST['Submit'])){
		$submit = 1;
		if ($leg === 'legislators'){ 
		$start_url = "http://congress.api.sunlightfoundation.com/".trim($leg)."?chamber=".trim($chamber).trim($state_rep)."&apikey=dc64b50ea0094b8794a3a8d96db12f86";
		$start_url = preg_replace("/ /", "%20", $start_url);
		$json_string = file_get_contents($start_url);
		$json = json_decode($json_string);
		echo "<div id='congress_div'>";
		if ($json->count > 0) {
			echo "<center><table border='solid 1px';  width='65%';  style='text-align: center ; border-collapse: collapse;' >"; 
			echo "<tr>";
    		echo "<th width='30%'>Name</th><th width='25%'>State</th><th width='20%'>Chamber</th><th width='25%'>Details</th></tr>";
	 		foreach($json->results as $key => $value){
    			echo "<tr><td class='left_align'>".$value->first_name .'&nbsp'.$value->last_name."</td>";
    			echo "<td>$value->state_name</td>";
    			echo "<td>$value->chamber</td>";
    			$value = json_encode($value, JSON_HEX_QUOT);
				$value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    			echo "<td><a href=\"javascript:void(0)\" value=\"$value\" onclick=\"View_details1(this)\">View Details</a></td></tr>".'&nbsp';

	 		}
	 		echo "</table></center>";
		}else {
			echo "<p style='text-align: center;'>The API returned zero results for the request.</p><div>";
		}	
	 	}else if ($leg === 'committees') {
	 		$start_url = "http://congress.api.sunlightfoundation.com/" . trim($leg) . "?committee_id=" . strtoupper(trim($key)) . "&chamber=" . trim($chamber)."&apikey=dc64b50ea0094b8794a3a8d96db12f86";
	 		$start_url = preg_replace("/ /", "%20", $start_url);
			$json_string = file_get_contents($start_url);
			$json = json_decode($json_string, true);
			echo "<div id='congress_div'>";
			if (isset($json['results'][0])) {
				echo "<table border='solid 1px';  width='70%'; align='center'; style='text-align: center ; border-collapse: collapse;'>"; 
				echo "<tr>";
    			echo "<th>Committee ID</th><th>Committee Name</th><th>Chamber</th></tr>";
	 			foreach($json['results'] as $array){
    				echo "<tr><td>".$array['committee_id']. "</td>";
    				echo "<td>".$array['name']."</td>";
    				echo "<td>".$array['chamber']."</td></tr>";   		
	 			}
	 			echo "</table>";
	 		} else {
	 			echo "<p style='text-align: center;'>The API returned zero results for the request.</p></div>";
	 		}
	 	} else if ($leg === 'bills') {
	 		$start_url = "http://congress.api.sunlightfoundation.com/" . trim($leg) . "?bill_id=" . strtolower(trim($key)) . "&chamber=" . trim($chamber) . "&apikey=dc64b50ea0094b8794a3a8d96db12f86";
	 		$start_url = preg_replace("/ /", "%20", $start_url);
			$json_string = @file_get_contents($start_url);
			$json = json_decode($json_string);
			echo "<div id='congress_div'>";
			if ($json->count > 0) {
				echo "<table  border= solid 1px ; width='80%'; align='center' ; style='text-align: center ;table-layout: fixed; border-collapse: collapse;'>"; 
				echo "<tr>";
    			echo "<th>Bill ID</th><th>Short Title</th><th>Chamber</th><th>Details</th></tr>";
    			foreach($json->results as $key => $value){
    				if ($value->short_title === null) { $short_title = "NA";}
    				else { $short_title = $value->short_title;}
    				echo "<tr><td>". $value->bill_id . "</td>";
    				echo "<td>".$short_title."</td>";
    				echo "<td>".$value->chamber."</td>";
    				$value = json_encode($value, JSON_HEX_QUOT);
					$value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    				echo "<td><a href=\"javascript:void(0)\" value=\"$value\" onclick=\"View_details2(this)\">View Details</a></td></tr>".'&nbsp';
				}
    			echo "</table>";
			}else{
				echo "<p style='text-align: center;'>The API returned zero results for the request.</p></div>";
			}
	 	}  else if ($leg === 'amendments') {
	 		$start_url = "http://congress.api.sunlightfoundation.com/" . trim($leg) . "?amendment_id=" . strtolower(trim($key)) . "&chamber=" . trim($chamber) . "&apikey=dc64b50ea0094b8794a3a8d96db12f86";
	 		$start_url = preg_replace("/ /", "%20", $start_url);
	 		$json_string = file_get_contents($start_url);
			$json = json_decode($json_string, true);
			echo "<div id='congress_div'>";
			if (isset($json['results'][0])) {
				echo "<div id='congress_div'><table  border= solid 1px ; width='80%'; align='center' ; style='text-align: center ;table-layout: fixed; border-collapse: collapse;'>	"; 
				echo "<tr>";
    			echo "<th>Amendment ID</th><th>Amendment Type</th><th>Chamber</th><th>Introduced on</th></tr>";
    			foreach($json['results'] as $array){
    				if ($array['amendment_type'] === null) { $amendment_type = "NA";}
    				else { $amendment_type = $array['amendment_type'];}
    				if ($array['introduced_on'] === null) { $introduced_on = "NA";}
    				else { $introduced_on = $array['introduced_on'];}
    				echo "<tr><td>".$array['amendment_id']. "</td>";
    				echo "<td>".$amendment_type."</td>";
    				echo "<td>".$array['chamber']."</td>";
    				echo "<td>".$introduced_on."</td>";
    			}
    			echo "</table>";
			} else {
				echo "<p style='text-align: center;'>The API returned zero results for the request.</p></div>";
				}
	 	}
	}	
?>
</body>
</html>