<?php
// created: 2012-03-19 09:14:36
$subpanel_layout['list_fields'] = array (
  'name' => 
  array (
    'vname' => 'LBL_NAME',
    'widget_class' => 'SubPanelDetailViewLink',
    'width' => '45%',
    'default' => true,
  ),
  'address' => 
  array (
    'type' => 'varchar',
    'vname' => 'LBL_ADDRESS',
    'width' => '10%',
    'default' => true,
  ),
  'country' => 
  array (
    'type' => 'enum',
    'vname' => 'LBL_COUNTRY_NAME',
    'sortable' => false,
    'width' => '10%',
    'default' => true,
  ),
  'area' => 
  array (
    'type' => 'enum',
    'vname' => 'LBL_AREA',
    'sortable' => false,
    'width' => '10%',
    'default' => true,
  ),
  'date_modified' => 
  array (
    'vname' => 'LBL_DATE_MODIFIED',
    'width' => '45%',
    'default' => true,
  ),
  'edit_button' => 
  array (
    'widget_class' => 'SubPanelEditButton',
    'module' => 'Destinations',
    'width' => '4%',
    'default' => true,
  ),
  'remove_button' => 
  array (
    'widget_class' => 'SubPanelRemoveButton',
    'module' => 'Destinations',
    'width' => '5%',
    'default' => true,
  ),
);
?>
