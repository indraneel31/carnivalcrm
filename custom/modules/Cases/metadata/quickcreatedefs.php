<?php
$viewdefs ['Cases'] = 
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
            'name' => 'name',
            'displayParams' => 
            array (
              'size' => 65,
              'required' => true,
            ),
          ),
          1 => 'priority',
        ),
        1 => 
        array (
          0 => 'status',
          1 => 'type',
        ),
        2 => 
        array (
          0 => 'assigned_user_name',
          1 => 
          array (
            'name' => 'description',
            'displayParams' => 
            array (
              'rows' => '4',
              'cols' => '60',
            ),
            'nl2br' => true,
          ),
        ),
      ),
    ),
  ),
);
?>
