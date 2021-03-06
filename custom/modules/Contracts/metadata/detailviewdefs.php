<?php
$module_name = 'Contracts';
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
      'includes' => 
      array (
        0 => 
        array (
          'file' => 'custom/include/js/jquery.table.clone.js',
        ),
      ),
      'useTabs' => false,
    ),
    'panels' => 
    array (
      'lbl_editview_panel1' => 
      array (
        0 => 
        array (
          0 => 
          array (
            'name' => 'number',
            'label' => 'LBL_NUMBER',
          ),
          1 => '',
        ),
        1 => 
        array (
          0 => 
          array (
            'name' => 'date_of_contracts',
            'label' => 'LBL_DATE_OF_CONTRACTS',
          ),
          1 => 
          array (
            'name' => 'date_of_contracts_liquidate',
            'label' => 'LBL_DATE_OF_CONTRACTS_LIQUIDATE',
          ),
        ),
        2 => 
        array (
          0 => 
          array (
            'name' => 'template_ddown_c',
            'studio' => 'visible',
            'label' => 'LBL_TEMPLATE_DDOWN_C',
          ),
          1 => 'assigned_user_name',
        ),
        3 => 
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
      'default' => 
      array (
        0 => 
        array (
          0 => 
          array (
            'name' => 'bena',
            'label' => 'LBL_BEN_A',
          ),
        ),
        1 => 
        array (
          0 => 
          array (
            'name' => 'daidienbena',
            'label' => 'LBL_BEN_A_NAME',
          ),
          1 => 
          array (
            'name' => 'position_a',
            'label' => 'LBL_POSITON_A',
          ),
        ),
        2 => 
        array (
          0 => 
          array (
            'name' => 'address_a',
            'label' => 'LBL_ADDRESS',
          ),
          1 => 
          array (
            'name' => 'mst_bena',
            'label' => 'LBL_TAX',
          ),
        ),
        3 => 
        array (
          0 => 
          array (
            'name' => 'fax_a',
            'label' => 'LBL_FAXA',
          ),
          1 => 
          array (
            'name' => 'phone_a',
            'label' => 'LBL_PHONE',
          ),
        ),
        4 => 
        array (
          0 => 
          array (
            'name' => 'bank_name',
            'label' => 'LBL_BANK_ACCOUNT',
          ),
          1 => 
          array (
            'name' => 'account_name',
            'label' => 'LBL_BANK_ACCOUNT_NAME',
          ),
        ),
        5 => 
        array (
          0 => 
          array (
            'name' => 'account_vnd',
            'label' => 'LBL_ACCOUNT_VND',
          ),
          1 => 
          array (
            'name' => 'account_usd',
            'label' => 'LBL_ACCOUNT_USD',
          ),
        ),
        6 => 
        array (
          0 => 
          array (
            'name' => 'swift_code',
            'label' => 'LBL_SWIFT_CODE',
          ),
          1 => 
          array (
            'name' => 'bank_address',
            'label' => 'LBL_BANK_ADDRESS',
          ),
        ),
        7 => 
        array (
          0 => 
          array (
            'name' => 'vpdd',
            'label' => 'LBL_VPDD',
          ),
        ),
        8 => 
        array (
          0 => 
          array (
            'name' => 'vpdd_diachi',
            'label' => 'LBL_ADDRESS',
          ),
        ),
        9 => 
        array (
          0 => 
          array (
            'name' => 'vpdd_dienthoai',
            'label' => 'LBL_PHONE',
          ),
          1 => 
          array (
            'name' => 'vpdd_fax',
            'label' => 'LBL_FAX',
          ),
        ),
        10 => 
        array (
          0 => 
          array (
            'name' => 'parent_name',
            'label' => 'LBL_BEN_B',
          ),
        ),
        11 => 
        array (
          0 => 
          array (
            'name' => 'contacts_contracts_name',
          ),
          1 => 
          array (
            'name' => 'position_b',
            'label' => 'LBL_POSITION_B',
          ),
        ),
        12 => 
        array (
          0 => 
          array (
            'name' => 'address_b',
            'label' => 'LBL_ADDRESS',
          ),
          1 => 
          array (
            'name' => 'mst_benb',
            'label' => 'LBL_TAX',
          ),
        ),
        13 => 
        array (
          0 => 
          array (
            'name' => 'phone_b',
            'label' => 'LBL_PHONE',
          ),
          1 => 
          array (
            'name' => 'fax_b',
            'label' => 'LBL_FAXB',
          ),
        ),
        14 => 
        array (
          0 => 
          array (
            'name' => 'bank_name_b',
            'label' => 'LBL_BANK_NAME_B',
          ),
          1 => 
          array (
            'name' => 'account_name_b',
            'label' => 'LBL_ACCOUNT_NAME_B',
          ),
        ),
        15 => 
        array (
          0 => 
          array (
            'name' => 'sotaikhoanbenb',
            'label' => 'LBL_SOTAIKHOANBENB',
          ),
          1 => '',
        ),
        16 => 
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
      ),
      'LBL_TOUR_INFORMATION' => 
      array (
        0 => 
        array (
          0 => 
          array (
            'name' => 'groupprogracontracts_name',
          ),
          1 => 
          array (
            'name' => 'tensanbay',
            'label' => 'LBL_TENSANBAY',
          ),
        ),
        1 => 
        array (
          0 => 
          array (
            'name' => 'start_date_contract',
            'label' => 'LBL_START_DATE',
          ),
          1 => 
          array (
            'name' => 'end_date_contract',
            'label' => 'LBL_END_DATE',
          ),
        ),
        2 => 
        array (
          0 => 
          array (
            'name' => 'num_of_date',
            'label' => 'LBL_NUM_OF_DATE',
          ),
          1 => 
          array (
            'name' => 'num_of_night',
            'label' => 'LBL_NUM_OF_NIGHT',
          ),
        ),
        3 => 
        array (
          0 => 
          array (
            'name' => 'associate',
            'label' => 'LBL_ASSOCIATE',
          ),
          1 => 
          array (
            'name' => 'purpose',
            'label' => 'LBL_PURPOSE',
          ),
        ),
      ),
      'LBL_CONTRACT_VALUES' => 
      array (
        0 => 
        array (
          0 => 
          array (
            'name' => 'contract_value',
            'label' => 'LBL_CONTRACT_VALUE',
            'customCode' => '{$contract_value}',
          ),
        ),
        1 => 
        array (
          0 => 
          array (
            'name' => 'tongtien',
            'label' => 'LBL_TONGTIEN',
            'customCode' => '<span>{$tongtien}</span>&nbsp;<span>{$fields.tiente.options[$fields.tiente.value]}</span>',
          ),
          1 => 
          array (
            'name' => 'bangchu',
            'label' => 'LBL_BANGCHU',
          ),
        ),
        2 => 
        array (
          0 => 
          array (
            'name' => 'contract_value_note',
            'label' => 'LBL_CONTRACT_VALUE_NOTE',
          ),
          1 => '',
        ),
        3 => 
        array (
          0 => 
          array (
            'name' => 'baogom',
            'label' => 'LBL_BAOGOM',
          ),
          1 => '',
        ),
        4 => 
        array (
          0 => 
          array (
            'name' => 'khongbaogom',
            'label' => 'LBL_KHONGBAOGOM',
          ),
          1 => '',
        ),
      ),
      'LBL_CONTRACT_CONDITIONS' => 
      array (
        0 => 
        array (
          0 => 
          array (
            'name' => 'solanthanhtoan',
            'label' => 'LBL_SOLANTHANHTOAN',
          ),
          1 => 
          array (
            'name' => 'tienhuyphat',
            'label' => 'LBL_TIENHUYPHAT',
          ),
        ),
        1 => 
        array (
          0 => 
          array (
            'name' => 'contract_condition',
            'label' => 'LBL_CONTRACT_CONDITION',
            'customCode' => '{$contract_condition}',
          ),
        ),
      ),
    ),
  ),
);
?>
