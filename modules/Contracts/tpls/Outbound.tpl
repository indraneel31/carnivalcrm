{literal}

<script type="text/javascript" src="custom/include/js/jquery.table.clone.js"> </script>    
<script type="text/javascript" src="custom/include/js/doctien.js"> </script>
<script type="text/javascript" src="custom/include/js/ParentType.js"> </script>
<script type="text/javascript" src="modules/Contracts/js/calculating.js"></script>
<script type="text/javascript" src="custom/include/js/popupRequest.js"></script>
{/literal}
<form action="index.php"  name="EditView" id="EditView" method="post">
    <input type="hidden"   name="module"         value="Contracts">
    <input type="hidden"   name="record"         value="{$ID}"> 
    <input type="hidden"   name="action">
    <input type="hidden"   name="return_module"  value="{$RETURN_MODULE}">
    <input type="hidden"   name="return_id"      value="{$RETURN_ID}">
    <input type="hidden"   name="return_action"  value="{$RETURN_ACTION}">
    <div class="container"> 
        <input title="{$APP.LBL_SAVE_BUTTON_TITLE}"  accessKey="{$APP.LBL_SAVE_BUTTON_KEY}"   class="button" 
            onclick="this.form.action.value='Save';return check_form('EditView');" 
            type="submit" name="button" value="  {$APP.LBL_SAVE_BUTTON_LABEL}  " > 
        <input title="{$APP.LBL_CANCEL_BUTTON_TITLE}" accessKey="{$APP.LBL_CANCEL_BUTTON_KEY}" class="button" 
            onclick="this.form.action.value='{$RETURN_ACTION}'; this.form.module.value='{$RETURN_MODULE}'; this.form.record.value='{$RETURN_ID}'" 
            type="submit" name="button" value="  {$APP.LBL_CANCEL_BUTTON_LABEL}  ">
        {if $ID neq ''}
        <input title="View Change Log" class="button" onclick='open_popup("Audit", "600", "400", "&record={$ID}&module_name=Contracts", true, false, {$view_change_log} ); return false;' type="submit" value="View Change Log">
        {/if}
    </div>
    <table cellpadding="0" cellpadding="0" border="0" width="100%" class="tabForm">
        <tr>
            <td class="dataLabel">Số<span class="required">*</span>:</td>
            <td class="dataField"><input name="number" type="text"  id="number" value="{$NUMBER}"/></td>
            <td class="dataLabel"><input type="hidden" id="type" name="type" value="{$TYPE}"/></td>
            <td class="dataField">&nbsp;</td>
        </tr>
        <tr>
            <td class="dataLabel">{$MOD.LBL_DATE_OF_CONTRACTS}</td>
            <td class="dataField"><input id='date_of_contracts' name='date_of_contracts' onblur="parseDate(this, '{$CALENDAR_DATEFORMAT}');"  type="text" tabindex='1' size='15' maxlength='10' value="{$DATE_OF_CONTRACTS}"/> <img src="themes/default/images/jscalendar.gif" alt="{$APP.LBL_ENTER_DATE}" id="date_of_contract_trigger" align="absmiddle"> (dd/mm/yy) </td>
            <td class="dataLabel">&nbsp;</td> 
            <td class="dataField">&nbsp;</td> 
        </tr>
        <tr>
            <td class="dataLabel">Loại hợp đồng:</td>
            <td class="dataField">
                <select id="parent_type" class="parent_type" name="parent_type">{$PARENT_TYPE}</select>
            </td>
        </tr>
        <tr>    
            <td colspan="2" > <b>BÊN A: CÔNG TY TNHH MỘT THÀNH VIÊN DV DL LỄ HỘI (CARNIVAL)</b> </td>
            <td class="dataLabel">&nbsp;</td>
            <td class="dataField">&nbsp;</td>
        </tr>
        <tr>
            <td class="dataLabel">Do <span class="required">*</span>:</td>
            <td class="dataField"> <select id="salutation_a" name="salutation_a" >{$SALUTATION_A}</select><input name="daidienbena" type="text"  id="daidienbena" size="35" value="{$DAIDIENBENA}" /></td>
            <td class="dataLabel"> Chức vụ:   </td>
            <td class="dataField"><select id="position_a" name="position_a" >{$POSITION_A}</select></td>
        </tr>
        <tr>
            <td class="dataLabel"> Địa chỉ:</td> 
            <td> <textarea name="address_a" id="address_a" cols="60" rows="3">{$ADDRESS_A}</textarea></td>
            <td class="dataLabel"> Điện thoại:</td> 
            <td> <input name="phone_a" id="phone_a" type="text" value="{$PHONE_A}"  size="35"/> </td>
        </tr>
        <tr>
            <td class="dataLabel"> Fax:</td> 
            <td > <input name="fax_a" id="fax_a" type="text" value="{$FAXA}"  size="35"/> </td> 
            <td class="dataLabel"> MST:</td> 
            <td> <input name="mst_bena" id="mst_bena" value="{$MST_BENA}" type="text"  size="35" /> </td>  
        </tr>
        <tr>
            <td class="dataLabel"> Tài khoản tại ngân hàng:</td> 
            <td> <input name="bank_name" id="bank_name" type="text"  value="{$BANK_NAME}" size="35"/> - TP Hồ Chí Minh</td> 
            <td class="dataLabel"> Tên chủ tài khoản:</td> 
            <td><textarea name="account_name" id="account_name" cols="45" rows="3"> {$ACCOUNT_NAME}  </textarea> </td>
        </tr>
        <tr>
            <td class="dataLabel"> Tên khoản VND:</td> 
            <td> <input name="account_vnd" id="account_vnd" type="text" value="{$ACCOUNT_VND}" size="35"/> </td>
            <td class="dataLabel"> Tên khoản USD:</td> 
            <td> <input name="account_usd" id="account_usd" type="text" value="{$ACCOUNT_USD}"  size="35"/> </td>
        </tr>
        <tr>
            <td class="dataLabel" > Swift code:</td>
            <td> <input name="swift_code" id="swift_code" type="text" value="{$SWIFT_CODE}"  size="35"/> </td>
            <td class="dataLabel"> Địa chỉ ngân hàng: </td>
            <td> <textarea name="bank_address" id="bank_address" cols="45" rows="3"> {$BANK_ADDRESS} </textarea>  </td>
        </tr>
        <tr>
            <td colspan="4" class="dataLabel"><h4>Làm đại diện bên A</h4> </td>
        </tr>
        <tr>
            <td> <b>BÊN B </b><span class="required">*</span>:</td>
            <td class="dataField">
                <input type="text" name="parent_name" id="parent_name" readonly="readonly" size="40" value="{$PARENT_NAME}"/>
                <input type="hidden" id="parent_id" name="parent_id" value="{$PARENT_ID}">
