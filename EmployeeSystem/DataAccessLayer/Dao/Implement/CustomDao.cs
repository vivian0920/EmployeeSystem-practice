using System.Collections.Generic;
using DataAccessLayer.Dao.Interface;
using DomainObject.DomainObject.DefinedDomainObject;
using DomainObject.DomainEnum;
using Spring.Data.Common;
using System.Data;
using DomainObject.RowMapper.TableRowMapper;
using System.Text;
using System;
using LogHandler.DomainObject;
using System.Linq;

namespace DataAccessLayer.Dao.Implement
{
    public class CustomDao : BaseDao,ICustomDao
    {


        /// <summary>
        /// 根據傳入的員工資料新增DB
        /// </summary>
        /// <param name="obj">傳入的員工資料</param>
        /// <returns>回傳新增結果成功或失敗</returns>
        public bool InsertCustomer(LogInfoObject objLogInfo, IList<CustomObject> objList)
        {
            IDbParameters parameters = CreateDbParameters();
            CustomObject createObject = new CustomObject();
            bool successOrNot = true;

            //取得資料的數目
            var objAmount = objList.Count();

            //根據Object取得table name來自動產生SQL新增語法
            StringBuilder sql = GenerateSqlCommand.Insert(DBProviderEnum.Oracle, createObject);
            sql.Insert(26, " CUST_ID, CUST_NM, UPD_DT");
            sql.Insert(70, " :CUST_ID, :CUST_NM, TO_DATE(:UPD_DT, 'yyyyMMdd')");

            //加入參數
            for(var i=0;i<objAmount;i++)
            {
                parameters.Add(":CUST_ID", DbType.String).Value = objList[i].CUST_ID;
                parameters.Add(":CUST_NM", DbType.String).Value = objList[i].CUST_NM;
                parameters.Add(":UPD_DT", DbType.String).Value = objList[i].UPD_DT;

                //檢查每次是否新增成功
                if (base.ExecuteNonQuery(CommandType.Text, sql.ToString(), parameters, objLogInfo) != 1)
                {
                    successOrNot = false;
                }
            }
            //若其中一筆資料新增失敗則回傳false
            return successOrNot;

        }



        /// <summary>
        /// 根據傳入資料中的員工id刪除DB
        /// </summary>
        /// <param name="obj">傳入的員工資料</param>
        /// <returns>回傳刪除結果成功或失敗</returns>
        public bool DeleteCustomer(LogInfoObject objLogInfo, CustomObject obj)
        {
            IDbParameters parameters = CreateDbParameters();
            CustomObject createObject = new CustomObject();
           
            //根據Object取得table name來自動產生SQL刪除語法
            StringBuilder sql = GenerateSqlCommand.Delete(DBProviderEnum.Oracle, createObject);

            //刪除語法
            sql.AppendLine(" AND Trim(CUST_ID) = :CUST_ID");
            parameters.Add(":CUST_ID", DbType.String).Value = obj.CUST_ID;

            //回傳被影響的資料數，通常判斷大於0表刪除成功
            return base.ExecuteNonQuery(CommandType.Text, sql.ToString(), parameters, objLogInfo) > 0;

        }


        /// <summary>
        /// 取得員工資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        public IList<CustomObject> GetCustomer(LogInfoObject objLogInfo, IList<CustomObject> objList)
        {
            IDbParameters parameters = CreateDbParameters();
            CustomObject createObject = new CustomObject();
            //取得資料的數目
            var objAmount = objList.Count();

            //根據Object取得table name來自動產生SQL查詢語法
            StringBuilder sql = GenerateSqlCommand.Query(DBProviderEnum.Oracle, createObject);

            //加入SQL的條件(若全部欄位為空則不額外加入條件)
            for (var i = 0; i < objAmount; i++) 
            {
                //檢查欄位是否為空
                bool idEmptyOrNot = !string.IsNullOrEmpty(objList[i].CUST_ID);
                bool nameEmptyOrNot = !string.IsNullOrEmpty(objList[i].CUST_NM);
                bool hireDateEmptyOrNot = !string.IsNullOrEmpty(objList[i].UPD_DT);

                //第一筆資料且所有欄位不得為空
                if (i==0 && (idEmptyOrNot|| nameEmptyOrNot|| hireDateEmptyOrNot))
                {
                    sql.AppendLine("AND(");

                }//其他筆資料
                else if (i!=0 && (idEmptyOrNot || nameEmptyOrNot || hireDateEmptyOrNot))
                {
                    sql.AppendLine("OR(");

                }
                if (idEmptyOrNot)
                {
                    //trim移除字串前後的空白
                    sql.AppendLine(" Trim(CUST_ID) = :CUST_ID"+i);
                    parameters.Add(":CUST_ID"+i, DbType.String).Value = objList[i].CUST_ID;

                }

                if (nameEmptyOrNot)
                {
                    if (idEmptyOrNot) { sql.AppendLine("AND"); }
                    sql.AppendLine(" CUST_NM LIKE '%' || :CUST_NM"+i+" || '%' ");
                    parameters.Add(":CUST_NM"+i, DbType.String).Value = objList[i].CUST_NM;
                }

                if (hireDateEmptyOrNot)
                {
                    if (idEmptyOrNot|| nameEmptyOrNot) { sql.AppendLine("AND"); }
                    sql.AppendLine("TO_CHAR(UPD_DT, 'yyyyMMdd') = :UPD_DT"+i);
                    parameters.Add(":UPD_DT"+i, DbType.String).Value = objList[i].UPD_DT;
                }
                if (idEmptyOrNot || nameEmptyOrNot || hireDateEmptyOrNot) { sql.AppendLine(")"); }

            }
            sql.AppendLine(" ORDER BY UPD_DT DESC ");
            //透過BaseDao連接DB
            return base.QueryWithRowMapper<CustomObject>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<CustomObject>(), parameters, objLogInfo);
        }

        public IList<CustomObject> GetCustomerById(LogInfoObject objLogInfo, List<string> idList) 
        {
            IDbParameters parameters = CreateDbParameters();
            CustomObject createObject = new CustomObject();

            //取得資料的數目
            var objAmount = idList.Count();

            //根據Object取得table name來自動產生SQL查詢語法
            StringBuilder sql = GenerateSqlCommand.Query(DBProviderEnum.Oracle, createObject);

            //將id去資料庫做搜尋
            for (var i = 0; i < objAmount; i++) {
                if (!string.IsNullOrEmpty(idList[i]) && i == 0) {
                    sql.AppendLine("  AND (Trim(CUST_ID) = :CUST_ID" + i);
                    parameters.Add(":CUST_ID" + i, DbType.String).Value = idList[i];
                }
                else if (!string.IsNullOrEmpty(idList[i]) && i != 0)
                {
                    sql.AppendLine("  OR Trim(CUST_ID) = :CUST_ID" + i);
                    parameters.Add(":CUST_ID" + i, DbType.String).Value = idList[i];
                } 
                if (i== (objAmount-1)) {
                    sql.AppendLine(")");
                }
            }


            return base.QueryWithRowMapper<CustomObject>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<CustomObject>(), parameters, objLogInfo);
        }


    
    }
}
