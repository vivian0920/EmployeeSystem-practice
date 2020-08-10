using System.Collections.Generic;
using Spring.Data.Generic;
using Spring.Data.Common;
using System.Data;
using LogHandler;
using LogHandler.DomainObject;
using WebUtility;
using System.Reflection;
using System.Text;
using System;
using DomainObject.DomainEnum;
using System.Web;

namespace DataAccessLayer.Dao.Implement
{
    public class BaseDao : AdoDaoSupport
    {
        #region Property

        /// <summary>
        /// 紀錄Log
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        private LogController LogController
        {
            get
            {
                return new LogController();
            }
        }
        #endregion

        #region SQL Command Method

        /// <summary>
        /// SQL查詢(無SQL參數)
        /// </summary>
        /// <param name="cmdType">指令型別</param>
        /// <param name="cmdText">sql語法</param>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <returns>sql查詢方法取得資料列(DataTable)</returns>
        /// <histor>
        /// 1. 2014/08/18   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞LOG訊息物件
        /// </histor>
        public DataTable DataTableCreate(CommandType commandType, string sql, LogInfoObject objLogInfo)
        {
            objLogInfo.SQL = sql;
            LogController.WriteInfoLog(objLogInfo);
            return this.AdoTemplate.ClassicAdoTemplate.DataTableCreate(commandType, sql);
        }

        /// <summary>
        /// SQL查詢(有SQL參數)
        /// </summary>
        /// <param name="cmdType">指令型別</param>
        /// <param name="cmdText">sql語法</param>
        /// <param name="parameters">SQL參數</param>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <returns>sql查詢方法取得資料列(DataTable)</returns>
        /// <histor>
        /// 1. 2014/08/18   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞LOG訊息物件
        /// </histor>
        public DataTable DataTableCreateWithParams(CommandType commandType, string sql, IDbParameters parameters, LogInfoObject objLogInfo)
        {
            objLogInfo.SQL = this.ConvertDBParameters(sql, parameters);
            LogController.WriteInfoLog(objLogInfo);
            return this.AdoTemplate.ClassicAdoTemplate.DataTableCreateWithParams(commandType, sql, parameters);
        }

        /// <summary>
        /// SQL查詢(無SQL參數)
        /// </summary>
        /// <typeparam name="T">泛型</typeparam>
        /// <param name="cmdType">指令型別</param>
        /// <param name="cmdText">sql語法</param>
        /// <param name="rowMapper">自行定義的mapping object</param>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <returns>透過spring.net提供的sql查詢方法取得資料列</returns>
        /// <histor>
        /// 1. 2014/08/15   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞LOG訊息物件
        /// </histor>
        public IList<T> QueryWithRowMapper<T>(CommandType cmdType, string cmdText, IRowMapper<T> rowMapper, LogInfoObject objLogInfo)
        {
            objLogInfo.SQL = cmdText;
            LogController.WriteInfoLog(objLogInfo);
            return this.AdoTemplate.QueryWithRowMapper<T>(CommandType.Text, cmdText, rowMapper);
        }

        /// <summary>
        /// SQL查詢(有SQL參數)
        /// </summary>
        /// <typeparam name="T">泛型</typeparam>
        /// <param name="cmdType">指令型別</param>
        /// <param name="cmdText">SQL語法</param>
        /// <param name="rowMapper">自行定義的mapping object</param>
        /// <param name="parameters">SQL參數</param>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <returns>透過spring.net提供的sql查詢方法取得資料列</returns>
        /// <histor>
        /// 1. 2014/08/15   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞LOG訊息物件
        /// </histor>
        public IList<T> QueryWithRowMapper<T>(CommandType cmdType, string cmdText, IRowMapper<T> rowMapper, IDbParameters parameters, LogInfoObject objLogInfo)
        {
            objLogInfo.SQL = this.ConvertDBParameters(cmdText, parameters);
            LogController.WriteInfoLog(objLogInfo);
            return this.AdoTemplate.QueryWithRowMapper<T>(CommandType.Text, cmdText, rowMapper, parameters);
        }

        /// <summary>
        /// SQL查詢(無SQL參數)
        /// </summary>
        /// <typeparam name="T">泛型</typeparam>
        /// <param name="cmdType">指令型別</param>
        /// <param name="cmdText">SQL語法</param>
        /// <param name="rowMapperDelegate">自行定義的mapping object</param>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <returns>透過spring.net提供的sql查詢方法取得資料列</returns>
        /// <histor>
        /// 1. 2014/08/15   1.00   Ben_Tsai   Create
        /// </histor>
        public IList<T> QueryWithRowMapperDelegate<T>(CommandType cmdType, string cmdText, RowMapperDelegate<T> rowMapperDelegate, LogInfoObject objLogInfo)
        {
            objLogInfo.SQL = cmdText;
            LogController.WriteInfoLog(objLogInfo);
            return this.AdoTemplate.QueryWithRowMapperDelegate<T>(cmdType, cmdText, rowMapperDelegate);
        }

