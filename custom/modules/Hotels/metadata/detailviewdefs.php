<?php
$module_name = 'Hotels';
$viewdefs [$module_name] = 
array (
  'DetailView' => 
  array (
    'templateMeta' => 
    array (
      'form' => 
      array (
        'buttons' => 
        array (
          0 => 'EDIT',
          1 => 'DUPLICATE',
          2 => 'DELETE',
        ),
      ),
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
    ),
    'panels' => 
    array (
      'default' => 
      array (
        0 => 
        array (
          0 => 'name',
          1 => 'code',
        ),
        1 => 
        array (
          0 => 'email1',
          1 => 
          array (
            'name' => 'tel',
            'customCode' => '<a href="callto://{$fields.tel.value}">{$fields.tel.value}</a>',
          ),
        ),
        2 => 
        array (
          0 => 'tax_id',
          1 => 'fax',
        ),
        3 => 
        array (
          0 => 'destinations_hotels_name',
          1 => 'countries_hotels_name',
        ),
        4 => 
        array (
          0 => 'standard',
          1 => 'number_of_room',
        ),
        5 => 
        array (
          0 => 
          array (
            'name' => 'website',
            'type' => 'link',
            'label' => 'LBL_WEBSITE',
            'displayParams' => 
            array (
              'link_target' => '_blank',
            ),
          ),
          1 => '',
        ),
        6 => 
        array (
          0 => 'area',
          1 => 'city_province',
        ),
        7 => 
        array (
          0 => 'address',
        ),
        8 => 
        array (
          0 => 'description',
        ),
        9 => 
        array (
          0 => 'assigned_user_name',
        ),
        10 => 
        array (
          0 => 
          array (
            'name' => 'date_entered',
            'customCode' => '{$fields.date_entered.value} {$APP.LBL_BY} {$fields.created_by_name.value}',
            'label' => 'LBL_DATE_ENTERED',
          ),
          1 => 
          array (
            'name' => 'date_modified',
            'customCode' => '{$fields.date_modified.value} {$APP.LBL_BY} {$fields.modified_by_name.value}',
            'label' => 'LBL_DATE_MODIFIED',
          ),
        ),
      ),
      'lbl_giathamkhao' => 
      array (
        0 => 
        array (
          0 => 'giathamkhao',
          1 => 'ngaythamkhaogia',
        ),
      ),
    ),
  ),
);
?>
