<?php
// created: 2011-10-17 11:39:26
$layout_defs["FITs"]["subpanel_setup"]["groupprograms_fits"] = array (
  'order' => 100,
  'module' => 'GroupPrograms',
  'subpanel_name' => 'default',
  'sort_order' => 'asc',
  'sort_by' => 'id',
  'title_key' => 'LBL_GROUPPROGRAMS_FITS_FROM_GROUPPROGRAMS_TITLE',
  'get_subpanel_data' => 'groupprograms_fits',
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

unset($layout_defs["FITs"]["subpanel_setup"]["groupprograms_fits"]['top_buttons'][0]);