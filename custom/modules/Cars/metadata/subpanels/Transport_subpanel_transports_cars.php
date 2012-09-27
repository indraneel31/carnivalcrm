<?php
// created: 2012-09-26 11:38:45
$subpanel_layout['list_fields'] = array (
  'driver_name' => 
  array (
    'type' => 'varchar',
    'vname' => 'LBL_NAME',
    'width' => '10%',
    'default' => true,
  ),
  'number_plates' => 
  array (
    'type' => 'varchar',
    'vname' => 'LBL_NUMBER_PLATES',
    'width' => '10%',
    'default' => true,
  ),
  'numofseat' => 
  array (
    'type' => 'int',
    'vname' => 'LBL_NUMOFSEAT',
    'width' => '10%',
    'default' => true,
  ),
  'transport_name' => 
  array (
    'type' => 'relate',
    'studio' => 'visible',
    'vname' => 'LBL_TRANSPORT_NAME',
    'width' => '10%',
    'default' => true,
  ),
  'date_modified' => 
  array (
    'vname' => 'LBL_DATE_MODIFIED',
    'width' => '10%',
    'default' => true,
  ),
  'edit_button' => 
  array (
    'widget_class' => 'SubPanelEditButton',
    'module' => 'Contracts',
    'width' => '4%',
    'default' => true,
  ),
  'remove_button' => 
  array (
    'widget_class' => 'SubPanelRemoveButton',
    'module' => 'Contracts',
    'width' => '5%',
    'default' => true,
  ),
);
?>
