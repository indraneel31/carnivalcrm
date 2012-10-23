<?php
$module_name = 'RoomBookings';
$searchdefs [$module_name] = 
array (
  'layout' => 
  array (
    'basic_search' => 
    array (
      'code' => 
      array (
        'type' => 'varchar',
        'label' => 'LBL_ROOM_CODE',
        'width' => '10%',
        'default' => true,
        'name' => 'code',
      ),
      'name' => 
      array (
        'name' => 'name',
        'default' => true,
        'width' => '10%',
      ),
      'confirm' => 
      array (
        'type' => 'radioenum',
        'default' => true,
        'label' => 'LBL_CONFIRM',
        'width' => '10%',
        'name' => 'confirm',
      ),
      'current_user_only' => 
      array (
        'name' => 'current_user_only',
        'label' => 'LBL_CURRENT_USER_FILTER',
        'type' => 'bool',
        'default' => true,
        'width' => '10%',
      ),
    ),
    'advanced_search' => 
    array (
      'code' => 
      array (
        'type' => 'varchar',
        'label' => 'LBL_ROOM_CODE',
        'width' => '10%',
        'default' => true,
        'name' => 'code',
      ),
      'name' => 
      array (
        'name' => 'name',
        'default' => true,
        'width' => '10%',
      ),
      'hotels_roombookings_name' => 
      array (
        'type' => 'relate',
        'link' => 'hotels_roombookings',
        'label' => 'LBL_HOTELS_ROOMBOOKINGS_FROM_HOTELS_TITLE',
        'width' => '10%',
        'default' => true,
        'name' => 'hotels_roombookings_name',
      ),
      'confirm' => 
      array (
        'type' => 'radioenum',
        'default' => true,
        'label' => 'LBL_CONFIRM',
        'width' => '10%',
        'name' => 'confirm',
      ),
      'current_user_only' => 
      array (
        'label' => 'LBL_CURRENT_USER_FILTER',
        'type' => 'bool',
        'default' => true,
        'width' => '10%',
        'name' => 'current_user_only',
      ),
      'groupprogrambookings_name' => 
      array (
        'type' => 'relate',
        'link' => 'groupprogras_roombookings',
        'label' => 'LBL_GROUPPROGRAMS_ROOMBOOKINGS_FROM_GROUPPROGRAMS_TITLE',
        'width' => '10%',
        'default' => true,
        'name' => 'groupprogrambookings_name',
      ),
      'attn_hotel_name' => 
      array (
        'type' => 'varchar',
        'label' => 'LBL_ATTN_HOTEL_NAME',
        'width' => '10%',
        'default' => true,
        'name' => 'attn_hotel_name',
      ),
      'attn_hotel_phone' => 
      array (
        'type' => 'phone',
        'label' => 'LBL_ATTN_HOTEL_PHONE',
        'width' => '10%',
        'default' => true,
        'name' => 'attn_hotel_phone',
      ),
      'cost' => 
      array (
        'type' => 'varchar',
        'label' => 'LBL_COST',
        'width' => '10%',
        'default' => true,
        'name' => 'cost',
      ),
      'deadline' => 
      array (
        'type' => 'date',
        'label' => 'LBL_DEADLINE',
        'width' => '10%',
        'default' => true,
        'name' => 'deadline',
      ),
      'date_modified' => 
      array (
        'type' => 'datetime',
        'label' => 'LBL_DATE_MODIFIED',
        'width' => '10%',
        'default' => true,
        'name' => 'date_modified',
      ),
      'date_entered' => 
      array (
        'type' => 'datetime',
        'label' => 'LBL_DATE_ENTERED',
        'width' => '10%',
        'default' => true,
        'name' => 'date_entered',
      ),
      'created_by' => 
      array (
        'type' => 'assigned_user_name',
        'label' => 'LBL_CREATED',
        'width' => '10%',
        'default' => true,
        'name' => 'created_by',
      ),
      'modified_user_id' => 
      array (
        'type' => 'assigned_user_name',
        'label' => 'LBL_MODIFIED',
        'width' => '10%',
        'default' => true,
        'name' => 'modified_user_id',
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
        'default' => true,
        'width' => '10%',
      ),
      'hotel_address' => 
      array (
        'type' => 'text',
        'label' => 'LBL_RES_ADDRESS',
        'sortable' => false,
        'width' => '10%',
        'default' => true,
        'name' => 'hotel_address',
      ),
      'include' => 
      array (
        'type' => 'text',
        'label' => 'LBL_INCLUDE',
        'sortable' => false,
        'width' => '10%',
        'default' => true,
        'name' => 'include',
      ),
    ),
  ),
  'templateMeta' => 
  array (
    'maxColumns' => '3',
    'maxColumnsBasic' => '4',
    'widths' => 
    array (
      'label' => '10',
      'field' => '30',
    ),
  ),
);
?>
