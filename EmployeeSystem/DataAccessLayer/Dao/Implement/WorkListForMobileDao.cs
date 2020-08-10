using System.Collections.Generic;
using DomainObject.DomainObject.TableDomainObject;
using Spring.Data.Common;
using DataAccessLayer.Dao.Interface;
using System.Data;
using WebUtility;
using LogHandler.DomainObject;

namespace DataAccessLayer.Dao.Implement
{
    public class WorkListForMobileDao : BaseDao, IWorkListForMobileDao
    {

        /// <summary>
        /// 依據使用者代碼取得待辦清單資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="userId">使用者代碼</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/04/09   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<WorkListObject> GetWorkListForMobile(LogInfoObject objLogInfo, string userId)
        {
            IDbParameters parameters = CreateDbParameters();

            string sql = @" SELECT
                                    ROWNUM AS DATA_ID
                                    , CUST_NM
                                    , CASE_SN
                                    , CASE_KIND
                                    , APRV_LEVEL_NM
                                    , FLOW_NM
                                    , PREV_TAKER_NM
                                    , RECV_DT
                                    , APPLY_DT
                                    , WKITEM_ID
                                FROM ( 
                                 SELECT   
                                        CUST_NM         
                                        , A.CASE_SN
                                        , FN_GET_CODENM ('002', A.CASE_KIND, '', 'N') AS CASE_KIND
                                        , A.APRV_LEVEL_NM
                                        , B.WKITEM_NAME AS FLOW_NM
                                        , (SELECT PTCP_PRO_NAME
                                                FROM PTCP_TRACK_V
                                                WHERE ROWNUM = 1
                                                    AND WKITEM_ID = B.PRE_WKITEM_ID
                                                    AND PROC_INST_ID = B.PROC_INST_ID) AS PREV_TAKER_NM        
                                        , B.PTCP_RECV_TIME AS RECV_DT   
                                        , B.START_TIME AS APPLY_DT
                                        , B.WKITEM_ID
                                FROM LMCM_CASE_MAIN A INNER JOIN WORKLIST_IV B
                                        ON B.PROC_INST_ID = A.FLOW_INSTANCE_ID
                                        LEFT JOIN
                                        (SELECT INFO.*
                                        FROM LMCF_USER_CASE_TRNS_INFO INFO, CM_C_EMP EMP
                                        WHERE INFO.START_DT <= TO_CHAR (SYSDATE, 'YYYYMMDD')
                                            AND INFO.END_DT > TO_CHAR (SYSDATE, 'YYYYMMDD')
                                            AND INFO.USR_ID = EMP.EMP_NO
                                            AND INFO.USR_OU_ID = EMP.ORG_NO) C
                                        ON A.CASE_SN = C.CASE_SN AND B.PTCP_USR = C.USR_ID
                                WHERE A.CASE_STATUS <> 'S'
                                    AND ((NVL (C.NEW_USRID, B.PTCP_USR) = :PTCP_USR))
                                    AND NVL (A.CANCEL_STATUS, ' ') NOT IN ('00', 'AA')
                                    AND (CASE
                                            WHEN B.PROC_DEF_ID = 'PE'
                                            AND A.APRV_LEVEL_ID > 'A48'
                                            AND B.ACT_DEF_ID = 'A136'
                                            THEN 1
                                            ELSE 2
                                        END
                                        ) = 2
                            ORDER BY VSP_FLAG DESC, B.PTCP_RECV_TIME DESC) ";

            parameters.Add("PTCP_USR", DbType.String).Value = userId;

            return base.QueryWithRowMapperDelegate<WorkListObject>(CommandType.Text, sql, delegate(IDataReader dataReader, int rowNum)
            {
                WorkListObject obj = new WorkListObject();

                obj.DATA_ID = ConvertDBObject.ConvertInt(dataReader["DATA_ID"]);
                obj.CUST_NM = ConvertDBObject.ConvertString(dataReader["CUST_NM"]);
                obj.CASE_SN = ConvertDBObject.ConvertString(dataReader["CASE_SN"]);
                obj.CASE_KND = ConvertDBObject.ConvertString(dataReader["CASE_KIND"]);
                obj.APRV_LEVEL_NM = ConvertDBObject.ConvertString(dataReader["APRV_LEVEL_NM"]);
                obj.FLOW_NM = ConvertDBObject.ConvertString(dataReader["FLOW_NM"]);
                obj.PREV_TAKER_NM = ConvertDBObject.ConvertString(dataReader["PREV_TAKER_NM"]);
                obj.RECV_DT = ConvertDBObject.ConvertDate(dataReader["RECV_DT"]);
                obj.APPLY_DT = ConvertDBObject.ConvertDate(dataReader["APPLY_DT"]);

                return obj;
            }, parameters, objLogInfo);

        }

        /// <summary>
        /// 取得案件的流程編號
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="caseSn">案件編號</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/04/09   1.00   Ben_Tsai Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        public string GetCaseFlowInstanceId(LogInfoObject objLogInfo, string caseSn)
        {
            IDbParameters parameters = CreateDbParameters();
            DataTable dt = new DataTable();
            string flowInstanceId = string.Empty;

            string sql = @" SELECT FLOW_INSTANCE_ID
                                  FROM LMCM_CASE_MAIN
                                 WHERE CASE_SN = :CASE_SN ";

            parameters.Add("CASE_SN", DbType.String).Value = caseSn;

            dt = base.DataTableCreateWithParams(CommandType.Text, sql, parameters, objLogInfo);

            if (dt.Rows.Count > 0)
            {
                flowInstanceId = dt.Rows[0]["FLOW_INSTANCE_ID"].ToString();
            }

            return flowInstanceId;
        }

    }
}
