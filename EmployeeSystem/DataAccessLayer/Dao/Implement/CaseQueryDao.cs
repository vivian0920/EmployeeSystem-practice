using System.Collections.Generic;
using DataAccessLayer.Dao.Interface;
using DomainObject.DomainObject.TableDomainObject;
using System.Data;
using Spring.Data.Common;
using DomainObject.RowMapper.TableRowMapper;
using LogHandler.DomainObject;

namespace DataAccessLayer.Dao.Implement
{
    public class CaseQueryDao : BaseDao, ICaseQueryDao
    {
        /// <summary>
        /// 案件查詢
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="startDT">開始日期</param>
        /// <param name="endDT">結束日期</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/04/15   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<CaseQueryObject> GetCaseQuery(LogInfoObject objLogInfo, string startDT, string endDT)
        {
            IDbParameters parameters = CreateDbParameters();

            string sql = @" SELECT 
                                        CASE_SN,  
                                        1 AS CASE_COUNT,  
                                        Case when HEAD_KIND='PB' THEN FN_GET_STEP_INFO(M.CASE_SN,M.FLOW_TYPE,'A140','PTCP_NM') ELSE CASE_AO_NM END AS CASE_AO_NM, 
                                        CASE_OU_NM, 
                                        FN_GET_CODENM('002',CASE_KIND) AS CASE_KIND, 
                                        WL.WKITEM_NAME AS CASE_STEP , 
                                        APRV_LEVEL_NM, 
                                        CUST_NM
                                        , FN_TO_DATE(APPLY_DT, '1') AS APPLY_DT
                                        , FN_TO_DATE(APPLY_DT, '6') AS APPLY_DT_Y
                                        , SUBSTR(FN_TO_DATE (APPLY_DT, '4'), 5) AS APPLY_DT_M
                                        , (SELECT SUM(LINE_AMT) FROM LMBM_CASE_LINE WHERE CASE_SN = M.CASE_SN ) AS LINE_AMT_CASE
                                        , (SELECT SUM(LINE_AMT) FROM LMBM_CLSV_LINE WHERE CASE_SN = M.CASE_SN ) AS LINE_AMT_CLSV
                                    FROM LMCM_CASE_MAIN M 
                                    LEFT JOIN WORKLIST_IV WL ON M.FLOW_INSTANCE_ID =  WL.PROC_INST_ID 
                                    WHERE 1=1 ";

            if (startDT.Length > 0)
            {
                sql += " AND APPLY_DT >= :APPLY_DT_START ";
                parameters.Add("APPLY_DT_START", DbType.String).Value = startDT;
            }

             if (endDT.Length > 0)
             {
                 sql += " AND APPLY_DT <= :APPLY_DT_END ";
                 parameters.Add("APPLY_DT_END", DbType.String).Value = endDT;
             }
                        
            sql += " ORDER BY CASE_SN,APPLY_DT ";

            return base.QueryWithRowMapper<CaseQueryObject>(CommandType.Text, sql, new CaseQueryRowMapper(), parameters, objLogInfo);

        }
    }
}