<!--                <input title="{$APP.LBL_SELECT_BUTTON_TITLE}" accessKey="{$APP.LBL_SELECT_BUTTON_KEY}" type="button" tabindex='2' class="button parent_name" value='{$APP.LBL_SELECT_BUTTON_LABEL}' name="bnt_parent_name" id="bnt_parent_name">  -->
                <button title="{$APP.LBL_SELECT_BUTTON_TITLE}" tabindex='2' class="button parent_name" name="bnt_parent_name" id="bnt_parent_name"><img src="themes/default/images/id-ff-select.png"></button>  
<!--                <input title="{$APP.LBL_CLEAR_BUTTON_TITLE}" accessKey="{$APP.LBL_CLEAR_BUTTON_KEY}" type="button" tabindex='2' class="button" name="btn_parent_name_clear" id="btn_parent_name_clear" value="{$APP.LBL_CLEAR_BUTTON_LABEL}" onclick="this.form.parent_name.value='', this.form.parent_id.value='';"/>  -->
                <button="{$APP.LBL_CLEAR_BUTTON_TITLE}" tabindex='2' class="button" name="btn_parent_name_clear" id="btn_parent_name_clear" onclick="this.form.parent_name.value='', this.form.parent_id.value='';"/><img src="themes/default/images/id-ff-clear.png"></button>  
            </td>
        </tr>

        <tr class="hopdongdichvu"  {if !($PARENT eq 'Accounts' or $PARENT eq 'FITs' or $PARENT eq 'Restaurants' or $PARENT eq 'Hotels' or $PARENT eq 'Transports')} style="display:none" {/if}>
        <td class="dataLabel hopdongdichvu" > Do  <span class="required">*</span>: </td>
        <td class="dataField hopdongdichvu"> <!--<select id="salutation_b" name="salutation_b" >{$SALUTATION_B}</select>--> <input name="daidienbenb_name" id="daidienbenb_name" type="text" readonly="readonly"  size="35" value="{$DAIDIENBENB_NAME}"/>
