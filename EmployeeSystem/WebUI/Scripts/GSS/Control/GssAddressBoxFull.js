
//功能: 完整地址 AddressBoxFull
//描述: 地址輸入
//歷程: 1. 2014/08/08   1.00   Ada Wang   Create
//      2. 2014/08/14   1.01   Ben_Tsai   Modify 增加focus方法

/**
 * @class BestAddressBoxFull
 */
(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        widget = ui.Widget,
        ns = ".kendoAddressBoxFull",
        className = "kendoAddressBoxFull",
        proxy = $.proxy;

    var GSSAddressBoxFull = widget.extend({

        //Init事件
        init: function (element, options) {
            var that = this, initOptions = {},
                defaultOptions = $.extend({}, that.options);

            //取得網頁上的設定值
            initOptions = kendo.parseOptions(element, that.options);
            //將傳入的options與網頁的上的options合併
            options = $.extend(initOptions, options);
            options = $.extend(defaultOptions, options);

            widget.fn.init.call(that, element, options);

            //Template
            that._procTemplate();

            //當is_escape_confirm為true時,需替element bind上_change事件
            if (that.options.is_escape_confirm) {
                that.element.on("change"), proxy(that._change, that);
            }

        },

        options: {

            /**
             * @property {string} name 物件
             * @default BestAddressBoxFull
             * @MemberOf BestAddressBoxFull
             */
            name: "BestAddressBoxFull",

            /**
             * @property {string} required_mode 必填設定
             * @default N
             * @MemberOf BestAddressBoxFull
             * @desc Y:TripleDropDownList & TextBox皆必填<br/>
                     N:TripleDropDownList & TextBox皆非必填
             */
            required_mode: ControlDefaultsObject.AddressBoxFull.required_mode || "N",

            /**
             * @property {object} dataSource 資料物件
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            dataSource: null,

            //TripleDDL 設定
            /**
             * @property {string} first_text_field FirstField的TextField欄位名稱
             * @default citytext
             * @MemberOf BestAddressBoxFull
             */
            first_text_field: ControlDefaultsObject.AddressBoxFull.first_text_field || "citytext",

            /**
             * @property {string} first_value_field FirstField的ValueField欄位名稱
             * @default cityvalue
             * @MemberOf BestAddressBoxFull
             */
            first_value_field: ControlDefaultsObject.AddressBoxFull.first_value_field || "cityvalue",

            /**
            * @property {string} first_field_suffix FirstField的後綴詞設定
            * @default 縣市
            * @MemberOf BestAddressBoxFull
            */
            first_field_suffix: ControlDefaultsObject.AddressBoxFull.first_field_suffix || "縣市",

            /**
             * @property {string} second_text_field SecondField的TextField欄位名稱
             * @default areatext
             * @MemberOf BestAddressBoxFull
             */
            second_text_field: ControlDefaultsObject.AddressBoxFull.second_text_field || "areatext",

            /**
             * @property {string} second_value_field SecondField的ValueField欄位名稱
             * @default areavalue
             * @MemberOf BestAddressBoxFull
             */
            second_value_field: ControlDefaultsObject.AddressBoxFull.second_value_field || "areavalue",

            /**
             * @property {string} second_field_suffix SecondField的後綴詞設定
             * @default 鄉鎮市區 郵遞區號
             * @MemberOf BestAddressBoxFull
             */
            second_field_suffix: ControlDefaultsObject.AddressBoxFull.second_field_suffix || "鄉鎮市區 郵遞區號",

            /**
             * @property {string} second_cascadefrom_field 連動SecondField資料的欄位名稱
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            second_cascadefrom_field: ControlDefaultsObject.AddressBoxFull.second_cascadefrom_field || null,

            /**
             * @property {string} third_text_field thirdField的TextField欄位名稱
             * @default ziptext
             * @MemberOf BestAddressBoxFull
             */
            third_text_field: ControlDefaultsObject.AddressBoxFull.third_text_field || "ziptext",

            /**
             * @property {string} third_value_field thirdField的ValueField欄位名稱
             * @default zipvalue
             * @MemberOf BestAddressBoxFull
             */
            third_value_field: ControlDefaultsObject.AddressBoxFull.third_value_field || "zipvalue",

            /**
             * @property {string} third_field_suffix thirdField的後綴詞設定
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            third_field_suffix: ControlDefaultsObject.AddressBoxFull.third_field_suffix || null,

            /**
             * @property {string} third_cascadefrom_field 連動thirdField資料的欄位名稱
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            third_cascadefrom_field: ControlDefaultsObject.AddressBoxFull.third_cascadefrom_field || null,

            //路街
            /**
             * @property {string} road_suffix 路街控制項的後綴詞設定
             * @default (路街)
             * @MemberOf BestAddressBoxFull
             */
            road_suffix: ControlDefaultsObject.AddressBoxFull.road_suffix || "(路街)",

            /**
             * @property {string} road_mode 路街控制項的文字模式
             * @default Chinese
             * @MemberOf BestAddressBoxFull
             */
            road_mode: ControlDefaultsObject.AddressBoxFull.road_mode || "Chinese",

            /**
             * @property {string} road_placeholder 路街控制項的提示訊息
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            road_placeholder: ControlDefaultsObject.AddressBoxFull.road_placeholder || null,

            /**
             * @property {string} road_special_character 路街控制項是否允許填入特殊字元
             * @default false
             * @MemberOf BestAddressBoxFull
             */
            road_special_character: ControlDefaultsObject.AddressBoxFull.road_special_character || false,

            /**
            * @property {string} road_half_full_width 路街控制項是否轉半全形
            * @default Full
            * @MemberOf BestAddressBoxFull
            * @desc None:無<br/>
                    Half:轉半形<br/>
                    Full:轉全形
            */
            road_half_full_width: ControlDefaultsObject.AddressBoxFull.road_half_full_width || "Full",

            //段
            /**
             * @property {string} section_suffix 段控制項的後綴詞設定
             * @default 段
             * @MemberOf BestAddressBoxFull
             */
            section_suffix: ControlDefaultsObject.AddressBoxFull.section_suffix || "段",

            /**
             * @property {string} section_mode 段控制項的文字模式
             * @default Chinese
             * @MemberOf BestAddressBoxFull
             */
            section_mode: ControlDefaultsObject.AddressBoxFull.section_mode || "Chinese",

            /**
             * @property {string} section_placeholder 段控制項的提示訊息
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            section_placeholder: ControlDefaultsObject.AddressBoxFull.section_placeholder || null,

            /**
             * @property {string} section_special_character 段控制項是否允許填入特殊字元
             * @default false
             * @MemberOf BestAddressBoxFull
             */
            section_special_character: ControlDefaultsObject.AddressBoxFull.section_special_character || false,

            /**
            * @property {string} section_half_full_width 段控制項是否轉半全形
            * @default Full
            * @MemberOf BestAddressBoxFull
            * @desc None:無<br/>
                    Half:轉半形<br/>
                    Full:轉全形
            */
            section_half_full_width: ControlDefaultsObject.AddressBoxFull.section_half_full_width || "Full",

            //巷
            /**
             * @property {string} alley_suffix 巷控制項的後綴詞設定
             * @default 巷
             * @MemberOf BestAddressBoxFull
             */
            alley_suffix: ControlDefaultsObject.AddressBoxFull.alley_suffix || "巷",

            /**
             * @property {string} alley_mode 巷控制項的文字模式
             * @default None
             * @MemberOf BestAddressBoxFull
             */
            alley_mode: ControlDefaultsObject.AddressBoxFull.alley_mode || "None",

            /**
             * @property {string} alley_placeholder 巷控制項的提示訊息
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            alley_placeholder: ControlDefaultsObject.AddressBoxFull.alley_placeholder || null,

            /**
             * @property {string} alley_special_character 巷控制項是否允許填入特殊字元
             * @default false
             * @MemberOf BestAddressBoxFull
             */
            alley_special_character: ControlDefaultsObject.AddressBoxFull.alley_special_character || false,

            /**
            * @property {string} alley_half_full_width 巷控制項是否轉半全形
            * @default Full
            * @MemberOf BestAddressBoxFull
            * @desc None:無<br/>
                    Half:轉半形<br/>
                    Full:轉全形
            */
            alley_half_full_width: ControlDefaultsObject.AddressBoxFull.alley_half_full_width || "Full",

            //弄
            /**
             * @property {string} lane_suffix 弄控制項的後綴詞設定
             * @default 弄
             * @MemberOf BestAddressBoxFull
             */
            lane_suffix: ControlDefaultsObject.AddressBoxFull.lane_suffix || "弄",

            /**
             * @property {string} lane_mode 弄控制項的文字模式
             * @default None
             * @MemberOf BestAddressBoxFull
             */
            lane_mode: ControlDefaultsObject.AddressBoxFull.lane_mode || "None",

            /**
             * @property {string} lane_placeholder 弄控制項的提示訊息
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            lane_placeholder: ControlDefaultsObject.AddressBoxFull.lane_placeholder || null,

            /**
             * @property {string} lane_special_character 弄控制項是否允許填入特殊字元
             * @default false
             * @MemberOf BestAddressBoxFull
             */
            lane_special_character: ControlDefaultsObject.AddressBoxFull.lane_special_character || false,

            /**
            * @property {string} lane_half_full_width 弄控制項是否轉半全形
            * @default Full
            * @MemberOf BestAddressBoxFull
            * @desc None:無<br/>
                    Half:轉半形<br/>
                    Full:轉全形
            */
            lane_half_full_width: ControlDefaultsObject.AddressBoxFull.lane_half_full_width || "Full",

            //號
            /**
             * @property {string} no_suffix 號控制項的後綴詞設定
             * @default 之
             * @MemberOf BestAddressBoxFull
             */
            no_suffix: ControlDefaultsObject.AddressBoxFull.no_suffix || "之",

            /**
             * @property {string} no_mode 號控制項的文字模式
             * @default Digit
             * @MemberOf BestAddressBoxFull
             */
            no_mode: ControlDefaultsObject.AddressBoxFull.no_mode || "Digit",

            /**
             * @property {string} no_placeholder 號控制項的提示訊息
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            no_placeholder: ControlDefaultsObject.AddressBoxFull.no_placeholder || null,

            /**
             * @property {string} no_special_character 號控制項是否允許填入特殊字元
             * @default false
             * @MemberOf BestAddressBoxFull
             */
            no_special_character: ControlDefaultsObject.AddressBoxFull.no_special_character || false,

            /**
            * @property {string} no_half_full_width 號控制項是否轉半全形
            * @default Full
            * @MemberOf BestAddressBoxFull
            * @desc None:無<br/>
                    Half:轉半形<br/>
                    Full:轉全形
            */
            no_half_full_width: ControlDefaultsObject.AddressBoxFull.no_half_full_width || "Full",

            //號之
            /**
             * @property {string} noof_suffix 號之控制項的後綴詞設定
             * @default 號之
             * @MemberOf BestAddressBoxFull
             */
            noof_suffix: ControlDefaultsObject.AddressBoxFull.noof_suffix || "號之",

            /**
             * @property {string} noof_mode 號之控制項的文字模式
             * @default Digit
             * @MemberOf BestAddressBoxFull
             */
            noof_mode: ControlDefaultsObject.AddressBoxFull.noof_mode || "Digit",

            /**
             * @property {string} noof_placeholder 號之控制項的提示訊息
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            noof_placeholder: ControlDefaultsObject.AddressBoxFull.noof_placeholder || null,

            /**
             * @property {string} noof_special_character 號之控制項是否允許填入特殊字元
             * @default false
             * @MemberOf BestAddressBoxFull
             */
            noof_special_character: ControlDefaultsObject.AddressBoxFull.noof_special_character || false,

            /**
            * @property {string} noof_half_full_width 號之控制項是否轉半全形
            * @default Full
            * @MemberOf BestAddressBoxFull
            * @desc None:無<br/>
                    Half:轉半形<br/>
                    Full:轉全形
            */
            noof_half_full_width: ControlDefaultsObject.AddressBoxFull.noof_half_full_width || "Full",

            //之號
            /**
             * @property {string} ofno_suffix 之號控制項的後綴詞設定
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            ofno_suffix: ControlDefaultsObject.AddressBoxFull.ofno_suffix || null,

            /**
             * @property {string} ofno_mode 之號控制項的文字模式
             * @default Digit
             * @MemberOf BestAddressBoxFull
             */
            ofno_mode: ControlDefaultsObject.AddressBoxFull.ofno_mode || "Digit",

            /**
             * @property {string} ofno_placeholder 之號控制項的提示訊息
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            ofno_placeholder: ControlDefaultsObject.AddressBoxFull.ofno_placeholder || null,

            /**
             * @property {string} ofno_special_character 之號控制項是否允許填入特殊字元
             * @default false
             * @MemberOf BestAddressBoxFull
             */
            ofno_special_character: ControlDefaultsObject.AddressBoxFull.ofno_special_character || false,

            /**
            * @property {string} ofno_half_full_width 之號控制項是否轉半全形
            * @default Full
            * @MemberOf BestAddressBoxFull
            * @desc None:無<br/>
                    Half:轉半形<br/>
                    Full:轉全形
            */
            ofno_half_full_width: ControlDefaultsObject.AddressBoxFull.ofno_half_full_width || "Full",

            //樓
            /**
             * @property {string} floor_suffix 樓控制項的後綴詞設定
             * @default 樓之
             * @MemberOf BestAddressBoxFull
             */
            floor_suffix: ControlDefaultsObject.AddressBoxFull.floor_suffix || "樓之",

            /**
             * @property {string} floor_mode 樓控制項的文字模式
             * @default Digit
             * @MemberOf BestAddressBoxFull
             */
            floor_mode: ControlDefaultsObject.AddressBoxFull.floor_mode || "Digit",

            /**
             * @property {string} floor_placeholder 樓控制項的提示訊息
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            floor_placeholder: ControlDefaultsObject.AddressBoxFull.floor_placeholder || null,

            /**
             * @property {string} floor_special_character 樓控制項是否允許填入特殊字元
             * @default false
             * @MemberOf BestAddressBoxFull
             */
            floor_special_character: ControlDefaultsObject.AddressBoxFull.floor_special_character || false,

            /**
            * @property {string} floor_half_full_width 樓控制項是否轉半全形
            * @default Full
            * @MemberOf BestAddressBoxFull
            * @desc None:無<br/>
                    Half:轉半形<br/>
                    Full:轉全形
            */
            floor_half_full_width: ControlDefaultsObject.AddressBoxFull.floor_half_full_width || "Full",

            //樓之
            /**
             * @property {string} floorof_suffix 樓之控制項的後綴詞設定
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            floorof_suffix: ControlDefaultsObject.AddressBoxFull.floorof_suffix || null,

            /**
             * @property {string} floorof_mode 樓之控制項的文字模式
             * @default Digit
             * @MemberOf BestAddressBoxFull
             */
            floorof_mode: ControlDefaultsObject.AddressBoxFull.floorof_mode || "Digit",

            /**
             * @property {string} floorof_placeholder 樓之控制項的提示訊息
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            floorof_placeholder: ControlDefaultsObject.AddressBoxFull.floorof_placeholder || null,

            /**
             * @property {string} floorof_special_character 樓之控制項是否允許填入特殊字元
             * @default false
             * @MemberOf BestAddressBoxFull
             */
            floorof_special_character: ControlDefaultsObject.AddressBoxFull.floorof_special_character || false,

            /**
            * @property {string} floorof_half_full_width 樓之控制項是否轉半全形
            * @default Full
            * @MemberOf BestAddressBoxFull
            * @desc None:無<br/>
                    Half:轉半形<br/>
                    Full:轉全形
            */
            floorof_half_full_width: ControlDefaultsObject.AddressBoxFull.floorof_half_full_width || "Full",

            //其他
            /**
             * @property {string} other_suffix 其他控制項的後綴詞設定
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            other_suffix: ControlDefaultsObject.AddressBoxFull.other_suffix || null,

            /**
             * @property {string} other_mode 其他控制項的文字模式
             * @default None
             * @MemberOf BestAddressBoxFull
             */
            other_mode: ControlDefaultsObject.AddressBoxFull.other_mode || "None",

            /**
             * @property {string} other_placeholder 其他控制項的提示訊息
             * @default null
             * @MemberOf BestAddressBoxFull
             */
            other_placeholder: ControlDefaultsObject.AddressBoxFull.other_placeholder || null,

            /**
             * @property {string} other_special_character 其他控制項是否允許填入特殊字元
             * @default false
             * @MemberOf BestAddressBoxFull
             */
            other_special_character: ControlDefaultsObject.AddressBoxFull.other_special_character || false,

            /**
            * @property {string} other_half_full_width 其他控制項是否轉半全形
            * @default Full
            * @MemberOf BestAddressBoxFull
            * @desc None:無<br/>
                    Half:轉半形<br/>
                    Full:轉全形
            */
            other_half_full_width: ControlDefaultsObject.AddressBoxFull.other_half_full_width || "Full",

            /**
             * @property {boolean} is_escapte_confirm 是否啟用判斷更新是否有存檔
             * @default false
             * @MemberOf BestAddressBoxFull
             */
            is_escape_confirm: ControlDefaultsObject.AddressBoxFull.is_escapte_confirm || false,

            /**
             * @property {boolean} is_change 判斷是否有變更資料
             * @default false
             * @MemberOf BestAddressBoxFull
             */
            is_change: ControlDefaultsObject.AddressBoxFull.is_change || false,

            /**
             * @property {string} readonly_mode TextBox唯讀模式設定
             * @default N
             * @MemberOf BestAddressBoxFull
             * @desc Y:所有控制項皆唯讀<br/>
                     1:TripleDropDownList唯讀,TextBox皆非唯讀<br/>
                     N:所有控制項皆非唯讀
             */
            readonly_mode: ControlDefaultsObject.AddressBoxFull.readonly_mode || "N",

            /**
             * @property {boolean} is_target 設定是否為目標物(驗證時辨識用)
             * @default true
             * @MemberOf BestAddressBoxFull
             */
            is_target: true,

            /**
             * @property {string} readonly_status 控制項唯讀狀態
             * @default false
             * @MemberOf BestAddressBoxFull
             * @desc 供整頁唯讀, 區域唯讀, 動態唯讀使用
             */
            readonly_status: false,

            /**
             * @property {string} error_message 錯誤訊息
             * @default 空字串
             * @MemberOf BestAddressBoxFull
             */
            error_message: "",

            /**
             * @property {string} validation_group 驗證群組
             * @default 空字串
             * @MemberOf BestAddressBoxFull
             */
            validation_group: "",

            /**
             * @property {string} required_status 控制項必填狀態
             * @default false
             * @MemberOf BestAddressBoxFull
             * @desc 供整頁必填, 區域必填, 動態修改必填狀態使用
             */
            required_status: false

        },

        /**
         * @desc 取值 City DropDownList Text
         * @memberof BestAddressBoxFull
         * @method CitySelectedText
         * @return {string} 取得City DropDownList Text
         * @example
         * 取值:element.BestAddressBoxFull().CitySelectedText();
         */
        CitySelectedText: function () {
            var that = this,
                objDDL = that.element.data("kendoBestTripleDropDownList");

            return objDDL.FirstSelectedText();
        },

        /**
         * @desc 設/取值 City DropDownList Value
         * @memberof BestAddressBoxFull
         * @method CitySelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得City DropDownList Value
         * @example
         * 取值:element.BestAddressBoxFull().CitySelectedValue();
         * 設值:element.BestAddressBoxFull().CitySelectedValue(setValue);
         */
        CitySelectedValue: function (setValue) {
            var that = this,
                objDDL = that.element.data("kendoBestTripleDropDownList");

            if (setValue == null) {
                return objDDL.FirstSelectedValue();
            }

            if (setValue != null) {
                objDDL.FirstSelectedValue(setValue);
            }

        },

        /**
         * @desc 取值 Area DropDownList Text
         * @memberof BestAddressBoxFull
         * @method AreaSelectedText
         * @return {string} 取得Area DropDownList Text
         * @example
         * 取值:element.BestAddressBoxFull().AreaSelectedText();
         */
        AreaSelectedText: function (setValue) {
            var that = this,
                 objDDL = that.element.data("kendoBestTripleDropDownList");

            return objDDL.MiddleSelectedText();
        },

        /**
         * @desc 設/取值 Area DropDownList Value
         * @memberof BestAddressBoxFull
         * @method AreaSelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得Area DropDownList Value
         * @example
         * 取值:element.BestAddressBoxFull().AreaSelectedValue();
         * 設值:element.BestAddressBoxFull().AreaSelectedValue(setValue);
         */
        AreaSelectedValue: function (setValue) {
            var that = this,
                 objDDL = that.element.data("kendoBestTripleDropDownList");

            if (setValue == null) {
                return objDDL.MiddleSelectedValue();
            }

            if (setValue != null) {
                objDDL.MiddleSelectedValue(setValue);
            }

        },

        /**
         * @desc 取值 Zip DropDownList Text
         * @memberof BestAddressBoxFull
         * @method ZipSelectedText
         * @return {string} 取得Zip DropDownList Text
         * @example
         * 取值:element.BestAddressBoxFull().ZipSelectedText();
         */
        ZipSelectedText: function (setValue) {
            var that = this,
                 objDDL = that.element.data("kendoBestTripleDropDownList");

            return objDDL.LastSelectedText();
        },

        /**
         * @desc 設/取值 Zip DropDownList Value
         * @memberof BestAddressBoxFull
         * @method ZipSelectedValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得Zip DropDownList Value
         * @example
         * 取值:element.BestAddressBoxFull().ZipSelectedValue();
         * 設值:element.BestAddressBoxFull().ZipSelectedValue(setValue);
         */
        ZipSelectedValue: function (setValue) {
            var that = this,
                 objDDL = that.element.data("kendoBestTripleDropDownList");

            if (setValue == null) {
                return objDDL.LastSelectedValue();
            }

            if (setValue != null) {
                objDDL.LastSelectedValue(setValue);
            }

        },

        /**
         * @desc 設/取值 路街 TextBox
         * @memberof BestAddressBoxFull
         * @method RoadValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得TextBox的值
         * @example
         * 取值:element.BestAddressBoxFull().RoadValue();
         * 設值:element.BestAddressBoxFull().RoadValue(setValue);
         */
        RoadValue: function (setValue) {
            var that = this, objTxt_road = that.RoadTextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objTxt_road.Bvalue();
            }

            //設值
            if (setValue != null) {
                objTxt_road.Bvalue(setValue);
            }

        },

        /**
         * @desc 設/取值 段 TextBox
         * @memberof BestAddressBoxFull
         * @method SectionValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得TextBox的值
         * @example
         * 取值:element.BestAddressBoxFull().SectionValue();
         * 設值:element.BestAddressBoxFull().SectionValue(setValue);
         */
        SectionValue: function (setValue) {
            var that = this, objTxt_section = that.SectionTextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objTxt_section.Bvalue();
            }

            //設值
            if (setValue != null) {
                objTxt_section.Bvalue(setValue);
            }

        },

        /**
         * @desc 設/取值 巷 TextBox
         * @memberof BestAddressBoxFull
         * @method AlleyValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得TextBox的值
         * @example
         * 取值:element.BestAddressBoxFull().AlleyValue();
         * 設值:element.BestAddressBoxFull().AlleyValue(setValue);
         */
        AlleyValue: function (setValue) {
            var that = this, objTxt_alley = that.AlleyTextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objTxt_alley.Bvalue();
            }

            //設值
            if (setValue != null) {
                objTxt_alley.Bvalue(setValue);
            }

        },

        /**
         * @desc 設/取值 弄 TextBox
         * @memberof BestAddressBoxFull
         * @method LaneValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得TextBox的值
         * @example
         * 取值:element.BestAddressBoxFull().LaneValue();
         * 設值:element.BestAddressBoxFull().LaneValue(setValue);
         */
        LaneValue: function (setValue) {
            var that = this, objTxt_lane = that.LaneTextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objTxt_lane.Bvalue();
            }

            //設值
            if (setValue != null) {
                objTxt_lane.Bvalue(setValue);
            }

        },

        /**
         * @desc 設/取值 號 TextBox
         * @memberof BestAddressBoxFull
         * @method NoValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得TextBox的值
         * @example
         * 取值:element.BestAddressBoxFull().NoValue();
         * 設值:element.BestAddressBoxFull().NoValue(setValue);
         */
        NoValue: function (setValue) {
            var that = this, objTxt_no = that.NoTextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objTxt_no.Bvalue();
            }

            //設值
            if (setValue != null) {
                objTxt_no.Bvalue(setValue);
            }

        },

        /**
         * @desc 設/取值 號之 TextBox
         * @memberof BestAddressBoxFull
         * @method NoOfValue
         * @param {string} setValue 設定值(可不傳)
         * @return {string} 取得TextBox的值
         * @example
         * 取值:element.BestAddressBoxFull().NoOfValue();
         * 設值:element.BestAddressBoxFull().NoOfValue(setValue);
         */
        NoOfValue: function (setValue) {
            var that = this, objTxt_noof = that.NoOfTextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objTxt_noof.Bvalue();
            }

            //設值
            if (setValue != null) {
                objTxt_noof.Bvalue(setValue);
            }

        },

        /**
        * @desc 設/取值 之號 TextBox
        * @memberof BestAddressBoxFull
        * @method OfNoValue
        * @param {string} setValue 設定值(可不傳)
        * @return {string} 取得TextBox的值
        * @example
        * 取值:element.BestAddressBoxFull().OfNoValue();
        * 設值:element.BestAddressBoxFull().OfNoValue(setValue);
        */
        OfNoValue: function (setValue) {
            var that = this, objTxt_ofno = that.OfNoTextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objTxt_ofno.Bvalue();
            }

            //設值
            if (setValue != null) {
                objTxt_ofno.Bvalue(setValue);
            }

        },

        /**
        * @desc 設/取值 樓 TextBox
        * @memberof BestAddressBoxFull
        * @method FloorValue
        * @param {string} setValue 設定值(可不傳)
        * @return {string} 取得TextBox的值
        * @example
        * 取值:element.BestAddressBoxFull().FloorValue();
        * 設值:element.BestAddressBoxFull().FloorValue(setValue);
        */
        FloorValue: function (setValue) {
            var that = this, objTxt_floor = that.FloorTextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objTxt_floor.Bvalue();
            }

            //設值
            if (setValue != null) {
                objTxt_floor.Bvalue(setValue);
            }

        },

        /**
        * @desc 設/取值 樓之 TextBox
        * @memberof BestAddressBoxFull
        * @method FloorOfValue
        * @param {string} setValue 設定值(可不傳)
        * @return {string} 取得TextBox的值
        * @example
        * 取值:element.BestAddressBoxFull().FloorOfValue();
        * 設值:element.BestAddressBoxFull().FloorOfValue(setValue);
        */
        FloorOfValue: function (setValue) {
            var that = this, objTxt_floorof = that.FloorOfTextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objTxt_floorof.Bvalue();
            }

            //設值
            if (setValue != null) {
                objTxt_floorof.Bvalue(setValue);
            }

        },

        /**
        * @desc 設/取值 其他 TextBox
        * @memberof BestAddressBoxFull
        * @method OtherValue
        * @param {string} setValue 設定值(可不傳)
        * @return {string} 取得TextBox的值
        * @example
        * 取值:element.BestAddressBoxFull().OtherValue();
        * 設值:element.BestAddressBoxFull().OtherValue(setValue);
        */
        OtherValue: function (setValue) {
            var that = this, objTxt_other = that.OtherTextBox.data("kendoBestTextBox");

            //取值
            if (setValue == null) {
                return objTxt_other.Bvalue();
            }

            //設值
            if (setValue != null) {
                objTxt_other.Bvalue(setValue);
            }

        },

        /**
         * @desc 唯讀處理
         * @memberof BestAddressBoxFull
         * @method Breadonly
         * @param {boolean} readonly 設定值(可不傳)
         * @example
         * 唯讀:element.BestAddressBoxFull().Breadonly();
         * 取消唯讀:element.BestAddressBoxFull().Breadonly(false);
         */
        Breadonly: function (readonly) {

            var that = this,
                isReadonly = readonly === undefined ? true : readonly;

            if (isReadonly) {
                that._procReadonlyMode("Y");
            }
            else {
                that._procReadonlyMode();
            }

            //設定控制項唯讀狀態
            that.options.readonly_status = isReadonly;

        },

        /**
         * @desc 設定控制項是否必填
         * @memberof BestAddressBoxFull
         * @method Brequired
         * @param {bool} required 是否必填
         * @example
         * 唯讀: element.Brequired();
         * 唯讀: element.Brequired(true);
         * 不唯讀: element.Brequired(false);
         */
        Brequired: function (required) {

            var that = this
                , isRequired = required === undefined ? true : required;

            if (!isRequired) {
                //非必填狀態, 則要依據required_mode回到初始狀態
                if (that.options.required_mode.toString() != "N") isRequired = true;
            }

            //設定控制項必填狀態
            that.options.required_status = isRequired;

        },

        /**
         * @desc 設定游標在控制項上
         * @memberof BestAddressBoxFull
         * @method focus
         * @example
         * 聚焦: element.focus();
         */
        focus: function () {

            var that = this;

            //取得data-role含有best且不唯讀的control
            that.element.find("[data-role*=best]").each(function () {

                var that = $(this);

                //依據不同的data-role產生不同的控制項
                var objControl = SelectControlObject.SelectControl(that);

                if (objControl == null) return;    //控制項不存在, 換下一個

                //判斷唯讀狀態
                if (!objControl._chkReadOnlyStatus()) {
                    objControl.focus();
                    return false;
                }

            });

        },

        /**
         * @desc 設定控制項的options
         * @memberof BestAddressBoxSimple
         * @method BsetOptions
         * @example
         * 設定options: element.BsetOptions({ readonly_mode: "2" });
         */
        BsetOptions: function (options) {

            var that = this;

            widget.fn.setOptions.call(that, options);

        },

        /**
         * @desc 設定控制項是否鎖定
         * @memberof BestAddressBoxSimple
         * @method Block
         * @param {bool} lock 是否鎖定
         * @example
         * 鎖定: element.Block();
         * 鎖定: element.Block(true);
         * 不鎖定: element.Block(false);
         */
        Block: function (lock) {

            var that = this,
                isLock = lock === undefined ? true : lock,
                loadingIcon = '<span class="k-icon k-loading b-lock" style="margin-left: -20px; margin-right: 5px; height: 16px; margin-top: 0px;"></span>',
                objTripleDDL = that.element.data("kendoBestTripleDropDownList"),
                objTxt_road = that.RoadTextBox.data("kendoBestTextBox"),
                objTxt_section = that.SectionTextBox.data("kendoBestTextBox"),
                objTxt_alley = that.AlleyTextBox.data("kendoBestTextBox"),
                objTxt_lane = that.LaneTextBox.data("kendoBestTextBox"),
                objTxt_no = that.NoTextBox.data("kendoBestTextBox"),
                objTxt_noof = that.NoOfTextBox.data("kendoBestTextBox"),
                objTxt_ofno = that.OfNoTextBox.data("kendoBestTextBox"),
                objTxt_floor = that.FloorTextBox.data("kendoBestTextBox"),
                objTxt_floorof = that.FloorOfTextBox.data("kendoBestTextBox"),
                objTxt_other = that.OtherTextBox.data("kendoBestTextBox");

            if (isLock) {

                that.element.find(".k-icon").addClass("k-loading");
                objTripleDDL.Breadonly();
                that.RoadTextBox.after(loadingIcon);
                objTxt_road.Breadonly();
                that.SectionTextBox.after(loadingIcon);
                objTxt_section.Breadonly();
                that.AlleyTextBox.after(loadingIcon);
                objTxt_alley.Breadonly();
                that.LaneTextBox.after(loadingIcon);
                objTxt_lane.Breadonly();
                that.NoTextBox.after(loadingIcon);
                objTxt_no.Breadonly();
                that.NoOfTextBox.after(loadingIcon);
                objTxt_noof.Breadonly();
                that.OfNoTextBox.after(loadingIcon);
                objTxt_ofno.Breadonly();
                that.FloorTextBox.after(loadingIcon);
                objTxt_floor.Breadonly();
                that.FloorOfTextBox.after(loadingIcon);
                objTxt_floorof.Breadonly();
                that.OtherTextBox.after(loadingIcon);
                objTxt_other.Breadonly();

            }
            else {

                that.element.find(".k-icon").removeClass("k-loading");
                objTripleDDL.Breadonly(false);
                objTxt_road.Breadonly(false);
                objTxt_section.Breadonly(false);
                objTxt_alley.Breadonly(false);
                objTxt_lane.Breadonly(false);
                objTxt_no.Breadonly(false);
                objTxt_noof.Breadonly(false);
                objTxt_ofno.Breadonly(false);
                objTxt_floor.Breadonly(false);
                objTxt_floorof.Breadonly(false);
                objTxt_other.Breadonly(false);
                that.element.find(".b-lock").remove();

            }

        },

        //處理可編輯事件(三個DropDownList onchange時觸發 _blur)
        _bindDropDownList: function () {

            this.element.find("input[data-role=bestdropdownlist]")
                .on("change.Observable", proxy(this._blur, this));

        },

        _blur: function () {

            if (this._chkRequired()) {

                if (ErrorDialogObservableObject.GetNowErrorDialog() !== undefined) {
                    ErrorDialogObservableObject.GetNowErrorDialog().deleteItem(this.element.attr("id"));
                }

            }

        },

        //change事件
        _change: function () {
            this.options.is_change = true;
        },

        //檢查是否有至少有填寫一個條件
        _chkAtLeastOne: function () {
            var that = this;

            if (that.CitySelectedValue().lenght > 0
                        || that.AreaSelectedValue().lenght > 0
                        || that.ZipSelectedValue().lenght > 0
                        || that.RoadValue().lenght > 0
                        || that.SectionValue().lenght > 0
                        || that.AlleyValue().lenght > 0
                        || that.LaneValue().lenght > 0
                        || that.NoValue().lenght > 0
                        || that.NoOfValue().lenght > 0
                        || that.OfNoValue().lenght > 0
                        || that.FloorValue().lenght > 0
                        || that.FloorOfValue().lenght > 0
                        || that.OtherValue().lenght > 0
                ) {
                return true;
            }
            else {
                return false;
            }

        },

        //檢查是否有填寫資料
        _chkRequired: function () {
            var that = this,
                isKeyInVal = false,
                objTripleDDL = that.element.data("kendoBestTripleDropDownList"),
                objTxt_road = that.RoadTextBox.data("kendoBestTextBox"),
                objTxt_section = that.SectionTextBox.data("kendoBestTextBox"),
                objTxt_alley = that.AlleyTextBox.data("kendoBestTextBox"),
                objTxt_lane = that.LaneTextBox.data("kendoBestTextBox"),
                objTxt_no = that.NoTextBox.data("kendoBestTextBox"),
                objTxt_noof = that.NoOfTextBox.data("kendoBestTextBox"),
                objTxt_ofno = that.OfNoTextBox.data("kendoBestTextBox"),
                objTxt_floor = that.FloorTextBox.data("kendoBestTextBox"),
                objTxt_floorof = that.FloorOfTextBox.data("kendoBestTextBox"),
                objTxt_other = that.OtherTextBox.data("kendoBestTextBox");

            //處理控制項是否要必填設定(限可編輯狀態)
            switch (that.options.required_mode.toString()) {

                case "Y":   //除縣市、鄉鎮市區必填外，路街與其他至少要填其中一項

                    isKeyInVal = objTripleDDL._chkRequired();

                    if (isKeyInVal) {

                        if (!objTxt_road._chkReadOnlyStatus() && that.RoadValue().length > 0) {
                            isKeyInVal = true;
                        }
                        else if (!objTxt_other._chkReadOnlyStatus() && that.OtherValue().length > 0) {
                            isKeyInVal = true;
                        }
                        else {
                            isKeyInVal = false;
                        }

                    }

                    break;

                case "N":   //所有皆非必填
                    isKeyInVal = true;
                    break;
            }

            return isKeyInVal;

        },

        //檢查控制項目前必填狀態, 回傳:true必填, false非必填
        _chkRequiredStatus: function () {

            var that = this
                , isRequired = that.options.required_status;

            if (!isRequired) {
                //當非必填狀態下, 需要額外判斷必填模式
                if (that.options.required_mode != "N") isRequired = true;
            }

            return isRequired;

        },

        //檢查控制項目前唯讀狀態, 回傳:true唯讀, false非唯讀
        _chkReadOnlyStatus: function () {

            var that = this
                , isReadOnly = that.options.readonly_status;

            if (!isReadOnly) {
                //當非唯讀狀態下, 需要額外判斷唯讀模式
                if (that.options.readonly_mode == "Y") isReadOnly = true;
            }

            return isReadOnly;

        },

        //處理ReadonlyMode
        _procReadonlyMode: function (readonlyMode) {

            var that = this,
                strReadonlyMode = readonlyMode === undefined ? that.options.readonly_mode.toString() : readonlyMode,
                dropDownListReadOnlyMode = "",
                textBoxReadOnlyMode = "",
                objTripleDDL = that.element.data("kendoBestTripleDropDownList"),
                objTxt_road = that.RoadTextBox.data("kendoBestTextBox"),
                objTxt_section = that.SectionTextBox.data("kendoBestTextBox"),
                objTxt_alley = that.AlleyTextBox.data("kendoBestTextBox"),
                objTxt_lane = that.LaneTextBox.data("kendoBestTextBox"),
                objTxt_no = that.NoTextBox.data("kendoBestTextBox"),
                objTxt_noof = that.NoOfTextBox.data("kendoBestTextBox"),
                objTxt_ofno = that.OfNoTextBox.data("kendoBestTextBox"),
                objTxt_floor = that.FloorTextBox.data("kendoBestTextBox"),
                objTxt_floorof = that.FloorOfTextBox.data("kendoBestTextBox"),
                objTxt_other = that.OtherTextBox.data("kendoBestTextBox");

            switch (strReadonlyMode) {

                case "Y":   //Both Readonly
                    dropDownListReadOnlyMode = "Y";
                    textBoxReadOnlyMode = "Y";
                    break;
                case "1":   //DDL Readonly TXT Not Readonly
                    dropDownListReadOnlyMode = "Y";
                    textBoxReadOnlyMode = "N";
                    break;
                case "N":   //Both Not Readonly
                    dropDownListReadOnlyMode = "N";
                    textBoxReadOnlyMode = "N";
                    break;

            }

            //設定TripleDropDownList的唯讀
            objTripleDDL.BsetOptions({
                readonly_mode: dropDownListReadOnlyMode
            });

            if (dropDownListReadOnlyMode == "Y") {
                objTripleDDL.Breadonly();
            }
            else {
                objTripleDDL.Breadonly(false);
            }

            //設定Road TextBox的唯讀
            objTxt_road.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objTxt_road.Breadonly();
            }
            else {
                objTxt_road.Breadonly(false);
            }

            //設定Section TextBox的唯讀
            objTxt_section.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objTxt_section.Breadonly();
            }
            else {
                objTxt_section.Breadonly(false);
            }

            //設定Alley TextBox的唯讀
            objTxt_alley.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objTxt_alley.Breadonly();
            }
            else {
                objTxt_alley.Breadonly(false);
            }

            //設定Lane TextBox的唯讀
            objTxt_lane.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objTxt_lane.Breadonly();
            }
            else {
                objTxt_lane.Breadonly(false);
            }

            //設定No TextBox的唯讀
            objTxt_no.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objTxt_no.Breadonly();
            }
            else {
                objTxt_no.Breadonly(false);
            }

            //設定NoOf TextBox的唯讀
            objTxt_noof.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objTxt_noof.Breadonly();
            }
            else {
                objTxt_noof.Breadonly(false);
            }

            //設定OfNo TextBox的唯讀
            objTxt_ofno.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objTxt_ofno.Breadonly();
            }
            else {
                objTxt_ofno.Breadonly(false);
            }

            //設定Floor TextBox的唯讀
            objTxt_floor.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objTxt_floor.Breadonly();
            }
            else {
                objTxt_floor.Breadonly(false);
            }

            //設定FloorOf TextBox的唯讀
            objTxt_floorof.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objTxt_floorof.Breadonly();
            }
            else {
                objTxt_floorof.Breadonly(false);
            }

            //設定Other TextBox的唯讀
            objTxt_other.BsetOptions({
                readonly_mode: textBoxReadOnlyMode
            });

            if (textBoxReadOnlyMode == "Y") {
                objTxt_other.Breadonly();
            }
            else {
                objTxt_other.Breadonly(false);
            }

        },

        _procTemplate: function () {
            var that = this,
                otherTemplate = "<input style='width:500px;'/>",
                addrTemplate = "<input style='width:110px;'/>",
                addrofTemplate = "<input style='width:60px;'/>";

            //將參數設至GSSTripleDropDownList
            that.element.kendoBestTripleDropDownList({
                dataSource: that.options.dataSource,
                first_text_field: that.options.first_text_field,
                first_value_field: that.options.first_value_field,
                first_field_suffix: that.options.first_field_suffix,
                middle_text_field: that.options.second_text_field,
                middle_value_field: that.options.second_value_field,
                middle_cascadefrom_field: that.options.second_cascadefrom_field,
                middle_field_suffix: that.options.second_field_suffix,
                last_text_field: that.options.third_text_field,
                last_value_field: that.options.third_value_field,
                last_cascadefrom_field: that.options.third_cascadefrom_field,
                last_field_suffix: that.options.third_field_suffix,
                required_mode: that.options.required_mode,
                is_target: false
            });

            //調整TripleDropDownList大小
            that.element.find("span[class='k-widget k-dropdown k-header']").width(110);
            that._bindDropDownList();

            //新增 Road TextBox
            that.RoadTextBox = $(addrTemplate);
            that.element.append(that.RoadTextBox);
            that.RoadTextBox.addClass(className);
            that.RoadTextBox.on("blur" + ns, proxy(that._blur, that));
            that.RoadTextBox.kendoBestTextBox({
                suffix: that.options.road_suffix,
                mode: that.options.road_mode,
                placeholder: that.options.road_placeholder,
                special_character: that.options.road_special_character,
                half_full_width: that.options.road_half_full_width,
                is_target: false
            });

            //新增 Section TextBox
            that.SectionTextBox = $(addrofTemplate);
            that.element.append(that.SectionTextBox);
            that.SectionTextBox.addClass(className);
            that.SectionTextBox.on("blur" + ns, proxy(that._blur, that));
            that.SectionTextBox.kendoBestTextBox({
                suffix: that.options.section_suffix,
                mode: that.options.section_mode,
                placeholder: that.options.road_placeholder,
                special_character: that.options.section_special_character,
                half_full_width: that.options.section_half_full_width,
                is_target: false
            });

            //新增 Alley TextBox
            that.AlleyTextBox = $(addrTemplate);
            that.element.append(that.AlleyTextBox);
            that.AlleyTextBox.addClass(className);
            that.AlleyTextBox.on("blur" + ns, proxy(that._blur, that));
            that.AlleyTextBox.kendoBestTextBox({
                suffix: that.options.alley_suffix,
                mode: that.options.alley_mode,
                placeholder: that.options.alley_placeholder,
                special_character: that.options.alley_special_character,
                half_full_width: that.options.alley_half_full_width,
                is_target: false
            });

            //新增 Lane TextBox
            that.LaneTextBox = $(addrTemplate);
            that.element.append(that.LaneTextBox);
            that.LaneTextBox.addClass(className);
            that.LaneTextBox.on("blur" + ns, proxy(that._blur, that));
            that.LaneTextBox.kendoBestTextBox({
                suffix: that.options.lane_suffix,
                mode: that.options.lane_mode,
                placeholder: that.options.lane_placeholder,
                special_character: that.options.lane_special_character,
                half_full_width: that.options.lane_half_full_width,
                is_target: false
            });

            //新增 No TextBox
            that.NoTextBox = $(addrTemplate);
            that.element.append(that.NoTextBox);
            that.NoTextBox.addClass(className);
            that.NoTextBox.on("blur" + ns, proxy(that._blur, that));
            that.NoTextBox.kendoBestTextBox({
                suffix: that.options.no_suffix,
                mode: that.options.no_mode,
                placeholder: that.options.no_placeholder,
                special_character: that.options.no_special_character,
                half_full_width: that.options.no_half_full_width,
                is_target: false
            });

            //新增 NoOf TextBox
            that.NoOfTextBox = $(addrTemplate);
            that.element.append(that.NoOfTextBox);
            that.NoOfTextBox.addClass(className);
            that.NoOfTextBox.on("blur" + ns, proxy(that._blur, that));
            that.NoOfTextBox.kendoBestTextBox({
                suffix: that.options.noof_suffix,
                mode: that.options.noof_mode,
                placeholder: that.options.noof_placeholder,
                special_character: that.options.noof_special_character,
                half_full_width: that.options.noof_half_full_width,
                is_target: false
            });

            //新增 OfNo TextBox
            that.OfNoTextBox = $(addrTemplate);
            that.element.append(that.OfNoTextBox);
            that.OfNoTextBox.addClass(className);
            that.OfNoTextBox.on("blur" + ns, proxy(that._blur, that));
            that.OfNoTextBox.kendoBestTextBox({
                suffix: that.options.ofno_suffix,
                mode: that.options.ofno_mode,
                placeholder: that.options.ofno_placeholder,
                special_character: that.options.ofno_special_character,
                half_full_width: that.options.ofno_half_full_width,
                is_target: false
            });

            //新增 floor TextBox
            that.FloorTextBox = $(addrofTemplate);
            that.element.append(that.FloorTextBox);
            that.FloorTextBox.addClass(className);
            that.FloorTextBox.on("blur" + ns, proxy(that._blur, that));
            that.FloorTextBox.kendoBestTextBox({
                suffix: that.options.floor_suffix,
                mode: that.options.floor_mode,
                placeholder: that.options.floor_placeholder,
                special_character: that.options.floor_special_character,
                half_full_width: that.options.floor_half_full_width,
                is_target: false
            });

            //新增 floorof TextBox
            that.FloorOfTextBox = $(addrofTemplate);
            that.element.append(that.FloorOfTextBox);
            that.FloorOfTextBox.addClass(className);
            that.FloorOfTextBox.on("blur" + ns, proxy(that._blur, that));
            that.FloorOfTextBox.kendoBestTextBox({
                suffix: that.options.floorof_suffix,
                mode: that.options.floorof_mode,
                placeholder: that.options.floorof_placeholder,
                special_character: that.options.floorof_special_character,
                half_full_width: that.options.floorof_half_full_width,
                is_target: false
            });

            //新增 other TextBox
            that.OtherTextBox = $(otherTemplate);
            that.element.append(that.OtherTextBox);
            that.OtherTextBox.addClass(className);
            that.OtherTextBox.on("blur" + ns, proxy(that._blur, that));
            that.OtherTextBox.kendoBestTextBox({
                suffix: that.options.other_suffix,
                mode: that.options.other_mode,
                placeholder: that.options.other_placeholder,
                special_character: that.options.other_special_character,
                half_full_width: that.options.other_half_full_width,
                is_target: false
            });

            //依據唯讀模式調整控制項
            that._procReadonlyMode();

            //初始就唯讀情況(受整頁唯讀控管)
            if (that.options.readonly_status) {
                that.Breadonly(true);
            }

            //設定必填(必填模式不為N, 皆表示必填, 即使只有一個控制項必填, 還是算有必填存在的狀態)
            if (that.options.required_mode != "N") {
                that.options.required_status = true;
            }

        }

    });

    ui.plugin(GSSAddressBoxFull);

})(jQuery);

