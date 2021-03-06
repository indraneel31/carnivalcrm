<?php
$module_name = 'ContractAppendixs';
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
            'customCode' => '<input type="button" class="button" onClick="showPopup(\'doc\');" value="Export To Word">',
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
          0 => 
          array (
            'name' => 'number',
            'label' => 'LBL_NUMBER',
          ),
        ),
        1 => 
        array (
          0 => 
          array (
            'name' => 'contracts_cappendixs_name',
          ),
          1 => 
          array (
            'name' => 'contract',
            'label' => 'LBL_NUMBER_CONTRACT',
          ),
        ),
        2 => 
        array (
          0 => 
          array (
            'name' => 'date',
            'label' => 'LBL_DATE',
          ),
          1 => 
          array (
            'name' => 'date_of_contracts',
            'label' => 'LBL_DATE_OF_CONTRACTS',
          ),
        ),
        3 => 
        array (
          0 => 
          array (
            'name' => 'daidienbena',
            'label' => 'LBL_BEN_A',
          ),
          1 => 
          array (
            'name' => 'position_a',
            'label' => 'LBL_POSITION',
          ),
        ),
        4 => 
        array (
          0 => 
          array (
            'name' => 'address_a',
            'label' => 'LBL_ADDRESS',
          ),
          1 => 
          array (
            'name' => 'phone_a',
            'label' => 'LBL_PHONE',
          ),
        ),
        5 => 
        array (
          0 => 
          array (
            'name' => 'fax',
            'label' => 'LBL_FAX',
          ),
          1 => 
          array (
            'name' => 'mst_bena',
            'label' => 'LBL_TAX',
          ),
        ),
        6 => 
        array (
          0 => 
          array (
            'name' => 'parent_name',
            'label' => 'LBL_BEN_B',
          ),
        ),
        7 => 
        array (
          0 => 
          array (
            'name' => 'daidienbenb_name',
            'label' => 'LBL_BEN_B_NAME',
          ),
          1 => 
          array (
            'name' => 'position_b',
            'label' => 'LBL_POSITION',
          ),
        ),
        8 => 
        array (
          0 => 
          array (
            'name' => 'address_b',
            'label' => 'LBL_ADDRESS',
          ),
          1 => 
          array (
            'name' => 'phone_b',
            'label' => 'LBL_PHONE',
          ),
        ),
        9 => 
        array (
          0 => 
          array (
            'name' => 'sotaikhoanbenb',
            'label' => 'LBL_SOTAIKHOANBENB',
          ),
          1 => 
          array (
            'name' => 'mst_benb',
            'label' => 'LBL_TAX',
          ),
        ),
        10 => 
        array (
          0 => 
          array (
            'name' => 'birthday',
            'label' => 'LBL_BIRTHDAY',
          ),
          1 => 
          array (
            'name' => 'passport_no_guide',
            'label' => 'LBL_PASSPORT_NO',
          ),
        ),
        11 => 
        array (
          0 => 
          array (
            'name' => 'date_issued_guide',
            'label' => 'LBL_DATE_ISSUED_GUIDE',
          ),
          1 => 
          array (
            'name' => 'place_issued_guide',
            'label' => 'LBL_PLACE_ISSUED_GUIDE',
          ),
        ),
        12 => 
        array (
          0 => 
          array (
            'name' => 'tours_contrappendixs_name',
          ),
        ),
        13 => 
        array (
          0 => 
          array (
            'name' => 'tour',
            'customCode' => '{$contract_value}',
            'customLabel' => '{$MOD.LBL_CONTRACT_VALUE}:',
          ),
        ),
        14 => 
        array (
          0 => 
          array (
            'name' => 'tongtien',
            'label' => 'LBL_TONGTIEN',
          ),
          1 => 
          array (
            'name' => 'bangchu',
            'label' => 'LBL_BANGCHU',
          ),
        ),
        15 => 
        array (
          0 => 
          array (
            'name' => 'tigia',
            'label' => 'LBL_TIGIA',
          ),
          1 => 
          array (
            'name' => 'tiente',
            'label' => 'LBL_TIENTE',
          ),
        ),
        16 => 
        array (
          0 => 
          array (
            'name' => 'tongtien2',
            'label' => 'LBL_TUONGDUONG',
          ),
        ),
        17 => 
        array (
          0 => 
          array (
            'name' => 'template_ddown_c',
            'studio' => 'visible',
            'label' => 'LBL_TEMPLATE_DDOWN_C',
          ),
          1 => 'assigned_user_name',
        ),
      ),
    ),
  ),
);
?>