<!--            <input title="{$APP.LBL_SELECT_BUTTON_TITLE}" accessKey="{$APP.LBL_SELECT_BUTTON_KEY}" type="button" tabindex='2' class="button daidienbenbname" value='{$APP.LBL_SELECT_BUTTON_LABEL}' name="bnt_daidienbenb" id="bnt_daidienbenb">  -->
            <button title="{$APP.LBL_SELECT_BUTTON_TITLE}" accessKey="{$APP.LBL_SELECT_BUTTON_KEY}" type="button" tabindex='2' class="button daidienbenbname" value='{$APP.LBL_SELECT_BUTTON_LABEL}' name="bnt_daidienbenb" id="bnt_daidienbenb"><img src="themes/default/images/id-ff-select.png"></button>
<!--            <input title="{$APP.LBL_CLEAR_BUTTON_TITLE}" accessKey="{$APP.LBL_CLEAR_BUTTON_KEY}" type="button" tabindex='2' class="button" name="btn_parent_name_clear" id="btn_parent_name_clear" value="{$APP.LBL_CLEAR_BUTTON_LABEL}" onclick="this.form.daidienbenb_name.value='';"/>-->
            <button title="{$APP.LBL_CLEAR_BUTTON_TITLE}" accessKey="{$APP.LBL_CLEAR_BUTTON_KEY}" type="button" tabindex='2' class="button" name="btn_parent_name_clear" id="btn_parent_name_clear" value="{$APP.LBL_CLEAR_BUTTON_LABEL}" onclick="this.form.daidienbenb_name.value='';"><img src="themes/default/images/id-ff-clear.png"></button>
        </td>
        <td class="dataLabel hopdongdichvu">Chức vụ </td>
        <td class="dataField hopdongdichvu"><select id="position_b" name="position_b" >{$POSITION_B}</select></td>
        </tr>
        <tr class="hochieukhachle">
            <td class="dataLabel">{$MOD.LBL_SOHOCHIEUKHACHLE}</td>
            <td class="dataField"> <input type="text" name="sohochieukhachle" id="sohochieukhachle" value="{$SOHOCHIEUKHACHLE}"></td>
            <td class="dataLabel">{$MOD.LBL_NGAYCAPHOCHIEU}</td>
            <td class="dataField"><input type="text" name="ngaycaphochieu" id="ngaycaphochieu" value="{$NGAYCAPHOCHIEU}" onblur="parseDate(this, '{$CALENDAR_DATEFORMAT}');"  type="text" tabindex='1' size='15' maxlength='10' /> <img src="themes/default/images/jscalendar.gif" alt="{$APP.LBL_ENTER_DATE}" id="ngaycaphochieu_trigger" align="absmiddle"> (dd/mm/yy)  </td>
        </tr>
        <tr>
            <td class="dataLabel"> Địa chỉ:</td>                    
            <td class="dataField"> <textarea name="address_b" id="address_b" cols="45" rows="3">{$ADDRESS_B}</textarea> </td>
            <td class="dataLabel travelguide" {if !($PARENT eq 'TravelGuides')} style="display: none;" {/if}>Ngày cấp</td>
            <td class="dataField travelguide" {if !($PARENT eq 'TravelGuides')} style="display: none;" {/if}><input type="text" name="date_issued_guide" id="date_issued_guide" value="{$DATE_ISSUED}"/></td>
            <td class="dataLabel" {if ($PARENT eq 'TravelGuides')} style="display: none;" {/if}>&nbsp;</td>
            <td class="dataField" {if ($PARENT eq 'TravelGuides')} style="display: none;" {/if}>&nbsp;</td>
        </tr>

        <tr class="hopdongdichvu"  {if !($PARENT eq 'Accounts' or $PARENT eq 'FITs' or $PARENT eq 'Restaurants' or $PARENT eq 'Hotels' or $PARENT eq 'Transports')} style="display:none" {/if}>
        <td class="dataLabel">Số tài khoản:</td>
        <td class="dataField"><input type="text" name="sotaikhoanbenb" id="sotaikhoanbenb" value="{$SOTAIKHOANBENB}"></td>
        <td class="dataLabel"> MST: </td>
        <td class="dataField"> <input name="mst_benb" id="mst_benb" size="35" type="text" value="{$MST_BENB}" /></td>
        </tr>
        <tr class="hopdongdichvu"  {if !($PARENT eq 'Accounts' or $PARENT eq 'FITs' or $PARENT eq 'Restaurants' or $PARENT eq 'Hotels' or $PARENT eq 'Transports')} style="display:none" {/if}>
        <td class="dataLabel"> Tài khoản tại ngân hàng:</td> 
        <td> <input name="bank_name_b" id="bank_name_b" type="text"  value="{$BANK_NAME_B}" size="35"/> - TP Hồ Chí Minh</td> 
        <td class="dataLabel"> Tên chủ tài khoản:</td> 
        <td><textarea name="account_name_b" id="account_name_b" cols="45" rows="3"> {$ACCOUNT_NAME_B}  </textarea> </td>
        </tr>


        <tr class="travelguide"  {if !($PARENT eq 'TravelGuides')} style="display: none;" {/if}>
        <td class="dataLabel">Ngày sinh:</td>
        <td class="dataField"><input type="text" name="birthday" id="birthday" value="{$BIRTHDAY}"/></td>
        <td class="dataLabel">Số hộ chiếu:</td>
        <td class="dataField"><input type="text" name="passport_no_guide" id="passport_no_guide" value="{$PASSPORT}"></td>
        </tr>
        <tr>


            <td class="dataLabel">Điện thoại:</td>
            <td class="dataField"><input name="phone_b" id="phone_b" size="35" type="text" value="{$PHONE_B}"/> </td>
            <td class="dataLabel">Fax:</td>
            <td class="dataField"><input type="text" name="fax_b" id="fax_b" value="{$FAXB}"></td>
        </tr>
        <tr>
            <td colspan="4" class="dataLabel"><br /> Làm đại diện bên B <br /> Sau khi bàn bạc thỏa thuận, hai bên cùng thống nhất thực hiện các điều khoản sau:  </td>
        </tr>
    </table>  
    <fieldset>
        <legend>Contract Template</legend>
        <table class="tabForm" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td class="dataField"><select name="template_ddown_c[]" id="template_ddown_c" multiple="multiple">{$TEMPLATE} </select></td>
            </tr>
        </table>
    </fieldset> 
    <!--<div class="chung tabForm">
        <h2> ĐỐI TƯỢNG CỦA HỢP ĐỒNG</h2>
        Tên Tour  <span class="required">*</span>:
        <input type="text" name="groupprogracontracts_name" id="groupprogracontracts_name" size="40" value="{$TOUR_NAME}"/>
        <input type="hidden" name="groupprogr4251rograms_ida" id="groupprogr4251rograms_ida" value="{$TOUR_ID}"/>
        <input title="{$APP.LBL_SELECT_BUTTON_TITLE}" accessKey="{$APP.LBL_SELECT_BUTTON_KEY}" type="button" tabindex='2' class="button tour_name" value='{$APP.LBL_SELECT_BUTTON_LABEL}' name="bnt_tour_name" id="bnt_tour_name"> 
        <input title="{$APP.LBL_SELECT_BUTTON_TITLE}" accessKey="{$APP.LBL_SELECT_BUTTON_KEY}" type="button" tabindex='2' class="button" value="{$APP.LBL_CLEAR_BUTTON_LABEL}" onclick="this.form.groupprogracontracts_name.value=''; this.form.groupprogr4251rograms_ida.value='';";/> 
    </div>  -->
    <table width="100%" cellpadding="0" cellspacing="0" class="tabForm" border="0">
        <tr>
            <td class="dataLabel">Tên Tour  <span class="required">*</span>:</td>
            <td class="dataField">
                <input type="text" name="groupprogracontracts_name" id="groupprogracontracts_name" size="80" value="{$TOUR_NAME}"/>
                <input type="hidden" name="groupprogr4251rograms_ida" id="groupprogr4251rograms_ida" value="{$TOUR_ID}"/>
