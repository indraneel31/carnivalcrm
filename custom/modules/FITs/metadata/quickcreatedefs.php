<?php
$module_name = 'FITs';
$viewdefs [$module_name] = 
array (
  'QuickCreate' => 
  array (
    'templateMeta' => 
    array (
      'maxColumns' => '2',
      'widths' => 
      array (
        0 => 
        array (
          'label' => '10',
          'field' => '30',
        ),
        1 => 
        array (
          'label' => '10',
          'field' => '30',
        ),
      ),
      'includes' => 
      array (
        0 => 
        array (
          'file' => 'custom/include/js/jquery.js',
        ),
        1 => 
        array (
          'file' => 'custom/modules/FITs/js/duplicate.js',
        ),
      ),
      'useTabs' => false,
    ),
    'panels' => 
    array (
      'lbl_contact_information' => 
      array (
        0 => 
        array (
          0 => 
          array (
            'name' => 'first_name',
            'customCode' => '{html_options name="salutation" options=$fields.salutation.options selected=$fields.salutation.value}&nbsp;<input name="first_name" size="25" maxlength="25" type="text" value="{$fields.first_name.value}">',
          ),
          1 => 
          array (
            'name' => 'last_name',
            'displayParams' => 
            array (
              'required' => true,
            ),
          ),
        ),
        1 => 
        array (
          0 => 'gender',
          1 => 
          array (
            'name' => 'birthday',
            'label' => 'LBL_BIRTHDAY',
          ),
        ),
        2 => 
        array (
          0 => 
          array (
            'name' => 'identy_card',
            'label' => 'LBL_IDENTY_CARD',
          ),
          1 => 'phone_mobile',
        ),
        3 => 
        array (
          0 => 'email1',
          1 => 'phone_home',
        ),
        4 => 
        array (
          0 => 'deparment',
          1 => 'assigned_user_name',
        ),
      ),
    ),
  ),
);
?>
