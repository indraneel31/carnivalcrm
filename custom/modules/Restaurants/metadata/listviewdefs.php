<?php
$module_name = 'Restaurants';
$listViewDefs [$module_name] = 
array (
  'CODE' => 
  array (
    'width' => '7%',
    'label' => 'LBL_RES_CODE',
    'default' => true,
    'link' => true,
  ),
  'NAME' => 
  array (
    'width' => '15%',
    'label' => 'LBL_NAME',
    'default' => true,
    'link' => true,
  ),
  'TEL' => 
  array (
    'width' => '10%',
    'label' => 'LBL_RES_TEL',
    'default' => true,
  ),
  'EMAIL1' => 
  array (
    'width' => '20%',
    'label' => 'LBL_EMAIL',
    'link' => true,
    'customCode' => '{$EMAIL1_LINK}{$EMAIL1}</a>',
    'default' => true,
  ),
  'DESTINATIONSTAURANTS_NAME' => 
  array (
    'type' => 'relate',
    'link' => 'destinations_restaurants',
    'label' => 'LBL_DESTINATIONS_RESTAURANTS_FROM_DESTINATIONS_TITLE',
    'width' => '10%',
    'default' => true,
  ),
  'AREA' => 
  array (
    'width' => '10%',
    'label' => 'LBL_AREA',
    'default' => true,
  ),
  'ASSIGNED_USER_NAME' => 
  array (
    'width' => '9%',
    'label' => 'LBL_ASSIGNED_TO_NAME',
    'module' => 'Employees',
    'id' => 'ASSIGNED_USER_ID',
    'default' => true,
  ),
);
?>
