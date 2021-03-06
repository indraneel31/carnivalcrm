<?php
$module_name = 'FITs';
$searchdefs [$module_name] = 
array (
  'layout' => 
  array (
    'basic_search' => 
    array (
      'code' => 
      array (
        'type' => 'varchar',
        'label' => 'LBL_CODE',
        'width' => '10%',
        'default' => true,
        'name' => 'code',
      ),
      'search_name' => 
      array (
        'name' => 'search_name',
        'label' => 'LBL_NAME',
        'type' => 'name',
        'default' => true,
        'width' => '10%',
      ),
      'gender' => 
      array (
        'type' => 'radioenum',
        'default' => true,
        'studio' => 'visible',
        'label' => 'LBL_GENDER',
        'width' => '10%',
        'name' => 'gender',
      ),
    ),
    'advanced_search' => 
    array (
      'search_name' => 
      array (
        'label' => 'LBL_NAME',
        'type' => 'name',
        'default' => true,
        'width' => '10%',
        'name' => 'search_name',
      ),
      'email1' => 
      array (
        'type' => 'varchar',
        'label' => 'LBL_EMAIL_ADDRESS',
        'width' => '10%',
        'default' => true,
        'name' => 'email1',
      ),
      'phone_mobile' => 
      array (
        'type' => 'phone',
        'label' => 'LBL_MOBILE_PHONE',
        'width' => '10%',
        'default' => true,
        'name' => 'phone_mobile',
      ),
      'phone_home' => 
      array (
        'type' => 'phone',
        'label' => 'LBL_HOME_PHONE',
        'width' => '10%',
        'default' => true,
        'name' => 'phone_home',
      ),
      'address' => 
      array (
        'type' => 'text',
        'label' => 'LBL_ADDRESS',
        'sortable' => false,
        'width' => '10%',
        'default' => true,
        'name' => 'address',
      ),
      'nationality' => 
      array (
        'type' => 'multienum',
        'label' => 'LBL_NATIONALITY',
        'width' => '10%',
        'default' => true,
        'name' => 'nationality',
      ),
      'provice_city' => 
      array (
        'type' => 'enum',
        'label' => 'LBL_PROVINCE_CITY',
        'sortable' => false,
        'width' => '10%',
        'default' => true,
        'name' => 'provice_city',
      ),
      'religion' => 
      array (
        'type' => 'enum',
        'label' => 'LBL_RELIGION',
        'sortable' => false,
        'width' => '10%',
        'default' => true,
        'name' => 'religion',
      ),
      'nick_chat' => 
      array (
        'type' => 'varchar',
        'label' => 'LBL_NICKCHAT',
        'width' => '10%',
        'default' => true,
        'name' => 'nick_chat',
      ),
      'fit_type' => 
      array (
        'type' => 'enum',
        'label' => 'LBL_FIT_TYPE',
        'sortable' => false,
        'width' => '10%',
        'default' => true,
        'name' => 'fit_type',
      ),
      'fit_action' => 
      array (
        'type' => 'enum',
        'label' => 'LBL_FIT_ACTION',
        'sortable' => false,
        'width' => '10%',
        'default' => true,
        'name' => 'fit_action',
      ),
      'potential' => 
      array (
        'type' => 'enum',
        'label' => 'LBL_POTENTIAL',
        'sortable' => false,
        'width' => '20%',
        'default' => true,
        'name' => 'potential',
      ),
      'fits_fits_name' => 
      array (
        'type' => 'relate',
        'link' => 'fits_fits',
        'label' => 'LBL_FITS_FITS_FROM_FITS_L_TITLE',
        'width' => '10%',
        'default' => true,
        'name' => 'fits_fits_name',
      ),
      'accounts_fits_name' => 
      array (
        'type' => 'relate',
        'link' => 'accounts_fits',
        'label' => 'LBL_ACCOUNTS_FITS_FROM_ACCOUNTS_TITLE',
        'width' => '10%',
        'default' => true,
        'name' => 'accounts_fits_name',
      ),
      'phone_fax' => 
      array (
        'type' => 'phone',
        'label' => 'LBL_FAX_PHONE',
        'width' => '10%',
        'default' => true,
        'name' => 'phone_fax',
      ),
      'assigned_user_name' => 
      array (
        'link' => 'assigned_user_link',
        'type' => 'relate',
        'label' => 'LBL_ASSIGNED_TO_NAME',
        'width' => '10%',
        'default' => true,
        'name' => 'assigned_user_name',
      ),
      'identy_card' => 
      array (
        'type' => 'varchar',
        'label' => 'LBL_IDENTY_CARD',
        'width' => '10%',
        'default' => true,
        'name' => 'identy_card',
      ),
      'date_modified' => 
      array (
        'type' => 'datetime',
        'label' => 'LBL_DATE_MODIFIED',
        'width' => '10%',
        'default' => true,
        'name' => 'date_modified',
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
      'date_entered' => 
      array (
        'type' => 'datetime',
        'label' => 'LBL_DATE_ENTERED',
        'width' => '10%',
        'default' => true,
        'name' => 'date_entered',
      ),
      'current_user_only' => 
      array (
        'label' => 'LBL_CURRENT_USER_FILTER',
        'type' => 'bool',
        'default' => true,
        'width' => '10%',
        'name' => 'current_user_only',
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