<!--                <input title="{$APP.LBL_SELECT_BUTTON_TITLE}" accessKey="{$APP.LBL_SELECT_BUTTON_KEY}" type="button" tabindex='2' class="button tour_name" value='{$APP.LBL_SELECT_BUTTON_LABEL}' name="bnt_tour_name" id="bnt_tour_name">-->
                <button title="{$APP.LBL_SELECT_BUTTON_TITLE}" accessKey="{$APP.LBL_SELECT_BUTTON_KEY}" type="button" tabindex='2' class="button tour_name" value='{$APP.LBL_SELECT_BUTTON_LABEL}' name="bnt_tour_name" id="bnt_tour_name"><img src="themes/default/images/id-ff-select.png"></button>
<!--                <input title="{$APP.LBL_SELECT_BUTTON_TITLE}" accessKey="{$APP.LBL_SELECT_BUTTON_KEY}" type="button" tabindex='2' class="button" value="{$APP.LBL_CLEAR_BUTTON_LABEL}" onclick="this.form.groupprogracontracts_name.value=''; this.form.groupprogr4251rograms_ida.value='';";/> -->
                <button title="{$APP.LBL_SELECT_BUTTON_TITLE}" accessKey="{$APP.LBL_SELECT_BUTTON_KEY}" type="button" tabindex='2' class="button" value="{$APP.LBL_CLEAR_BUTTON_LABEL}" onclick="this.form.groupprogracontracts_name.value=''; this.form.groupprogr4251rograms_ida.value='';"><img src="themes/default/images/id-ff-clear.png"></button>
            </td>
            <td class="dataLabel">&nbsp;</td>
            <td class="dataLabel">&nbsp;</td>
        </tr>
    </table> 

    <div class="hopdongdichvu" {if !($PARENT eq 'Accounts' or $PARENT eq 'FITs' or $PARENT eq 'Restaurants' or $PARENT eq 'Hotels' or $PARENT eq 'Transports')} style="display:none"  {/if}>
    <table cellpadding="0" cellspacing="0" class="tabForm" border="0" width="100%">
        <tr>
            <!-- <td class="dataLabel"></td>
            <td class="dataField">
            <input type="text" name="groupprogracontracts_name" id="groupprogracontracts_name" size="40" value="{$TOUR_NAME}"/>
            <input type="hidden" name="groupprogr4251rograms_ida" id="groupprogr4251rograms_ida" value="{$TOUR_ID}"/>
            <input title="{$APP.LBL_SELECT_BUTTON_TITLE}" accessKey="{$APP.LBL_SELECT_BUTTON_KEY}" type="button" tabindex='2' class="button tour_name" value='{$APP.LBL_SELECT_BUTTON_LABEL}' name="bnt_tour_name" id="bnt_tour_name">  
            </td>-->
            <td class="dataLabel">Kết hợp:</td>
            <td class="dataField"><input name="associate" id="associate" size="50" type="text" value="{$KETHOP}"/></td>
        </tr>
        <tr>
            <td class="dataLabel">Từ ngày:</td>
            <td class="dataField"><!--<input name="start_date_contract" type="text"  id="start_date_contract" value="{$START_DATE}"/>-->
                <input readonly="readonly" id='start_date_contract' name='start_date_contract' onblur="parseDate(this, '{$CALENDAR_DATEFORMAT}');"  type="text" tabindex='1' size='15' maxlength='10' value="{$START_DATE}"/> <img src="themes/default/images/jscalendar.gif" alt="{$APP.LBL_ENTER_DATE}" id="date_start_trigger" align="absmiddle"> (dd/mm/yy) 
            </td>
            <td class="dataLabel">Đến ngày:</td>
            <td class="dataField"><!--<input name="end_date_contract"  id="end_date_contract" type="text" value="{$END_DATE}" />-->
                <input readonly="readonly" id='end_date_contract' name='end_date_contract' onblur="parseDate(this, '{$CALENDAR_DATEFORMAT}');"  type="text" tabindex='1' size='15' maxlength='10' value="{$END_DATE}"/> <img src="themes/default/images/jscalendar.gif" alt="{$APP.LBL_ENTER_DATE}" id="date_end_trigger" align="absmiddle"> (dd/mm/yy)
            </td>
        </tr>
        <tr>
            <td class="dataLabel">Tổng số ngày:</td>
            <td class="dataField"><input readonly="readonly" id="num_of_date" name="num_of_date" size="5" type="text" value="{$NUM_OF_DATE}"/></td>
            <td class="dataLabel">Tổng số đêm</td>
            <td class="dataField"><input readonly="readonly" id="num_of_night" name="num_of_night" type="text" size="5" value="{$NUM_OF_NIGHT}"/></td>
        </tr>
        <tr>
            <td class="dataLabel">Mục Đích chuyến đi:</td>
            <td class="dataField"><input name="purpose" type="text" id="purpose" size="70" value="{$PURPOSE}"/></td>
            <td class="dataLabel">&nbsp;</td>
            <td class="dataField">&nbsp;</td>
        </tr>
    </table>
    <table class="tabForm" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
            <td colspan="4" class="dataLabel"><h1>GIÁ TRỊ HỢP ĐỒNG</h1></td>
        </tr>
        <tr>
            <td class="dataLabel"> Giá tour trọn gói</td>
            <td class="dataField">( Áp dụng cho đoàn  <input name="sl_khach"  id="sl_khach" value="{$SL_KHACH}" type="text" size="4" /> khách trở lên) </td>
            <td class="dataLabel">&nbsp;</td>
            <td class="dataField">&nbsp;</td>
        </tr>
        <tr>
            <td colspan="4">
                <table cellpadding="0" cellspacing="0" border="1" width="100%" style="border-collapse:collapse" class="table_clone" id="giatrihopdong">
                    <thead>
                        <tr bgcolor="#CCCCCC">
                            <th align="center">&nbsp;</th>
                            <th align="center"> Số lượng</th> 
                            <th align="center"> Giá tour</th>
                            <th align="center"> Thuế</th>
                            <th align="center"> Thành tiền</th>
                            <th align="center">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {if $ID eq '' or $CONTRACT_VALUE_COUNT eq 0}
                        <tr>
                            <td align="center"> 
                                <input name="age[]" type="text" id="age" value="{$DOTUOI}" />
                            </td>
                            <td align="center">
                                <input name="tong_sl_khach[]" type="text" id="tong_sl_khach" class="tinhtoan" value="{$TONG_SL_KHACH}" />
                            </td>
                            <td align="center">
                                <input name="gia_tour[]" type="text" id="gia_tour" class="tinhtoan " value="{$GIA_TOUR}" />
                            </td>
                            <td align="center">
                                <input name="thue[]" type="text" id="thue" class="tinhtoan" value="{$THUE}" />
                            </td>
                            <td align="center">
                                <input readonly="readonly" name="thanhtien[]" type="text" id="thanhtien" class="tinhtoan thanhtien" value="{$THANHTIEN}"  />
                                <input type="hidden" name="contract_value_id[]" id="contract_value_id" value=""/> <input type="hidden" name="deleted[]" id="deleted" value="0"/>
                            </td>
                            <td align="center">
                                <input type="button" class="btnAddRow
                                    " value="Add row" />
                                <input type="button"  class="btnDelRow" value="Delete row" />
                            </td>
                        </tr>
                        <br/>
                        {/if}
                        {$CONTRACT_VALUES}
                    </tbody>
                </table>

            </td>
        </tr>
        <tr>    
            <th class="dataLabel" align="center"> Tổng cộng</th>
            <td align="center" class="dataField"> <input readonly="readonly" name="tongtien" type="text" id="tongtien" value="{$TONGTIEN}"  /> </td>
            <td class="dataLabel">&nbsp;</td>
            <td class="dataField">&nbsp;</td>
        </tr>
        <tr>
            <td colspan="4" class="dataField" align="center"> Bằng chữ: <input name="bangchu" type="text" size="90" id="bangchu" value="{$BANGCHU}" />  </td>
        </tr>
        <tr>
            <td colspan="4"> Nếu đoàn từ <input name="sl_khach_1" size="5" type="text" id="sl_khach_1" value="{$SL_KHACH_1}" /> khách , giá tour <input name="gia_tour_1" type="text" id="gia_tour_1" value="{$GIA_TOUR_1}" /> <select name="tiente" id="tiente">{$TIENTE} </select> / khách </td>
        </tr>
        <tr>
            <td colspan="4"> Khách hàng vui lòng thanh toán bằng <select name="tiente_usd" id="tiente_usd">{$TIENTE_USD} </select> hoặc <select name="tiente_vnd" id="tiente_vn"> {$TIENTE_VND} </select> theo tỷ giá của <input name="ten_nganhang" type="text" id="ten_nganhang"  size="50" value="{$TEN_NGANHANG}"/> </td>
        </tr>
        <tr>
            <td colspan="4">
                <h4> <u> Bao gồm</u></h4> 
                <textarea name="baogom" cols="100" rows="12" id="baogom">{$BAOGOM}</textarea>
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <h4> <u> Không bao gồm</u></h4> 
                <textarea name="khongbaogom" cols="100" rows="12" id="khongbaogom">{$KHONGBAOGOM}</textarea>
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <h4> <u> Ghi chú</u></h4>
                <p align="justify">
                    - Trẻ em dưới 02 tuổi <input name="trepercent" type="text" size="3" id="trepercent" value="{$TREPERCENT}" /> % giá tour + thuế các loại (ngủ chung với người lớn) <br />
                    - Trẻ em từ 02 đến dưới 12 tuổi <input name="trepercent_1" type="text" size="3" id="trepercent_1" value="{$TREPERCENT_1}" /> % giá tour + thuế các loại (ngủ chung với người lớn)<br />
                </p>
            </td>
        </tr>                        
    </table>
    <table class="tabForm" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
            <td class="dataLabel" colspan="4"><h1>ĐIỀU KHOẢN VỀ THANH TOÁN</h1></td>
        </tr>
        <tr> 
            <td class="dataLabel">Số đợt thanh toán :<input name="solanthanhtoan" type="text"  id="solanthanhtoan" value="{$SOLANTHANHTOAN}"/></td>
            <td class="dataField">&nbsp;</td>
            <td class="dataLabel">&nbsp;</td>
            <td class="dataField">&nbsp;</td>
        </tr>
        <tr>
            <td class="dataField" colspan="4">
                <fieldset>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" class="table_clone" id="dieukhoanthanhtoan">
                        <tbody>
                            {if $ID eq '' or $CONTRACT_CONDITION_LINE_COUNT eq 0}
                            <tr>
                                <td>
                                    <fieldset>
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="tabForm"> 
                                            <tr>
                                                <td>
                                                    <input name="dotthanhtoan[]" id="dotthanhtoan" type="text" value="{$DOTTHANHTOAN}"/><input name="event[]" type="text" id="event" value="{$SUKIEN}"/> Bên B thanh toán cho bên A <input name="phantram[]" id="phantram" class="percent" type="text" value="{$PHANTRAM}"/> % số tiền là  <input name="tienthanhtoan[]" type="text"  id="tienthanhtoan" value="{$TIENTHANHTOAN}"/> <select name="tiente_thanhtoan[]" class="tientethanhtoan" id="tiente_thanhtoan"> <option value="vnd">VND</option> <option value="usd">USD </option> </select> <br />
                                                    <input type="hidden" name="contract_condition_id[]" id="contract_condition_id" value=""/>  <input type="hidden" name="deleted[]" id="deleted" value="0"/>
                                                    Bằng chữ: <input name="in_word[]" type="text" id="in_word" value="{$BANGCHU1}"  size="90"/>
                                                </td>
                                            </tr>
                                        </table>
                                    </fieldset>
                                </td>
                                <td>
                                    <input  type="button" class="btnAddRow" value="Add row" />
                                    <input  type="button" class="btnDelRow" value="Delete" />
                                </td>
                            </tr>
                            {/if}
                            {$CONTRACT_CONDITIONS}
                        </tbody>
                    </table>
                </fieldset>
            </td>
        </tr>
        <tr>
            <td colspan="4">&nbsp;</td>
        </tr>
        <tr>
            <td class="dataLabel" width="20%">Tên sân bay</td>
            <td class="dataField" width="30%"><input name="tensanbay" id="tensanbay" value="{$TENSANBAY}" type="text"  size="35"/></td>
            <td class="dataLabel">&nbsp;</td>
            <td class="dataField">&nbsp;</td>
        </tr>
    </table> 
    </div>

    <div class="travelguide"{if !($PARENT eq 'TravelGuides')} style="display: none;" {/if}>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" class="tabForm">
        <tr>
            <td class="dataLabel">Từ ngày</td>
            <td class="dataField"><input id='start_date_guide' name='start_date_guide' onblur="parseDate(this, '{$CALENDAR_DATEFORMAT}');"  type="text" tabindex='1' size='15' maxlength='10' value="{$START_DATE}"/> <img src="themes/default/images/jscalendar.gif" alt="{$APP.LBL_ENTER_DATE}" id="guide_date_start_trigger" align="absmiddle"> (dd/mm/yy) </td>
            <td class="dataLabel">Đến ngày</td>
            <td class="dataField"><input id='end_date_guide' name='end_date_guide' onblur="parseDate(this, '{$CALENDAR_DATEFORMAT}');"  type="text" tabindex='1' size='15' maxlength='10' value="{$END_DATE}"/> <img src="themes/default/images/jscalendar.gif" alt="{$APP.LBL_ENTER_DATE}" id="guide_date_end_trigger" align="absmiddle"> (dd/mm/yy)</td>
        </tr>
        <tr>
            <td class="dataLabel">Hành trình</td>
            <td class="dataField"><input type="text" name="journey" id="journey" size="70" value="{$JOURNEY}"/></td>
            <td class="dataLabel">&nbsp;</td>
            <td class="dataField">&nbsp;</td>
        </tr>
        <tr>
            <td class="dataLabel" colspan="2">Quyền lợi : Bên B được hưởng khoản công tác phí:</td>
            <td class="dataField" colspan="2"><input type="text" name="guide_bonus" class="giatrihopdonghdv" id="guide_bonus" value="{$BONUS}"/> <select name="guide_currency" id="guide_currency">{$GUIDE_CURRENCY}</select> X  <input type="text" name="guide_num_of_date" id="guide_num_of_date" class="giatrihopdonghdv" value="{$GUIDE_NUM_OF_DATE}"/> ngày = <input type="text" name="total_bonus" id="total_bonus" class="giatrihopdonghdv" value="{$TOTAL_BONUS}"/> <label class="currency">{$CURRENCY}</label></td>
        </tr>
        <tr>
            <td align="center" colspan="4"><input type="text" name="guide_inword" id="guide_inword" style="text-align: center;" size="120" value="{$GUIDE_INWORD}" readonly="readonly"/></td>
        </tr>
        <tr>
            <td class="dataLabel">Ngày hết hạn hợp đồng</td>
            <td class="dataField"><input id='expiration_date' name='expiration_date' onblur="parseDate(this, '{$CALENDAR_DATEFORMAT}');"  type="text" tabindex='1' size='15' maxlength='10' value="{$EXPIRATION_DATE}"/> <img src="themes/default/images/jscalendar.gif" alt="{$APP.LBL_ENTER_DATE}" id="expiration_date_trigger" align="absmiddle"> (dd/mm/yy) </td>
        </tr>
    </table>
    </div>
    <div id="dieukhoanhuyphat">
        <h1>{$MOD.LBL_DIEUKIENHUYPHAT}</h1>
        <table class="tabForm" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td class="dataLabel">{$MOD.LBL_TIENHUYPHAT}</td>
                <td class="dataField"><input type="text" id="tienhuyphat" name="tienhuyphat" value="{$TIENHUYPHAT}"><select name="tientehuyphat" id="tientehuyphat">{$TIENTEHUYPHAT}</select></td>
                <td class="dataLabel">&nbsp;</td>
                <td class="dataLabel">&nbsp;</td>
            </tr>
        </table>
    </div>
    <table cellpadding="0" cellspacing="0" class="tabForm" width="100%" border="0">
        <tr>
            <td class="dataLabel" width="20%">
                {$MOD.LBL_ASSIGNED_TO_NAME} :
            </td>
            <td class="dataField" width="30%">
                <input class="sqsEnabled" tabindex="2" autocomplete="off" size="50" id="assigned_user_name" name="assigned_user_name"  title='{$APP.LBL_ASSIGNED_TO}' type="text" value="{$ASSIGNED_USER_NAME}"><input id='assigned_user_id' name='assigned_user_id' type="hidden" value="{$ASSIGNED_USER_ID}" />
                <input title="{$APP.LBL_SELECT_BUTTON_TITLE}" accessKey="{$APP.LBL_SELECT_BUTTON_KEY}" type="button" tabindex='2' class="button" value='{$APP.LBL_SELECT_BUTTON_LABEL}' name=btn1
                    onclick='open_popup("Users", 600, 400, "", true, false, {$encoded_users_popup_request_data});' />
            </td>
            <td class="dataLabel">&nbsp;</td>
            <td class="dataField">&nbsp;</td>
        </tr>
    </table>
    <div class="container"> 
        <input title="{$APP.LBL_SAVE_BUTTON_TITLE}"  accessKey="{$APP.LBL_SAVE_BUTTON_KEY}"   class="button" 
            onclick="this.form.action.value='Save';return check_form('EditView');" 
            type="submit" name="button" value="  {$APP.LBL_SAVE_BUTTON_LABEL}  " > 
        <input title="{$APP.LBL_CANCEL_BUTTON_TITLE}" accessKey="{$APP.LBL_CANCEL_BUTTON_KEY}" class="button" 
            onclick="this.form.action.value='{$RETURN_ACTION}'; this.form.module.value='{$RETURN_MODULE}'; this.form.record.value='{$RETURN_ID}'" 
            type="submit" name="button" value="  {$APP.LBL_CANCEL_BUTTON_LABEL}">
        {if $ID neq ''}
        <input title="View Change Log" class="button" onclick='open_popup("Audit", "600", "400", "&record={$ID}&module_name=Contracts", true, false, {$view_change_log} ); return false;' type="submit" value="View Change Log">
        {/if}
    </div>
</form>
