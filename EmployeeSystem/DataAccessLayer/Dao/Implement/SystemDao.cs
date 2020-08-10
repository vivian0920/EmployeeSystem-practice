using System.Collections.Generic;
using DataAccessLayer.Dao.Interface;
using DomainObject.DomainObject.TableDomainObject;
using DomainObject.DomainEnum;
using Spring.Data.Common;
using System.Data;
using DomainObject.RowMapper.TableRowMapper;
using System.Text;
using System;
using LogHandler.DomainObject;

namespace DataAccessLayer.Dao.Implement
{
    public class SystemDao: BaseDao, ISystemDao
    {
        /// <summary>
        /// 取得系統代碼
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <histor>
        /// 2014/09/12   Steven_Chen   Create
        /// </histor>
        public IList<ReCodeObject> GetSystemCode(LogInfoObject objLogInfo, ReCodeObject obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();

            //根據Object來自動產生SQL Comman Script
            sql = GenerateSqlCommand.Query(DBProviderEnum.Oracle ,obj);

            if (obj.CODE_KIND != null)
            {
                sql.AppendLine("    AND CODE_KIND=:CODE_KIND");
            }

            if (obj.CODE_ID != null)
            {
                sql.AppendLine("    AND CODE_ID=:CODE_ID");
            }

            if (obj.PARENT_CODE_ID != null)
            {
                sql.AppendLine("    AND PARAENT_CODE_ID=:PARAENT_CODE_ID");
            }

            sql.AppendLine(" ORDER BY SORT_ORDER");

            parameters = SetParameters(obj);

            return base.QueryWithRowMapper<ReCodeObject>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<ReCodeObject>(), parameters, objLogInfo);
        }

        /// <summary>
        /// 取得系統代碼(Array)
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <histor>
        /// 2014/10/16   Daniel Lee   Create
        /// </histor>
        public IList<ReCodeObject> GetSystemCodeByList(LogInfoObject objLogInfo, ReCodeQueryObject obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();
            Array aryParentCodeId = (Array)obj.PARENT_CODE_ID;

            sql.AppendLine("SELECT CODE_KIND");
            sql.AppendLine("    , CODE_ID ");
            sql.AppendLine("    , CODE_NAME ");
            sql.AppendLine("    , PARENT_CODE_ID ");
            sql.AppendLine("    , MEMO ");
            sql.AppendLine("FROM RE_CODE ");
            sql.AppendLine("WHERE 1=1");

            if (obj.CODE_KIND != null)
            {
                sql.AppendLine("    AND CODE_KIND=:CODE_KIND");
            }

            if (aryParentCodeId.Length > 0)
            {
                sql.AppendLine("    AND PARENT_CODE_ID IN (" + GenerateSqlCommand.ProcIn(DBProviderEnum.Oracle, obj.PARENT_CODE_ID, ref parameters) + ")");
            }

            sql.AppendLine(" ORDER BY SORT_ORDER");

            SetParameters(DBProviderEnum.Oracle, sql.ToString(), obj, ref parameters);

            return base.QueryWithRowMapper<ReCodeObject>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<ReCodeObject>(), parameters, objLogInfo);
        }
    }
}
