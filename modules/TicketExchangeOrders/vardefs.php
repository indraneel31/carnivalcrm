<?php
   if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');   
   
   $dictionary['TicketExchangeOrders'] = array ('audited'=>true,
    'comment' => '',
    'table' => 'TicketExchangeOrders',
    'unified_search' => true,
    'fields'  => array(      
    'code'  => array(
      'name'    => 'code',
      'vname'   => 'LBL_CODE',
      'type'    => 'varchar',
      'len'     => 150,
    ),
    'autocode'    => array(
        'name' => 'autocode',
        'vname' => '',
        'type' => 'int',
        'massupdate' => 0,
        'comments' => '',
        'help' => '',
        'duplicate_merge' => 'disabled',
        'duplicate_merge_dom_value' => 0,
        'audited' => 0,
        'reportable' => 0,
        'len' => '25',
      ),
    
    ),
    
    'indices' => array (

),
    
    'relationship' => array(
        
    ),
    
    'optimistic_lock'=>true,
    
    
    
);
VardefManager::createVardef('TicketExchangeOrders','TicketExchangeOrders', array('default', 'assignable', ));
?>
