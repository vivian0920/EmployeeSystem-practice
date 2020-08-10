using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using LogHandler.DomainObject;

namespace DomainObject.DomainObject
{
    public class ReceiveObject
    {
        /// <summary>
        /// Token
        /// </summary>
        public string Token { get; set; }

        /// <summary>
        /// 目前所在頁面
        /// </summary>
        public string CurrentPath { get; set; }

        /// <summary>
        /// 傳入參數
        /// </summary>
        public object Parameters { get; set; }

        /// <summary>
        /// GridView的參數物件
        /// </summary>
        public object GridParameters { get; set; }

        /// <summary>
        /// GridView 是否初始化的flag
        /// </summary>
        public bool inital { get; set; }

        /// <summary>
        /// LOG訊息物件
        /// </summary>
        public LogInfoObject LogInfoObject { get; set; }
    }
}
