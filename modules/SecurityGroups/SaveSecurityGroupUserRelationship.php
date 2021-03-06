<?php
if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');

require_once('modules/SecurityGroups/SecurityGroupUserRelationship.php');

require_once('include/utils.php');


$focus = new SecurityGroupUserRelationship();

$focus->retrieve($_REQUEST['record']);

foreach($focus->column_fields as $field)
{
	safe_map($field, $focus, true);
}

foreach($focus->additional_column_fields as $field)
{
	safe_map($field, $focus, true);
}

// send them to the edit screen.
if(isset($_REQUEST['record']) && $_REQUEST['record'] != "")
{
    $recordID = $_REQUEST['record'];
}

	if(	isset($_POST['noninheritable']) && $_POST['noninheritable'] == '1') {
		$focus->noninheritable = 1;
	} else {
		$focus->noninheritable = 0;
	}
	
$focus->save();
$recordID = $focus->id;

$GLOBALS['log']->debug("Saved record with id of ".$recordID);

$header_URL = "Location: index.php?action={$_REQUEST['return_action']}&module={$_REQUEST['return_module']}&record={$_REQUEST['return_id']}";
$GLOBALS['log']->debug("about to post header URL of: $header_URL");

header($header_URL);
?>

