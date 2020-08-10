/// <reference path="../../jQuery/jquery-1.9.1-vsdoc.js" />
/// <reference path="../Data/ControlDefaultsObject.js" />

//功能: StringFormat的Object
//描述: 處理String各Format格式
//歷程: 1. 2014/06/27   1.00   Steven_Chen   Create

var StringFormatObject = function () {
    //日期/時間類
    var DateTime = function () {
        /// <summary>
        /// 日期/時間
        /// </summary>

        //格式化日期
        function formatDate(date, dateFormat, isTwYear) {
            /// <summary>
            /// 格式化日期
            /// </summary>
            /// <param name="date">日期資料 datetime or yyyyMMdd or yyyyMM or yyyy</param>
            /// <param name="dateFormat">日期格式</param>
            /// <param name="isTwYear">是否為民國年格式</param>
            /// <returns type="string">日期</returns>

            var yyyy = 0
                , MM = 0
                , dd = 0
                , finalDate = dateFormat;

            //防呆
            if (date == null) return "";

            //若含有上午下午的日期格式字串, 需要額外做轉換
            if ($.type(date) === "string") {

                //防呆
                if (date.length == 0) return "";

                if (date.indexOf("上午") != -1) {
                    date = date.replace("上午 ", "");
                    date += " AM";
                    date = new Date(date);
                }
                else if (date.indexOf("下午") != -1) {
                    date = date.replace("下午 ", "");
                    date += " PM";
                    date = new Date(date);
                }

            }

            //Step1: 取出對應的年月日
            if ($.type(date) === "date") {

                yyyy = date.getFullYear();
                MM = date.getMonth() + 1;
                dd = date.getDate();

            }
            else {

                switch (date.length) {

                    case 8:
                        //年月日
                        yyyy = parseInt(date.substr(0, 4));
                        MM = parseInt(date.substr(4, 2));
                        dd = parseInt(date.substr(6, 2));
                        break;

                    case 6:
                        //年月
                        yyyy = parseInt(date.substr(0, 4));
                        MM = parseInt(date.substr(4, 2));
                        break;

                    case 4:
                        //年
                        yyyy = parseInt(date.substr(0, 4));
                        break;

                }

            }

            //Step2: 轉成符合現在datepicker設定的format
            finalDate = finalDate.replace("yyyy", isTwYear ? getTWYear(yyyy) : yyyy)
                                 .replace("MM", MM.toString().padLeft(2, "0"))
                                 .replace("dd", dd.toString().padLeft(2, "0"));

            return finalDate;

        }

        //取得民國年
        function getTWYear(adYear) {
            /// <summary>
            /// 取得民國年: 特別調整1912為民國1年, 1911為-1, 1910為-2以此類推
            /// </summary>
            /// <param name="year">西元年</param>
            /// <returns type="number">民國年</returns>

            var twYear = null;

            adYear = $.trim(adYear);

            if (!isNaN(adYear) && adYear != "") {
                twYear = parseInt(adYear) - 1911;

                if (twYear <= 0) {
                    twYear -= 1;
                }
            }
            else {
                twYear = "";
            }

            return twYear;

        }

        //取得西元年
        function getADYear(twYear) {
            /// <summary>
            /// 取得西元年: 特別調整1912為民國1年, -1為1911, -2為1910以此類推
            /// </summary>
            /// <param name="twYear">民國年</param>
            /// <returns type="number">西元年</returns>

            var adYear = null;

            twYear = $.trim(twYear);

            if (!isNaN(twYear) && twYear != "") {
                if (twYear < 0) {
                    adYear = parseInt(twYear) + 1912;
                }
                else {
                    adYear = parseInt(twYear) + 1911;
                }
            }
            else {
                adYear = "";
            }

            return adYear;

        }

        //格式化時間
        function formatTime(date, isTwelveHour) {
            /// <summary>
            /// 格式化時間
            /// </summary>
            /// <param name="date">時間資料 datetime or Hmm</param>
            /// <param name="isTwelveHour">是否為12小時制</param>
            /// <returns type="string">時間</returns>

            var finalTime = ""
                , H = 0
                , mm = 0;

            //防呆
            if (date == null) return "";

            //若含有上午下午的日期格式字串, 需要額外做轉換
            if ($.type(date) === "string") {

                //防呆
                if (date.length == 0) return "";

                if (date.indexOf("上午") != -1) {
                    date = date.replace("上午 ", "");
                    date += " AM";
                    date = new Date(date);
                }
                else if (date.indexOf("下午") != -1) {
                    date = date.replace("下午 ", "");
                    date += " PM";
                    date = new Date(date);
                }

            }

            //Step1: 取出對應的時分
            if ($.type(date) === "date") {

                if (isTwelveHour) {

                    if (date.getHours() >= 12) {
                        finalTime = date.getHours() - 12;
                        finalTime = finalTime == 0 ? "12" : finalTime
                                    + ":" + String(date.getMinutes()).padLeft(2, "0") + " PM";
                    }
                    else {
                        finalTime = date.getHours();
                        finalTime = finalTime == 0 ? "12" : finalTime
                                    + ":" + String(date.getMinutes()).padLeft(2, "0") + " AM";
                    }

                }
                else {
                    finalTime = date.getHours() + ":" + String(date.getMinutes()).padLeft(2, "0");
                }

            }
            else {

                //時間格式為Hmm, 如: 0700, 2300
                H = parseInt(date.substr(0, 2), 10);
                mm = parseInt(date.substr(2, 2), 10);

                if (isTwelveHour) {

                    if (H >= 12) {
                        finalTime = H - 12;
                        finalTime = finalTime == 0 ? "12" : finalTime
                                    + ":" + String(mm).padLeft(2, "0") + " PM";
                    }
                    else {
                        finalTime = H;
                        finalTime = finalTime == 0 ? "12" : finalTime
                                    + ":" + String(mm).padLeft(2, "0") + " AM";
                    }

                }
                else {
                    finalTime = H + ":" + String(mm).padLeft(2, "0");
                }

            }

            return finalTime;

        }

        return {
            FormatDate: formatDate,
            GetTWYear: getTWYear,
            GetADYear: getADYear,
            FormatTime: formatTime
        };

    }();

    //數字類
    var Numeric = function () {
        /// <summary>
        /// Number
        /// </summary>

        //Ceil
        function procCeil(value, decimals) {
            /// <summary>
            /// 無條件進位
            /// </summary>
            /// <param name="value">Source Value</param>
            /// <param name="decimals">小數位</param>
            /// <returns type=""></returns>
            decimals = decimals || 0;

            value = value.toString().split('e');
            value = Math.ceil(+(value[0] + 'e' + (value[1] ? (+value[1] + decimals) : decimals)));

            value = value.toString().split('e');
            value = +(value[0] + 'e' + (value[1] ? (+value[1] - decimals) : -decimals));

            return value;
        }

        //Currency
        function procCurrency(value, decimals, carry_method, unit) {
            /// <summary>
            /// 處理Currency
            /// </summary>
            /// <param name="value">Source Value</param>
            /// <param name="decimals">小數位(預設為NumericTextBox的decimals)</param>
            /// <param name="carry_method">進位方式(預設為NumericTextBox的carry_method)</param>
            /// <param name="unit">單位(預設為1)</param>
            var decimals = decimals || ControlDefaultsObject.NumericTextBox.decimals,
                carry_method = carry_method || ControlDefaultsObject.NumericTextBox.carry_method,
                unit = unit || 1;

            if (value != null) {
                switch (carry_method) {
                    case "Round":
                        return procRound(value / unit, decimals);
                        break;
                    case "Floor":
                        return procFloor(value / unit, decimals);
                        break;
                    case "Ceil":
                        return procCeil(value / unit, decimals);
                        break;
                }
            }
        }

        //Floor
        function procFloor(value, decimals) {
            /// <summary>
            /// 無條件捨去
            /// </summary>
            /// <param name="value">Source Value</param>
            /// <param name="decimals">小數位</param>
            /// <returns type=""></returns>
            decimals = decimals || 0;

            value = value.toString().split('e');
            value = Math.floor(+(value[0] + 'e' + (value[1] ? (+value[1] + decimals) : decimals)));

            value = value.toString().split('e');
            value = +(value[0] + 'e' + (value[1] ? (+value[1] - decimals) : -decimals));

            return value;
        }

        //Percent
        function procPercent(value, decimals, carry_method) {
            /// <summary>
            /// 處理Percent
            /// </summary>
            /// <param name="value">Source Value</param>
            /// <param name="decimals">小數位(預設為NumericTextBox的decimals)</param>
            /// <param name="carry_method">進位方式(預設為NumericTextBox的carry_method)</param>
            var decimals = decimals || ControlDefaultsObject.NumericTextBox.decimals,
                carry_method = carry_method || ControlDefaultsObject.NumericTextBox.carry_method,
                unit = 100;

            if (value != null) {
                switch (carry_method) {
                    case "Round":
                        return procRound(value * unit, decimals);
                        break;
                    case "Floor":
                        return procFloor(value * unit, decimals);
                        break;
                    case "Ceil":
                        return procCeil(value * unit, decimals);
                        break;
                }
            }
        }

        //Round
        function procRound(value, decimals) {
            /// <summary>
            /// 四捨五入
            /// </summary>
            /// <param name="value">Source Value</param>
            /// <param name="decimals">小數位</param>
            /// <returns type=""></returns>
            decimals = decimals || 0;

            value = value.toString().split('e');
            value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + decimals) : decimals)));

            value = value.toString().split('e');
            value = +(value[0] + 'e' + (value[1] ? (+value[1] - decimals) : -decimals));

            return value;
        }

        return {
            Ceil: procCeil,
            Currency: procCurrency,
            Floor: procFloor,
            Percent: procPercent,
            Round: procRound
        }
    }();

    return {
        DateTime: DateTime,
        Numeric: Numeric
    }

}();