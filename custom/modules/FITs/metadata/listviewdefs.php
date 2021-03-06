<?php
$module_name = 'FITs';
$listViewDefs [$module_name] = 
array (
  'CODE' => 
  array (
    'type' => 'varchar',
    'label' => 'LBL_CODE',
    'width' => '10%',
    'default' => true,
    'link' => true,
  ),
  'NAME' => 
  array (
    'width' => '20%',
    'label' => 'LBL_NAME',
    'link' => true,
    'orderBy' => 'last_name',
    'default' => true,
    'related_fields' => 
    array (
      0 => 'first_name',
      1 => 'last_name',
      2 => 'salutation',
    ),
    'customCode' => '<a href="index.php?module=FITs&action=DetailView&record={$ID}">{$SALUTATION} {$FIRST_NAME} {$LAST_NAME}</a>',
  ),
  'PHONE_MOBILE' => 
  array (
    'width' => '10%',
    'label' => 'LBL_MOBILE_PHONE',
    'default' => true,
  ),
  'EMAIL1' => 
  array (
    'width' => '15%',
    'label' => 'LBL_EMAIL_ADDRESS',
    'sortable' => false,
    'link' => true,
    'customCode' => '{$EMAIL1_LINK}{$EMAIL1}</a>',
    'default' => true,
  ),
  'ACCOUNTS_FITS_NAME' => 
  array (
    'width' => '15%',
    'label' => 'LBL_ACCOUNT_NAME',
    'default' => true,
  ),
  'ADDRESS' => 
  array (
    'width' => '20%',
    'label' => 'LBL_ADDRESS',
    'default' => true,
  ),
  'DEPARMENT' => 
  array (
    'width' => '10%',
    'label' => 'LBL_DEPARMENT',
    'default' => true,
  ),
  'DATE_ENTERED' => 
  array (
    'width' => '10%',
    'label' => 'LBL_DATE_ENTERED',
    'default' => true,
  ),
  'CREATED_BY_NAME' => 
  array (
    'width' => '10%',
    'label' => 'LBL_CREATED',
    'default' => true,
  ),
);
?>
