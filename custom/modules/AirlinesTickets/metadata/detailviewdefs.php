<?php
$module_name = 'AirlinesTickets';
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
          3 => 
          array (
            'customCode' => '<input title="{$MOD.LBL_EXPORTTOWORD}" type="button" accessKey="" class="button" onclick="window.location.href=\'index.php?module=AirlinesTickets&action=export2word&record={$fields.id.value}\'" name="export" value="Export To Word">',
          ),
          4 => 
          array (
            'customCode' => '<input title="{$MOD.LBL_EXPORTEXCHANGE}" type="button" accessKey="" class="button" onclick="window.location.href=\'index.php?module=AirlinesTickets&action=exportexchangeorder&record={$fields.id.value}\'" name="export" value="Export Exchange Order">',
          ),
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
      'useTabs' => false,
    ),
    'panels' => 
    array (
      'default' => 
      array (
        0 => 
        array (
          0 => 'name',
          1 => 'from_itinerary',
        ),
        1 => 
        array (
          0 => 'airline_status',
          1 => 
          array (
            'name' => 'groupprograestickets_name',
            'label' => 'LBL_MADETOUR',
          ),
        ),
        2 => 
        array (
          0 => 
          array (
            'name' => 'type_air_train',
            'label' => 'LBL_TYPE_AIR_TRAIN',
          ),
          1 => 
          array (
            'name' => 'airlines_aiestickets_name',
            'label' => 'LBL_AIRLINES',
          ),
        ),
        3 => 
        array (
          0 => 'type',
          1 => 
          array (
            'name' => 'area',
            'label' => 'LBL_AREA',
          ),
        ),
        4 => 
        array (
          0 => 'itinerary',
          1 => 'booking_class',
        ),
        5 => 
        array (
          0 => 'booking_code',
          1 => 'time',
        ),
        6 => 
        array (
          0 => 'tax_fee_change',
          1 => 'commisson',
        ),
        7 => 
        array (
          0 => 'nett',
          1 => 'roe',
        ),
        8 => 
        array (
          0 => 'equivalent_in_vn',
          1 => 'airlines_representative',
        ),
        9 => 
        array (
          0 => 'ticket_agency',
          1 => 'fare',
        ),
        10 => 
        array (
          0 => 'description',
          1 => 'messenger',
        ),
        11 => 
        array (
          0 => 'assigned_user_name',
        ),
        12 => 
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
    ),
  ),
);
?>
