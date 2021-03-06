<?php
     if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');   
     
     class  Order extends SugarBean{
         
        var $new_schema = true;
        var $module_dir = 'Orders';
        var $object_name = 'Order';
        var $table_name = 'orders';
        var $importable = true; 
        
        var $id;
        var $date_entered;
        var $date_modified;
        var $modified_user_id;
        var $assigned_user_id;
        var $created_by;
        var $created_by_name;
        var $currency_id;
        var $modified_by_name;
        var $name;
        var $description;
        var $quanity;
        var $standard_of_hotel;
        var $price_of_meal;
        var $time;
        var $phone;
        var $email1;
        var $email2;
        var $email_addresses_primary;
        var $email_addresses;
        
        function Order(){
            global $sugar_config;
            parent::SugarBean();
            $this->emailAddress = new SugarEmailAddress();
        }
        
        function get_summary_text() {
            return "$this->name";
        }
        
        function retrieve($id = -1, $encode=true) { 
            $ret_val = parent::retrieve($id, $encode); 
            $this->emailAddress->handleLegacyRetrieve($this); 
            return $ret_val; 
        } 

        function save($check_notify=false) { 
            $this->emailAddress->handleLegacySave($this, $this->module_dir); 
            $email1_ori = $this->email1; 
            $email2_ori = $this->email2; 
            $this->in_workflow = false; 
            parent::save($check_notify); 
            $override_email = array(); 
            if($this->in_workflow) {// workflow will edit this $this->email1 and $this->email2 
                if($email1_ori != $this->email1) { 
                    $override_email['emailAddress0'] = $this->email1; 
                } 
                if($email2_ori != $this->email2) { 
                    $override_email['emailAddress1'] = $this->email2; 
                } 
            } 
            $this->emailAddress->save($this->id, $this->module_dir, $override_email,'','','','',$this->in_workflow); 
            return $this->id; 
        } 

        function get_list_view_data() { 
            global $system_config; 
            global $current_user; 
            $temp_array = $this->get_list_view_array(); 
            $temp_array['NAME'] = $this->name; 
            $temp_array['EMAIL1'] = $this->emailAddress->getPrimaryAddress($this);
            $this->email1 =  $temp_array['EMAIL1'];
            $temp_array['EMAIL1_LINK'] = $current_user->getEmailLink('email1', $this, '', '', 'ListView'); 
            return $temp_array; 
        }

        function bean_implements($interface){
        switch($interface){
            case 'ACL':return true;
        }
        return false;
    }
     }
?>
