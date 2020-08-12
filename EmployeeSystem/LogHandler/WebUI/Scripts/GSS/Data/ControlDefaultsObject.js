/// <reference path="../jQuery/jquery-1.9.1-vsdoc.js" />

//功能: Control 預設值
//描述: 預設各Control的options
//歷程: 1. 2014/06/23   1.00   Steven_Chen   Create

var ControlDefaultsObject = function () {
    var TextBox = {}, AutoComplete = {}, IntervalTextBox = {},
        NumericTextBox = {}, MaskedTextBox = {}, PhoneTextBox = {}, Window = {},
        DatePicker = {}, YearPicker = {}, MonthYearPicker = {}, TimePicker = {},
        IntervalDatePicker = {}, IntervalYearPicker = {}, IntervalMonthYearPicker = {}, IntervalTimePicker = {},
        TextBoxPopUp = {}, PairTextBoxPopUp = {}, CurrencyTextBox = {}, CityDistrictZIP = {},
        LandSiteText = {}, Banner = {}, IdTextBox = {}, Menu = {}, ValidateButton = {}, AddressBoxSimple = {},
        TextAreaBox = {}, AddressBoxFull = {}, RadioDropDownList = {}, CheckBoxList = {}, RadioButtonList = {},
        DropDownList = {}, DualDropDownList = {}, TripleDropDownList = {}, ComboBox = {}, DualComboBox = {},
        TripleComboBox = {}, ListBox = {}, MultiSelect = {}, DualListBox = {}, TextAreaComboBox = {},
        Tooltip = {}, PanelBar = {}, PanelBarForFuncMenu = {}, Breadcrumb = {}, GoBack = {}, GoTop = {}, TabStrip = {},
        DateTimePicker = {}, QuickBookmark = {}, FileUpload = {};

    //IE8時,defineProperties無法正常運作,故改回最原始的object設定方式

    //AutoComplete
    AutoComplete.suffix = null;
    AutoComplete.is_escape_confirm = false;
    AutoComplete.is_change = false;

    //IntervalTextBox
    IntervalTextBox.mode = "None";
    IntervalTextBox.suffix = null;
    IntervalTextBox.placeholder = null;
    IntervalTextBox.interval_symbol = "~";
    IntervalTextBox.required_mode = "N";
    IntervalTextBox.readonly_mode = "N";
    IntervalTextBox.unit = null;
    IntervalTextBox.format = null;
    IntervalTextBox.decimals = null;
    IntervalTextBox.minus_format = "Minus";
    IntervalTextBox.carry_method = "Round";
    IntervalTextBox.special_character = true;
    IntervalTextBox.allow_special_character = "";
    IntervalTextBox.case_format = "None";
    IntervalTextBox.half_full_width = "None";
    IntervalTextBox.is_escape_confirm = false;
    IntervalTextBox.is_change = false;

    //MaskedTextBox
    MaskedTextBox.format_type = null;
    MaskedTextBox.suffix = null;
    MaskedTextBox.mask = null;
    MaskedTextBox.is_escape_confirm = false;
    MaskedTextBox.is_change = false;

    //NumericTextBox
    NumericTextBox.mode = "Currency";
    NumericTextBox.suffix = null;
    NumericTextBox.unit = null;
    NumericTextBox.format = null;
    NumericTextBox.decimals = null;
    NumericTextBox.minus_format = "Minus";
    NumericTextBox.carry_method = "Round";
    NumericTextBox.is_escape_confirm = false;
    NumericTextBox.is_change = false;

    //PhoneTextBox
    PhoneTextBox.suffix = null;
    PhoneTextBox.is_extension_show = false;
    PhoneTextBox.is_extension_included = false;
    PhoneTextBox.area_length = 3;
    PhoneTextBox.number_length = 8;
    PhoneTextBox.extension_length = 5;
    PhoneTextBox.is_escape_confirm = false;
    PhoneTextBox.is_change = false;

    //TextBox
    TextBox.mode = "None";
    TextBox.suffix = null;
    TextBox.placeholder = null;
    TextBox.special_character = true;
    TextBox.allow_special_character = "";
    TextBox.case_format = "None";
    TextBox.half_full_width = "None";
    TextBox.SpecialCharacterList = "@#$^,";
    TextBox.is_escapte_confirm = false;
    TextBox.is_change = false;

    //Window
    Window.title = "徵授信管理系統";
    Window.width = "600px";
    Window.actions = ["Minimize", "Maximize", "Close"];
    Window.modal = true;
    Window.position = { top: $(window).height() * 0.15, left: $(window).width() * 0.3 };
    Window.iframe = false;

    //DatePicker
    DatePicker.is_tw_year = false;
    DatePicker.date_delimiter = "/";
    DatePicker.allow_shortcut = false;
    DatePicker.shortcut_data_source = [];
    DatePicker.format = "yyyy/MM/dd";
    DatePicker.suffix = "";
    DatePicker.min = new Date(1900, 0, 1);
    DatePicker.max = new Date(2099, 11, 31);
    DatePicker.is_escape_confirm = false;
    DatePicker.is_change = false;

    //DateTimePicker
    DateTimePicker.is_tw_year = false;
    DateTimePicker.date_delimiter = "/";
    DateTimePicker.allow_shortcut = false;
    DateTimePicker.shortcut_data_source = [];
    DateTimePicker.format = "yyyy/MM/dd h:mm tt";
    DateTimePicker.timeFormat = "h:mm tt";
    DateTimePicker.suffix = "";
    DateTimePicker.min = new Date(1900, 0, 1);
    DateTimePicker.max = new Date(2099, 11, 31);
    DateTimePicker.is_escape_confirm = false;
    DateTimePicker.is_change = false;

    //YearPicker
    YearPicker.is_tw_year = false;
    YearPicker.allow_shortcut = false;
    YearPicker.shortcut_data_source = [];
    YearPicker.suffix = "";
    YearPicker.is_escape_confirm = false;
    YearPicker.is_change = false;

    //MonthYearPicker
    MonthYearPicker.is_tw_year = false;
    MonthYearPicker.date_delimiter = "/";
    MonthYearPicker.allow_shortcut = false;
    MonthYearPicker.shortcut_data_source = [];
    MonthYearPicker.format = "yyyy/MM";
    MonthYearPicker.suffix = "";
    MonthYearPicker.min = new Date(1900, 0, 1);
    MonthYearPicker.max = new Date(2099, 11, 31);
    MonthYearPicker.is_escape_confirm = false;
    MonthYearPicker.is_change = false;

    //TimePicker
    TimePicker.is_twelve_hour = false;
    TimePicker.allow_shortcut = false;
    TimePicker.shortcut_data_source = [];
    TimePicker.interval = 60;
    TimePicker.suffix = "";
    TimePicker.is_escape_confirm = false;
    TimePicker.is_change = false;

    //IntervalDatePicker
    IntervalDatePicker.is_tw_year = false;
    IntervalDatePicker.date_delimiter = "-";
    IntervalDatePicker.allow_shortcut = false;
    IntervalDatePicker.shortcut_data_source = [];
    IntervalDatePicker.format = "yyyy-MM-dd";
    IntervalDatePicker.suffix = "";
    IntervalDatePicker.required_mode = "N";
    IntervalDatePicker.readonly_mode = "N";
    IntervalDatePicker.min = new Date(1900, 0, 1);
    IntervalDatePicker.max = new Date(2099, 11, 31);
    IntervalDatePicker.is_escape_confirm = false;
    IntervalDatePicker.is_change = false;

    //IntervalYearPicker
    IntervalYearPicker.is_tw_year = false;
    IntervalYearPicker.allow_shortcut = false;
    IntervalYearPicker.shortcut_data_source = [];
    IntervalYearPicker.suffix = "";
    IntervalYearPicker.required_mode = "N";
    IntervalYearPicker.readonly_mode = "N";
    IntervalYearPicker.is_escape_confirm = false;
    IntervalYearPicker.is_change = false;

    //IntervalMonthYearPicker
    IntervalMonthYearPicker.is_tw_year = false;
    IntervalMonthYearPicker.date_delimiter = "/";
    IntervalMonthYearPicker.allow_shortcut = false;
    IntervalMonthYearPicker.shortcut_data_source = [];
    IntervalMonthYearPicker.format = "yyyy/MM";
    IntervalMonthYearPicker.suffix = "";
    IntervalMonthYearPicker.required_mode = "N";
    IntervalMonthYearPicker.readonly_mode = "N";
    IntervalMonthYearPicker.min = new Date(1900, 0, 1);
    IntervalMonthYearPicker.max = new Date(2099, 11, 31);
    IntervalMonthYearPicker.is_escape_confirm = false;
    IntervalMonthYearPicker.is_change = false;

    //IntervalTimePicker
    IntervalTimePicker.is_twelve_hour = false;
    IntervalTimePicker.allow_shortcut = false;
    IntervalTimePicker.shortcut_data_source = [];
    IntervalTimePicker.interval = 60;
    IntervalTimePicker.suffix = "";
    IntervalTimePicker.required_mode = "N";
    IntervalTimePicker.readonly_mode = "N";
    IntervalTimePicker.is_escape_confirm = false;
    IntervalTimePicker.is_change = false;

    //TextBoxPopUp
    TextBoxPopUp.suffix = null;
    TextBoxPopUp.mode = "None";
    TextBoxPopUp.placeholder = null;
    TextBoxPopUp.required_mode = "N";
    TextBoxPopUp.special_character = true;
    TextBoxPopUp.allow_special_character = "";
    TextBoxPopUp.case_format = "None";
    TextBoxPopUp.half_full_width = "None";
    TextBoxPopUp.title = "New Window";
    TextBoxPopUp.width = "600px";
    TextBoxPopUp.actions = ["Minimize", "Maximize", "Close"];
    TextBoxPopUp.modal = true;
    TextBoxPopUp.position = { top: 100, left: 250 };
    TextBoxPopUp.iframe = false;
    TextBoxPopUp.is_window_enabled = true;
    TextBoxPopUp.text_mode = "replace";
    TextBoxPopUp.window_url = null;
    TextBoxPopUp.text_field = "text";
    TextBoxPopUp.value_field = "value";
    TextBoxPopUp.is_escape_confirm = false;
    TextBoxPopUp.is_change = false;

    //PairTextBoxPopUp
    PairTextBoxPopUp.first_suffix = null;
    PairTextBoxPopUp.second_suffix = null;
    PairTextBoxPopUp.first_mode = "None";
    PairTextBoxPopUp.second_mode = "None";
    PairTextBoxPopUp.placeholder = null;
    PairTextBoxPopUp.special_character = true;
    PairTextBoxPopUp.allow_special_character = "";
    PairTextBoxPopUp.case_format = "None";
    PairTextBoxPopUp.half_full_width = "None";
    PairTextBoxPopUp.required_mode = "N";
    PairTextBoxPopUp.readonly_mode = "N";
    PairTextBoxPopUp.title = "New Window";
    PairTextBoxPopUp.width = "600px";
    PairTextBoxPopUp.actions = ["Minimize", "Maximize", "Close"];
    PairTextBoxPopUp.modal = true;
    PairTextBoxPopUp.position = { top: 100, left: 250 };
    PairTextBoxPopUp.iframe = false;
    PairTextBoxPopUp.window_url = null;
    PairTextBoxPopUp.is_window_enabled = true;
    PairTextBoxPopUp.is_query_data = false;
    PairTextBoxPopUp.is_escape_confirm = false;
    PairTextBoxPopUp.is_change = false;

    //CurrencyTextBox
    CurrencyTextBox.required_mode = "N";
    CurrencyTextBox.readonly_mode = "N";
    CurrencyTextBox.text_field = "text";
    CurrencyTextBox.value_field = "value";
    CurrencyTextBox.mode = "Currency";
    CurrencyTextBox.suffix = null;
    CurrencyTextBox.placeholder = null;
    CurrencyTextBox.unit = null;
    CurrencyTextBox.format = null;
    CurrencyTextBox.decimals = null;
    CurrencyTextBox.minus_format = "Minus";
    CurrencyTextBox.carry_method = "Round";
    CurrencyTextBox.is_escape_confirm = false;
    CurrencyTextBox.is_change = false;

    //CityDistrictZIP
    CityDistrictZIP.required_mode = "N";
    CityDistrictZIP.first_text_field = "citytext";
    CityDistrictZIP.first_value_field = "cityvalue";
    CityDistrictZIP.first_field_suffix = "縣市";
    CityDistrictZIP.second_text_field = "districttext";
    CityDistrictZIP.second_value_field = "districtvalue";
    CityDistrictZIP.second_field_suffix = "鄉鎮市區";
    CityDistrictZIP.cascade_from_field = null;
    CityDistrictZIP.mode = "Digit";
    CityDistrictZIP.third_suffix = null;
    CityDistrictZIP.placeholder = null;
    CityDistrictZIP.special_character = true;
    CityDistrictZIP.allow_special_character = "";
    CityDistrictZIP.case_format = "None";
    CityDistrictZIP.half_full_width = "None";
    CityDistrictZIP.is_escape_confirm = false;
    CityDistrictZIP.is_change = false;
    CityDistrictZIP.readonly_mode = "N";

    //LandSiteText
    LandSiteText.required_mode = "N";
    LandSiteText.readonly_mode = "N";
    LandSiteText.first_text_field = "citytext";
    LandSiteText.first_value_field = "cityvalue";
    LandSiteText.first_field_suffix = "縣市";
    LandSiteText.second_text_field = "districttext";
    LandSiteText.second_value_field = "districtvalue";
    LandSiteText.second_field_suffix = "鄉鎮市區 郵遞區號";
    LandSiteText.third_text_field = "landnotext";
    LandSiteText.third_value_field = "landnovalue";
    LandSiteText.third_cascadefrom_field = null;
    LandSiteText.third_field_suffix = null;
    LandSiteText.fourth_suffix = "段";
    LandSiteText.fourth_mode = "Chinese";
    LandSiteText.fourth_placeholder = null;
    LandSiteText.fourth_special_character = true;
    LandSiteText.fourth_allow_special_character = "";
    LandSiteText.fourth_case_format = "None";
    LandSiteText.fourth_half_full_width = "None";
    LandSiteText.fifth_suffix = "小段";
    LandSiteText.fifth_mode = "Chinese";
    LandSiteText.fifth_placeholder = null;
    LandSiteText.fifth_special_character = true;
    LandSiteText.fifth_allow_special_character = "";
    LandSiteText.fifth_case_format = "None";
    LandSiteText.sixth_suffix = "地號";
    LandSiteText.sixth_format_type = "LandNo";
    LandSiteText.is_escape_confirm = false;
    LandSiteText.is_change = false;

    //Banner
    Banner.ap_name = "徵授信管理系統";
    Banner.ap_name_url = "";
    Banner.user_name_icon = "icon-user icon-white";
    Banner.user_name_text = "019405NM";
    Banner.ap_date_icon = "icon-time icon-white";
    Banner.ap_date_text = null;
    Banner.ap_language_url = "";
    Banner.ap_home_url = "";
    Banner.ap_log_out = "";

    //IdTextBox
    IdTextBox.text_field = "text";
    IdTextBox.value_field = "value";
    IdTextBox.first_suffix = null;
    IdTextBox.second_suffix = null;
    IdTextBox.first_mode = "AlphaNumeric";
    IdTextBox.second_mode = "None";
    IdTextBox.placeholder = null;
    IdTextBox.special_character = true;
    IdTextBox.allow_special_character = "";
    IdTextBox.case_format = "None";
    IdTextBox.half_full_width = "None";
    IdTextBox.is_window_enabled = true;
    IdTextBox.required_mode = "N";
    IdTextBox.readonly_mode = "N";
    IdTextBox.is_dropdownlist_enabled = true;
    IdTextBox.is_id_check_enabled = true;
    IdTextBox.allow_cust_kind = "";
    IdTextBox.is_query_data = true;
    IdTextBox.is_escape_confirm = false;
    IdTextBox.is_change = false;
    IdTextBox.window_url = null;

    //AddressBoxSimple
    AddressBoxSimple.required_mode = "N";
    AddressBoxSimple.readonly_mode = "N";
    AddressBoxSimple.first_text_field = "citytext";
    AddressBoxSimple.first_value_field = "cityvalue";
    AddressBoxSimple.first_field_suffix = "縣市";
    AddressBoxSimple.second_text_field = "areatext";
    AddressBoxSimple.second_value_field = "areavalue";
    AddressBoxSimple.second_field_suffix = "鄉鎮市區 郵遞區號";
    AddressBoxSimple.second_cascadefrom_field = null;
    AddressBoxSimple.third_text_field = "ziptext";
    AddressBoxSimple.third_value_field = "zipvalue";
    AddressBoxSimple.third_cascadefrom_field = null;
    AddressBoxSimple.fourth_suffix = null;
    AddressBoxSimple.fourth_placeholder = null;
    AddressBoxSimple.fourth_mode = "None";
    AddressBoxSimple.is_escape_confirm = false;
    AddressBoxSimple.is_change = false;


    //TextAreaBox
    TextAreaBox.suffix = null;
    TextAreaBox.mode = "None";
    TextAreaBox.placeholder = null;
    TextAreaBox.required_mode = "N";
    TextAreaBox.special_character = true;
    TextAreaBox.allow_special_character = "";
    TextAreaBox.case_format = "None";
    TextAreaBox.half_full_width = "None";
    TextAreaBox.title = "New Window";
    TextAreaBox.actions = ["Minimize", "Maximize", "Close"];
    TextAreaBox.modal = true;
    TextAreaBox.position = { top: 100, left: 250 };
    TextAreaBox.iframe = false;
    TextAreaBox.allow_window = true;
    TextAreaBox.allow_window_text_only = true;
    TextAreaBox.text_mode = "replace";
    TextAreaBox.window_url = null;
    TextAreaBox.text_field = "text";
    TextAreaBox.value_field = "value";
    TextAreaBox.cols = "5";
    TextAreaBox.textarea_width = "200";
    TextAreaBox.width = "600px";
    TextAreaBox.allow_short_cut = false;
    TextAreaBox.is_escape_confirm = false;
    TextAreaBox.is_change = false;

    //AddressBoxFull
    AddressBoxFull.required_mode = "N";
    AddressBoxFull.readonly_mode = "N";
    AddressBoxFull.first_text_field = "citytext";
    AddressBoxFull.first_value_field = "cityvalue";
    AddressBoxFull.first_field_suffix = "縣(市)";
    AddressBoxFull.second_text_field = "areatext";
    AddressBoxFull.second_value_field = "areavalue";
    AddressBoxFull.second_field_suffix = "區(鄉鎮市)";
    AddressBoxFull.second_cascadefrom_field = null;
    AddressBoxFull.third_text_field = "ziptext";
    AddressBoxFull.third_value_field = "zipvalue";
    AddressBoxFull.third_field_suffix = "郵遞區號";
    AddressBoxFull.third_cascadefrom_field = null;
    AddressBoxFull.road_suffix = "(路街)";
    AddressBoxFull.road_mode = "Chinese";
    AddressBoxFull.road_placeholder = null;
    AddressBoxFull.road_special_character = false;
    AddressBoxFull.road_half_full_width = "Full";
    AddressBoxFull.section_suffix = "段";
    AddressBoxFull.section_mode = "Chinese";
    AddressBoxFull.section_placeholder = null;
    AddressBoxFull.section_special_character = false;
    AddressBoxFull.section_half_full_width = "Full";
    AddressBoxFull.alley_suffix = "巷";
    AddressBoxFull.alley_mode = "None";
    AddressBoxFull.alley_placeholder = null;
    AddressBoxFull.alley_special_character = false;
    AddressBoxFull.alley_half_full_width = "Full";
    AddressBoxFull.lane_suffix = "弄";
    AddressBoxFull.lane_mode = "None";
    AddressBoxFull.lane_placeholder = null;
    AddressBoxFull.lane_half_full_width = "Full";
    AddressBoxFull.no_suffix = "之";
    AddressBoxFull.no_mode = "Digit";
    AddressBoxFull.no_placeholder = null;
    AddressBoxFull.no_special_character = false;
    AddressBoxFull.no_half_full_width = "Full";
    AddressBoxFull.noof_suffix = "號之";
    AddressBoxFull.noof_mode = "Digit";
    AddressBoxFull.noof_placeholder = null;
    AddressBoxFull.noof_half_full_width = "Full";
    AddressBoxFull.ofno_suffix = null;
    AddressBoxFull.ofno_mode = "Digit";
    AddressBoxFull.ofno_placeholder = null;
    AddressBoxFull.ofno_special_character = false;
    AddressBoxFull.ofno_half_full_width = "Full";
    AddressBoxFull.floor_suffix = "樓之";
    AddressBoxFull.floor_mode = "Digit";
    AddressBoxFull.floor_placeholder = null;
    AddressBoxFull.floor_special_character = false;
    AddressBoxFull.floor_half_full_width = "Full";
    AddressBoxFull.floorof_suffix = null;
    AddressBoxFull.floorof_mode = "Digit";
    AddressBoxFull.floorof_placeholder = null;
    AddressBoxFull.floorof_special_character = false;
    AddressBoxFull.floorof_half_full_width = "Full";
    AddressBoxFull.other_suffix = null;
    AddressBoxFull.other_mode = "None";
    AddressBoxFull.other_placeholder = null;
    AddressBoxFull.other_special_character = false;
    AddressBoxFull.other_half_full_width = "Full";
    AddressBoxFull.is_escape_confirm = false;
    AddressBoxFull.is_change = false;

    //RadioDropDownList
    RadioDropDownList.required_mode = "N";
    RadioDropDownList.readonly_mode = "N";
    RadioDropDownList.rbl_text_field = "banktypetext";
    RadioDropDownList.rbl_value_field = "banktypevalue";
    RadioDropDownList.ddl_text_field = "banktext";
    RadioDropDownList.ddl_value_field = "bankvalue";
    RadioDropDownList.ddl_field_suffix = null;
    RadioDropDownList.is_escape_confirm = false;
    RadioDropDownList.is_change = false;

    //Menu
    Menu.orientation = "vertical";
    Menu.openOnClick = false;
    Menu.sub_page_location = "Center";
    Menu.fixed_top = false;
    Menu.is_opacity = false;
    Menu.is_scroller = true;
    Menu.scroller_type = "click-50";
    Menu.scroller_theme = "buttons-out";

    //ValidateButton
    ValidateButton.auto_flag = true;
    ValidateButton.auto_minimize_time = 20000;
    ValidateButton.dialog_width = 300;
    ValidateButton.dialog_height = 150;
    ValidateButton.validation_group = "";
    ValidateButton.at_least_one = false;

    //CheckBoxList
    CheckBoxList.check_all = "false";
    CheckBoxList.check_all_position = "L";
    CheckBoxList.filter = "";
    CheckBoxList.allow_inactive_item = "false";
    CheckBoxList.align = "H";
    CheckBoxList.check_all_newline = "false";
    CheckBoxList.check_all_confirm = "true";
    CheckBoxList.select_all_shortcut_key = "A";
    CheckBoxList.clear_all_shortcut_key = "X";
    CheckBoxList.text_field = "datatext";
    CheckBoxList.value_field = "datavalue";
    CheckBoxList.multiple_choice = "true";
    CheckBoxList.other_textbox = "false";
    CheckBoxList.is_escape_confirm = false;
    CheckBoxList.is_change = false;

    //RadioButtonList
    RadioButtonList.clear_all = "false";
    RadioButtonList.clear_all_position = "l";
    RadioButtonList.filter = "";
    RadioButtonList.align = "H";
    RadioButtonList.clear_all_newline = "false";
    RadioButtonList.allow_inactive_item = "false";
    RadioButtonList.clear_all_shortcut_key = "X";
    RadioButtonList.clear_all_confirm = "true";
    RadioButtonList.text_field = "datatext";
    RadioButtonList.value_field = "datavalue";
    RadioButtonList.multiple_choice = "false";
    RadioButtonList.other_textbox = "false";
    RadioButtonList.is_escape_confirm = false;
    RadioButtonList.is_change = false;

    //DropDownList
    DropDownList.text_field = "text";
    DropDownList.value_field = "value";
    DropDownList.allow_shortcut = false;
    DropDownList.suffix = null;
    DropDownList.active_filter = null;
    DropDownList.optionLabel = "請選擇";
    DropDownList.allow_inactive_item = false;
    DropDownList.is_webservice = false;
    DropDownList.is_escape_confirm = false;
    DropDownList.is_change = false;

    //DualDropDownList
    DualDropDownList.first_text_field = "firsttext";
    DualDropDownList.first_value_field = "firstvalue";
    DualDropDownList.first_field_suffix = null;
    DualDropDownList.last_text_field = "lasttext";
    DualDropDownList.last_value_field = "lastvalue";
    DualDropDownList.last_field_suffix = null;
    DualDropDownList.cascade_from_field = null;
    DualDropDownList.active_filter = null;
    DualDropDownList.align = "h";
    DualDropDownList.allow_inactive_item = false;
    DualDropDownList.webserviceurl = null;
    DualDropDownList.is_last_field_writable = true;
    DualDropDownList.is_escape_confirm = false;
    DualDropDownList.is_change = false;

    //TripleDropDownList
    TripleDropDownList.first_text_field = "firsttext";
    TripleDropDownList.first_value_field = "firstvalue";
    TripleDropDownList.first_field_suffix = null;
    TripleDropDownList.middle_text_field = "middletext";
    TripleDropDownList.middle_value_field = "middlevalue";
    TripleDropDownList.middle_cascadefrom_field = null;
    TripleDropDownList.middle_webserviceurl = null;
    TripleDropDownList.middle_field_suffix = null;
    TripleDropDownList.last_text_field = "lasttext";
    TripleDropDownList.last_value_field = "lastvalue";
    TripleDropDownList.last_cascadefrom_field = null;
    TripleDropDownList.last_webserviceurl = null;
    TripleDropDownList.last_field_suffix = null;
    TripleDropDownList.active_filter = null;
    TripleDropDownList.align = "h";
    TripleDropDownList.allow_inactive_item = false;
    TripleDropDownList.is_middle_field_writable = true;
    TripleDropDownList.is_last_field_writable = true;
    TripleDropDownList.is_escape_confirm = false;
    TripleDropDownList.is_change = false;

    //ComboBox
    ComboBox.text_field = "text";
    ComboBox.value_field = "value";
    ComboBox.allow_shortcut = false;
    ComboBox.suffix = null;
    ComboBox.placeholder = "請選擇";
    ComboBox.active_filter = null;
    ComboBox.filter = "contains";
    ComboBox.allow_inactive_item = false;
    ComboBox.is_webservice = false;
    ComboBox.is_escape_confirm = false;
    ComboBox.is_change = false;

    //DualComboBox
    DualComboBox.first_text_field = "firsttext";
    DualComboBox.first_value_field = "firstvalue";
    DualComboBox.first_field_suffix = null;
    DualComboBox.last_text_field = "lasttext";
    DualComboBox.last_value_field = "lastvalue";
    DualComboBox.last_field_suffix = null;
    DualComboBox.cascadefrom_field = null;
    DualComboBox.active_filter = null;
    DualComboBox.filter = "contains";
    DualComboBox.align = "h";
    DualComboBox.allow_inactive_item = false;
    DualComboBox.webserviceurl = null;
    DualComboBox.is_last_field_writable = true;
    DualComboBox.is_escape_confirm = false;
    DualComboBox.is_change = false;

    //TripleComboBox
    TripleComboBox.first_text_field = "firsttext";
    TripleComboBox.first_value_field = "firstvalue";
    TripleComboBox.first_field_suffix = null;
    TripleComboBox.middle_text_field = "middletext";
    TripleComboBox.middle_value_field = "middlevalue";
    TripleComboBox.middle_cascadefrom_field = null;
    TripleComboBox.middle_webserviceurl = null;
    TripleComboBox.middle_field_suffix = null;
    TripleComboBox.last_text_field = "lasttext";
    TripleComboBox.last_value_field = "lastvalue";
    TripleComboBox.last_cascadefrom_field = null;
    TripleComboBox.last_webserviceurl = null;
    TripleComboBox.last_field_suffix = null;
    TripleComboBox.active_filter = null;
    TripleComboBox.filter = "contains";
    TripleComboBox.align = "h";
    TripleComboBox.allow_inactive_item = false;
    TripleComboBox.is_middle_field_writable = true;
    TripleComboBox.is_last_field_writable = true;
    TripleComboBox.is_escape_confirm = false;
    TripleComboBox.is_change = false;

    //ListBox
    ListBox.suffix = null;
    ListBox.filter = "";
    ListBox.allow_inactive_item = "false";
    ListBox.text_field = "datatext";
    ListBox.value_field = "datavalue";
    ListBox.is_multi_selection = "true";
    ListBox.select_height = "auto";
    ListBox.is_btn_enable = true;

    //MultiSelect
    MultiSelect.text_field = "text";
    MultiSelect.value_field = "value";
    MultiSelect.allow_shortcut = false;
    MultiSelect.suffix = null;
    MultiSelect.active_filter = null;
    MultiSelect.filter = "contains";
    MultiSelect.optionLabel = "請選擇";
    MultiSelect.allow_inactive_item = false;
    MultiSelect.is_escape_confirm = false;
    MultiSelect.is_change = false;

    //DualListBox
    DualListBox.first_text_field = "firsttext";
    DualListBox.first_value_field = "firstvalue";
    DualListBox.first_field_suffix = null;
    DualListBox.last_text_field = "lasttext";
    DualListBox.last_value_field = "lastvalue";
    DualListBox.last_field_suffix = null;
    DualListBox.allow_inactive_item = false;
    DualListBox.filter = "";
    DualListBox.is_multi_selection = true;
    DualListBox.select_height = "auto";
    DualListBox.transfer_mode = "move";
    DualListBox.is_reorder = true;
    DualListBox.is_escape_confirm = false;
    DualListBox.is_change = false;

    //TextAreaComboBox
    TextAreaComboBox.text_field = "text";
    TextAreaComboBox.value_field = "value";
    TextAreaComboBox.allow_short_cut = false;
    TextAreaComboBox.suffix = null;
    TextAreaComboBox.combobox_placeholder = "請選擇";
    TextAreaComboBox.active_filter = null;
    TextAreaComboBox.filter = "contains";
    TextAreaComboBox.allow_inactive_item = false;
    TextAreaComboBox.is_webservice = false;
    TextAreaComboBox.mode = "None";
    TextAreaComboBox.textareabox_placeholder = null;
    TextAreaComboBox.special_character = true;
    TextAreaComboBox.allow_special_character = "";
    TextAreaComboBox.case_format = "None";
    TextAreaComboBox.half_full_width = "None";
    TextAreaComboBox.title = "New Window";
    TextAreaComboBox.width = "600px";
    TextAreaComboBox.actions = ["Minimize", "Maximize", "Close"];
    TextAreaComboBox.modal = true;
    TextAreaComboBox.position = { top: 100, left: 250 };
    TextAreaComboBox.iframe = false;
    TextAreaComboBox.parameter = null;
    TextAreaComboBox.result = null;
    TextAreaComboBox.fn = null;
    TextAreaComboBox.allow_window = false;
    TextAreaComboBox.allow_window_text_only = true;
    TextAreaComboBox.text_mode = "replace";
    TextAreaComboBox.window_url = null;
    TextAreaComboBox.rows = "5";
    TextAreaComboBox.textarea_width = "200";
    TextAreaComboBox.is_escape_confirm = false;
    TextAreaComboBox.is_change = false;

    //Tooltip
    Tooltip.position = "top";

    //PanelBar
    PanelBar.expandMode = "multiple";
    PanelBar.isDefinedCollapse = false;
    PanelBar.collapseHeightRate = 0.5;
    PanelBar.isContentScroller = false;
    PanelBar.isFixdTop = false;

    //PanelBarForFuncMenu
    PanelBarForFuncMenu.expandMode = "multiple";

    //Breadcrumb
    Breadcrumb.allow_favorite = false;

    //GoBack
    GoBack.position_setting = "left center";
    GoBack.content = "< Back";

    //GoTop
    GoTop.position_setting = "right-10 bottom";
    GoTop.content = "^ Top";

    //TabStrip
    TabStrip.content_height = 0;

    //QuickBookmark
    QuickBookmark.position_setting = "right-10 center";
    QuickBookmark.bookmark_css_name = "b-quick-bookmark";
    QuickBookmark.content_header_text = "書籤快速鍵";

    //FileUpload
    FileUpload.valid_extension = "";
    FileUpload.maximum_upload_limit = "";
    FileUpload.is_escapte_confirm = false;
    FileUpload.is_change = false;

    return {
        AutoComplete: AutoComplete,
        IntervalTextBox: IntervalTextBox,
        MaskedTextBox: MaskedTextBox,
        NumericTextBox: NumericTextBox,
        PhoneTextBox: PhoneTextBox,
        TextBox: TextBox,
        Window: Window,
        DatePicker: DatePicker,
        YearPicker: YearPicker,
        MonthYearPicker: MonthYearPicker,
        TimePicker: TimePicker,
        IntervalDatePicker: IntervalDatePicker,
        IntervalYearPicker: IntervalYearPicker,
        IntervalMonthYearPicker: IntervalMonthYearPicker,
        IntervalTimePicker: IntervalTimePicker,
        TextBoxPopUp: TextBoxPopUp,
        PairTextBoxPopUp: PairTextBoxPopUp,
        CurrencyTextBox: CurrencyTextBox,
        CityDistrictZIP: CityDistrictZIP,
        LandSiteText: LandSiteText,
        Banner: Banner,
        IdTextBox: IdTextBox,
        AddressBoxSimple: AddressBoxSimple,
        TextAreaBox: TextAreaBox,
        AddressBoxFull: AddressBoxFull,
        RadioDropDownList: RadioDropDownList,
        Menu: Menu,
        ValidateButton: ValidateButton,
        CheckBoxList: CheckBoxList,
        RadioButtonList: RadioButtonList,
        DropDownList: DropDownList,
        DualDropDownList: DualDropDownList,
        TripleDropDownList: TripleDropDownList,
        ComboBox: ComboBox,
        DualComboBox: DualComboBox,
        TripleComboBox: TripleComboBox,
        ListBox: ListBox,
        MultiSelect: MultiSelect,
        DualListBox: DualListBox,
        TextAreaComboBox: TextAreaComboBox,
        Tooltip: Tooltip,
        PanelBar: PanelBar,
        PanelBarForFuncMenu: PanelBarForFuncMenu,
        Breadcrumb: Breadcrumb,
        GoBack: GoBack,
        GoTop: GoTop,
        TabStrip: TabStrip,
        DateTimePicker: DateTimePicker,
        QuickBookmark: QuickBookmark,
        FileUpload: FileUpload
    }
}();