        /// <summary>
        /// SQL查詢(有SQL參數)
        /// </summary>
        /// <typeparam name="T">泛型</typeparam>
        /// <param name="cmdType">指令型別</param>
        /// <param name="cmdText">SQL語法</param>
        /// <param name="rowMapperDelegate">自行定義的mapping object</param>
        /// <param name="parameters">SQL參數</param>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <returns>透過spring.net提供的sql查詢方法取得資料列</returns>
        /// <histor>
        /// 1. 2014/08/15   1.00   Ben_Tsai   Create
        /// </histor>
        public IList<T> QueryWithRowMapperDelegate<T>(CommandType cmdType, string cmdText, RowMapperDelegate<T> rowMapperDelegate, IDbParameters parameters, LogInfoObject objLogInfo)
        {
            objLogInfo.SQL = this.ConvertDBParameters(cmdText, parameters);
            LogController.WriteInfoLog(objLogInfo);
            return this.AdoTemplate.QueryWithRowMapperDelegate<T>(cmdType, cmdText, rowMapperDelegate, parameters);
        }

        /// <summary>
        /// 執行SQL語法(無SQL參數)
        /// </summary>
        /// <param name="cmdType">指令型別</param>
        /// <param name="cmdText">SQL語法</param>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <returns>透過spring.net提供的sql執行方法取得影響資料的筆數</returns>
        /// <histor>
        /// 1. 2014/08/15   1.00   Ben_Tsai   Create
        /// </histor>
        public int ExecuteNonQuery(CommandType cmdType, string cmdText, LogInfoObject objLogInfo)
        {
            objLogInfo.SQL = cmdText;
            LogController.WriteInfoLog(objLogInfo);
            return this.AdoTemplate.ExecuteNonQuery(cmdType, cmdText);
        }

        /// <summary>
        /// 執行SQL語法(有SQL參數)
        /// </summary>
        /// <param name="cmdType">指令型別</param>
        /// <param name="cmdText">SQL語法</param>
        /// <param name="parameters">SQL參數</param>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <returns>透過spring.net提供的sql執行方法取得影響資料的筆數</returns>
        /// <histor>
        /// 1. 2014/08/15   1.00   Ben_Tsai   Create
        /// </histor>
        public int ExecuteNonQuery(CommandType cmdType, string cmdText, IDbParameters parameters, LogInfoObject objLogInfo)
        {
            objLogInfo.SQL = this.ConvertDBParameters(cmdText, parameters);
            LogController.WriteInfoLog(objLogInfo);
            return this.AdoTemplate.ExecuteNonQuery(cmdType, cmdText, parameters);
        }
        #endregion

        #region Generate SQL Parameter

        /// <summary>
        /// 根據object來設定參數
        /// </summary>
        /// <param name="obj">資料物件</param>
        /// <history>
        /// 2014/09/18  Steven_Chen Create
        /// </history>
        public IDbParameters SetParameters(object obj)
        {
            IDbParameters objParameter = CreateDbParameters();

            foreach (PropertyInfo objItem in obj.GetType().GetProperties())
            {
                if (objItem.GetValue(obj, null) != null && objItem.Name != "TABLE_NAME")
                {
                    objParameter.Add(objItem.Name, ConvertDbType.GetDbType(objItem.PropertyType.Name)).Value = objItem.GetValue(obj, null);
                }
            }

            return objParameter;
        }

        /// <summary>
        /// 根據SQL語法,將object裡的資料設定成參數
        /// </summary>
        /// <param name="strSql">SQL語法</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 2014/09/30  Steven_Chen Create
        /// </history>
        public void SetParameters(DBProviderEnum DbProvider, string strSql, object obj, ref IDbParameters parameters)
        {
            string strTag = GetParameterTag(DbProvider);  

            foreach (PropertyInfo objItem in obj.GetType().GetProperties())
            {
                if (strSql.IndexOf(strTag + objItem.Name) >= 0 && objItem.GetValue(obj, null) != null)
                {
                    
                    parameters.Add(objItem.Name, ConvertDbType.GetDbType(objItem.PropertyType.Name)).Value = objItem.GetValue(obj, null);
                }   
            }
        }
        
        #endregion

