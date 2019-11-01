<?php
function parsejson($json_string){
	
	// strip curly braces from json string
	// $purged_json = str_replace("{", "", $json_string);
	// $purged_json = str_replace("{", "", $purged_json);
	$purged_json = trim($json_string, "{}");

	// split by comma
	$rows = explode(',', $purged_json);

	$result = array();
	foreach ($rows as $row => $pair) {
		$temp = explode(":", $pair);
		//var_dump($temp);
		// $key = str_replace('\'', '', $temp[0]);
		// $key = str_replace('\"', '', $temp[0]);
		// $value = str_replace('\"', '', $temp[1]);
		// $value = str_replace('\'', '', $temp[1]);
		// $key = trim($temp[0],"\x22\x27");
		// $value = trim($temp[1],"\x22\x27");
		$key = trim(str_replace('"', '', $temp[0]));
		$value = trim(str_replace('"', '', $temp[1]));
		//echo $key, ' ',  $value, ' ', "ardy";	
		$result[$key] = $value;
	}
	// return $rows;
	//
	return $result;

}