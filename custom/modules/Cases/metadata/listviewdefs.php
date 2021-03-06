<?php
$listViewDefs ['Cases'] = 
array (
  'CASE_NUMBER' => 
  array (
    'width' => '5%',
    'label' => 'LBL_LIST_NUMBER',
    'default' => true,
  ),
  'NAME' => 
  array (
    'width' => '25%',
    'label' => 'LBL_LIST_SUBJECT',
    'link' => true,
    'default' => true,
  ),
  'TYPE' => 
  array (
    'type' => 'enum',
    'label' => 'LBL_TYPE',
    'sortable' => false,
    'width' => '10%',
    'default' => true,
  ),
  'FITS_CASES_NAME' => 
  array (
    'type' => 'relate',
    'link' => 'fits_cases',
    'label' => 'LBL_FITS_CASES_FROM_FITS_TITLE',
    'width' => '10%',
    'default' => true,
  ),
  'GROUPPROGRAMS_CASES_NAME' => 
  array (
    'type' => 'relate',
    'link' => 'groupprograms_cases',
    'label' => 'LBL_GROUPPROGRAMS_CASES_FROM_GROUPPROGRAMS_TITLE',
    'width' => '10%',
    'default' => true,
  ),
  'PRIORITY' => 
  array (
    'width' => '10%',
    'label' => 'LBL_LIST_PRIORITY',
    'default' => true,
  ),
  'STATUS' => 
  array (
    'width' => '10%',
    'label' => 'LBL_LIST_STATUS',
    'default' => true,
  ),
  'ASSIGNED_USER_NAME' => 
  array (
    'width' => '10%',
    'label' => 'LBL_ASSIGNED_TO_NAME',
    'module' => 'Employees',
    'id' => 'ASSIGNED_USER_ID',
    'default' => true,
  ),
  'DATE_ENTERED' => 
  array (
    'width' => '10%',
    'label' => 'LBL_DATE_ENTERED',
    'default' => true,
  ),
);
?>