        #region Generate SQL Command Script
        /// <summary>
        /// 自動產生SQL Comman Script(for 單一Table)
        /// </summary>
        /// <history>
        /// 2014/09/18  Steven_Chen Create
        /// </history>
        public class GenerateSqlCommand
        {
            /// <summary>
            /// Query
            /// </summary>
            /// <param name="DbProvider">DBProviderEnum</param>
            /// <param name="obj">資料物件</param>
            /// <returns></returns>
            /// <history>
            /// 2014/09/18  Steven_Chen Create
            /// </history>
            public static StringBuilder Query(DBProviderEnum DbProvider, object obj)
            {
                BaseDao objBaseDao = new BaseDao();
                StringBuilder strSql = new StringBuilder();
                string strTableName=string.Empty;
                string strTableNoLock = objBaseDao.GetTableNoLock(DbProvider);
                int index = 0;

                strSql.AppendLine("SELECT ");

                foreach (PropertyInfo objItem in obj.GetType().GetProperties())
                {
                    //將TABLE_NAME記錄至strTableName中
                    if (objItem.Name == "TABLE_NAME")
                    {
                        strTableName = objItem.GetValue(obj, null).ToString();
                    }
                    else
                    {
                        if (index == 0)
                        {
                            strSql.AppendLine(" " + objItem.Name + " ");
                        }
                        else
                        {
                            strSql.AppendLine(" , " + objItem.Name + " ");
                        }

                        index = 1;
                    }

                    
                }

                strSql.AppendLine("FROM "+strTableName + strTableNoLock + "");
                strSql.AppendLine("WHERE 1=1");

                return strSql;
            }

            /// <summary>
            /// Insert
            /// </summary>
            /// <param name="DbProvider">DBProviderEnum</param>
            /// <param name="obj">資料物件</param>
            /// <returns></returns>
            /// <history>
            /// 2014/09/19  Steven_Chen Create
            /// </history>
            public static StringBuilder Insert(DBProviderEnum DbProvider, object obj)
            {
                BaseDao objBaseDao = new BaseDao();
                StringBuilder strSql = new StringBuilder();
                string strTableName=string.Empty;
                string strTag = objBaseDao.GetParameterTag(DbProvider);
                StringBuilder strFieldName=new StringBuilder();
                StringBuilder strParameter=new StringBuilder();
                int index = 0;

                //解析資料
                foreach (PropertyInfo objItem in obj.GetType().GetProperties())
                {
                    //將TABLE_NAME記錄至strTableName中
                    if (objItem.Name == "TABLE_NAME")
                    {
                        strTableName = objItem.GetValue(obj, null).ToString();
                    }
                    else
                    {
                        if (objItem.GetValue(obj, null) != null && objItem.Name != "TABLE_NAME" && objItem.Name !="CREATE_DATE")
                        {
                            if (index == 0)
                            {
                                strFieldName.AppendLine("     " + objItem.Name);
                                strParameter.AppendLine("     " + strTag + objItem.Name);
                            }
                            else
                            {
                                strFieldName.AppendLine("   , " + objItem.Name);
                                strParameter.AppendLine("   , " + strTag + objItem.Name);
                            }
                            index = 1;
                        }       
                    }                    
                }

                //自動新增CREATE_DATE
                if (strFieldName.Length > 0 && strParameter.Length > 0)
                {
                    strFieldName.AppendLine("   , CREATE_DATE");
                    strParameter.AppendLine("   , SYSDATE");
                }                

                strSql.AppendLine("INSERT INTO "+ strTableName+" ");
                strSql.AppendLine(" ( ");
                strSql.AppendLine(strFieldName.ToString());
                strSql.AppendLine(" )");
                strSql.AppendLine("VALUES");
                strSql.AppendLine(" ( ");
                strSql.AppendLine(strParameter.ToString());
                strSql.AppendLine(" )");                

                return strSql;
            }

            /// <summary>
            /// Delete
            /// </summary>
            /// <param name="DbProvidr">DBProviderEnum</param>
            /// <param name="obj">資料物件</param>
            /// <returns></returns>
            /// <history>
            /// 2014/10/27  Steven_Chen Create
            /// </history>
            public static StringBuilder Delete(DBProviderEnum DbProvidr, object obj)
            {
                StringBuilder strSql = new StringBuilder();
                string strTableName = string.Empty;

                foreach (PropertyInfo objItem in obj.GetType().GetProperties())
                {
                    if (objItem.Name == "TABLE_NAME")
                    {
                        strTableName = objItem.GetValue(obj, null).ToString();
                    }
                }

                strSql.AppendLine("DELETE "+ strTableName);
                strSql.AppendLine("WHERE 1=1 ");

                return strSql;
            }

