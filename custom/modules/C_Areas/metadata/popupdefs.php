<?php
$popupMeta = array (
    'moduleMain' => 'C_Areas',
    'varName' => 'C_Areas',
    'orderBy' => 'c_areas.name',
    'whereClauses' => array (
  'name' => 'c_areas.name',
  'assigned_user_id' => 'c_areas.assigned_user_id',
  'code' => 'c_areas.code',
  'date_entered' => 'c_areas.date_entered',
  'date_modified' => 'c_areas.date_modified',
),
    'searchInputs' => array (
  1 => 'name',
  5 => 'assigned_user_id',
  6 => 'code',
  8 => 'date_entered',
  9 => 'date_modified',
),
    'searchdefs' => array (
  'name' => 
  array (
    'name' => 'name',
    'width' => '10%',
  ),
  'code' => 
  array (
    'type' => 'varchar',
    'label' => 'LBL_AREAS_CODE',
    'width' => '10%',
    'name' => 'code',
  ),
  'assigned_user_id' => 
  array (
    'name' => 'assigned_user_id',
    'label' => 'LBL_ASSIGNED_TO',
    'type' => 'enum',
    'function' => 
    array (
      'name' => 'get_user_array',
      'params' => 
      array (
        0 => false,
      ),
    ),
    'width' => '10%',
  ),
  'date_entered' => 
  array (
    'type' => 'datetime',
    'label' => 'LBL_DATE_ENTERED',
    'width' => '10%',
    'name' => 'date_entered',
  ),
  'date_modified' => 
  array (
    'type' => 'datetime',
    'label' => 'LBL_DATE_MODIFIED',
    'width' => '10%',
    'name' => 'date_modified',
  ),
),
);
