<?php
// created: 2011-12-06 08:51:25
$layout_defs["Tours"]["subpanel_setup"]["tours_services"] = array (
  'order' => 100,
  'module' => 'Services',
  'subpanel_name' => 'default',
  'sort_order' => 'asc',
  'sort_by' => 'id',
  'title_key' => 'LBL_TOURS_SERVICES_FROM_SERVICES_TITLE',
  'get_subpanel_data' => 'tours_services',
  'top_buttons' => 
  array (
    0 => 
    array (
      'widget_class' => 'SubPanelTopButtonQuickCreate',
    ),
    1 => 
    array (
      'widget_class' => 'SubPanelTopSelectButton',
      'mode' => 'MultiSelect',
    ),
  ),
);
