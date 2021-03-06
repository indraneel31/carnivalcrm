<?php
$viewdefs ['Opportunities'] = 
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
          3 => 'FIND_DUPLICATES',
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
          1 => 'account_name',
        ),
        1 => 
        array (
          0 => 
          array (
            'name' => 'currency_id',
            'comment' => 'Currency used for display purposes',
            'label' => 'LBL_CURRENCY',
          ),
          1 => 'date_closed',
        ),
        2 => 
        array (
          0 => 
          array (
            'name' => 'amount',
            'label' => '{$MOD.LBL_AMOUNT} ({$CURRENCY})',
          ),
          1 => 'opportunity_type',
        ),
        3 => 
        array (
          0 => 'sales_stage',
          1 => 'lead_source',
        ),
        4 => 
        array (
          0 => 'probability',
          1 => 'campaign_name',
        ),
        5 => 
        array (
          0 => 'next_step',
          1 => 
          array (
            'name' => 'description',
            'nl2br' => true,
          ),
        ),
        6 => 
        array (
          0 => 
          array (
            'name' => 'fits_opportunities_name',
          ),
          1 => 
          array (
            'name' => 'contacts_oprtunities_name',
          ),
        ),
      ),
      'lbl_editview_panel1' => 
      array (
        0 => 
        array (
          0 => 
          array (
            'name' => 'ngaykhoihanh',
            'label' => 'LBL_NGAYKHOIHANH',
          ),
          1 => 
          array (
            'name' => 'songaydi',
            'label' => 'LBL_SONGAYDI',
          ),
        ),
        1 => 
        array (
          0 => 
          array (
            'name' => 'songuoilon',
            'label' => 'LBL_SONGUOILON',
          ),
          1 => 
          array (
            'name' => 'thongtintreem',
            'studio' => 'visible',
            'label' => 'LBL_THONGTINTREEM',
          ),
        ),
        2 => 
        array (
          0 => 
          array (
            'name' => 'noimuondi',
            'label' => 'LBL_NOIMUONDI',
          ),
          1 => 
          array (
            'name' => 'phuongtienmuondi',
            'label' => 'LBL_PHUONGTIENMUONDI',
          ),
        ),
      ),
      'LBL_PANEL_ASSIGNMENT' => 
      array (
        0 => 
        array (
          0 => 
          array (
            'name' => 'assigned_user_name',
            'label' => 'LBL_ASSIGNED_TO',
          ),
        ),
        1 => 
        array (
          0 => 
          array (
            'name' => 'date_entered',
            'customCode' => '{$fields.date_entered.value} {$APP.LBL_BY} {$fields.created_by_name.value}',
          ),
          1 => 
          array (
            'name' => 'date_modified',
            'label' => 'LBL_DATE_MODIFIED',
            'customCode' => '{$fields.date_modified.value} {$APP.LBL_BY} {$fields.modified_by_name.value}',
          ),
        ),
      ),
    ),
  ),
);
?>