            public static string ProcIn(DBProviderEnum DbProvider, Array ary, ref IDbParameters parameters)
            {
                BaseDao objBaseDao=new BaseDao();
                string strTag = objBaseDao.GetParameterTag(DbProvider);
                string strParameters = string.Empty;
                string strParaName = "P_" + Singleton.GetParaName();
                Int32 index = 0;

                foreach (object objItem in ary)
                {
                    //當不為第一筆資料時,需加上","來分隔
                    if (index > 0)
                    {
                        strParameters += ", ";
                    }

                    //串Parameter
                    strParameters += strTag + strParaName + "_" + index;

                    parameters.Add(strParaName + "_" + index, ConvertDbType.GetDbType(objItem.GetType().Name)).Value = objItem;

                    index++;
                }

                return strParameters;
            } 
        }
        #endregion

        #region Generate RowMapper
        public class GenerateRowMapper<T> : IRowMapper<T>
        {
            /// <summary>
            /// Maps the row.
            /// </summary>
            /// <param name="dataReader">The data reader.</param>
            /// <param name="rowNum">The row num.</param>
            /// <returns></returns>
            /// <history>
            /// 2014/09/23  Steven_Chen Create
            /// </history>
            public T MapRow(IDataReader dataReader, int rowNum)
            {
                object obj = Activator.CreateInstance(typeof(T));
                return (T)RowMapperHelp.GetRowMapperObject(obj, dataReader);
            }
        }
        #endregion        

        #region Singleton
        /// <summary>
        /// Singleton物件
        /// </summary>
        public sealed class Singleton
        {
            private static object syncRoot = new Object();

            /// <summary>
            /// 取得參數名稱
            /// </summary>
            /// <returns></returns>
            /// <history>
            /// 2014/10/01  Steven_Chen Create
            /// </history>
            public static string GetParaName()
            {
                string strParaName = string.Empty;
                string strReady = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                int intBits = 8;                

                lock (syncRoot)
                {
                    Guid gid = Guid.NewGuid();
                    char[] rtn = new char[intBits];     
   
                    var ba = gid.ToByteArray();

                    for (int i = 0; i < intBits; i++)
                    {
                        rtn[i] = strReady[((ba[i] + ba[intBits+i]) % 61)];
                    }

                    foreach (char item in rtn)
                    {
                        strParaName += item;
                    }

                }

                return strParaName;
            }
        }
        #endregion        

        #region Private Method

        /// <summary>
        /// 將DB參數合併至SQL語法
        /// </summary>
        /// <param name="sql">SQL語法</param>
        /// <param name="parameters">DB參數</param>
        /// <returns>合併後SQL語法</returns>
        /// <histor>
        /// 1. 2014/02/21   1.00   Ben_Tsai   Create
        /// </histor>
        private string ConvertDBParameters(string sql, IDbParameters parameters)
        {
            for (int i = 0; i < parameters.Count; i++)
            {
                if (sql.IndexOf(parameters[i].ParameterName) > -1)
                {
                    switch (parameters[i].DbType)
                    {
                        case DbType.String:
                        case DbType.Date:
                        case DbType.DateTime:
                            sql = sql.Replace(":" + parameters[i].ParameterName, "'" + parameters[i].Value.ToString() + "'");
                            break;
                        default:
                            sql = sql.Replace(":" + parameters[i].ParameterName, parameters[i].Value.ToString());
                            break;
                    }
                }
            }

            return sql;
        }

        /// <summary>
        /// 取得參數的Tag
        /// </summary>
        /// <param name="DbProvider">DB的Provider</param>
        /// <returns>string</returns>
        /// <history>
        /// 2014/10/01  Steven_Chen Create
        /// </history>
        private string GetParameterTag(DBProviderEnum DbProvider)
        {
            string strTag = string.Empty;

            //根據DbProvider來定義Parameter變數Tag
            switch (DbProvider)
            {
                case DBProviderEnum.Oracle:
                    strTag= ":";
                    break;
                case DBProviderEnum.MSSQL:
                    strTag= "@";
                    break;
                default:
                    break;
            }

            return strTag;
        }

        /// <summary>
        /// 取得DB Table是否需加上 WITH NOLOCK
        /// </summary>
        /// <param name="DbProvider">DB的Provider</param>
        /// <returns></returns>
        /// <history>
        /// 2014/10/01  Steven_Chen Create
        /// </history>
        private string GetTableNoLock(DBProviderEnum DbProvider)
        {
            string strNoLock = string.Empty;

            switch (DbProvider)
            {
                case DBProviderEnum.Oracle:
                    strNoLock = string.Empty;
                    break;
                case DBProviderEnum.MSSQL:
                    strNoLock = " WITH (NOLOCK)";
                    break;
                default:
                    break;
            }

            return strNoLock;
        }        

        #endregion
    }
}
