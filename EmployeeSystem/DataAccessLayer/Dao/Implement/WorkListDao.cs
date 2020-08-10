using System.Collections.Generic;
using DataAccessLayer.Dao.Interface;
using DomainObject.DomainObject.TableDomainObject;
using System.Data;
using DomainObject.RowMapper.TableRowMapper;
using Spring.Data.Common;
using LogHandler.DomainObject;

namespace DataAccessLayer.Dao.Implement
{
    public class WorkListDao : BaseDao, IWorkListDao
    {
        /// <summary>
        /// 依據使用者代碼取得待辦清單資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="userId">使用者代碼</param>
        /// <param name="sort">排序字串</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/04/09   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<WorkListObject> GetWorkList(LogInfoObject objLogInfo, string userId, string sort)
        {
            IDbParameters parameters = CreateDbParameters();

            string sql = @" SELECT
                                    ROWNUM AS DATA_ID
                                    , APPLY_FLAG
                                    , FLOW_NM
                                    , STEP_NM
                                    , BRCH_NM
                                    , AO_NM
                                    , CASE_SN
                                    , CUST_NM
                                    , CASE_KND
                                    , APPLY_AMT
                                    , PREV_TAKER_NM
                                    , RECV_DT
                                    , FLOW_TYPE
                                    , STEP_ID
                                    , CUST_ID
                                    , IDENTITY
                                    , CASE_KIND
                                    , AUTH_KND
                                    , DOSSIER
                                    , STATUS
                                  FROM (
                                    SELECT      
                                        NVL (DECODE (A.REJ_APPLY_FLG,
                                                     '1', '撤件',
                                                     '2', '撤件審核',
                                                     DECODE (A.CLOAN_FLG, '1', '撥款前變更', NULL)
                                                    ),
                                             DECODE (A.RETURN_FLG, '1', '退件', NULL)
                                            )
                                            || FN_GET_REPAIR_STATUS (C.CASE_SN, B.STEP_ID) AS APPLY_FLAG,
                                     FN_GETCODE ('002', C.FLOW_TYPE, '') AS FLOW_NM,
                                     B.STEP_ID_NM
                                        || FN_OPNSTATUS425 (A.CASE_SN, A.FLOW_TYPE, B.STEP_ID, 'DESC')
                                        AS STEP_NM,
                                     FN_GETUNIT_NM (C.BRCH_ID) AS BRCH_NM,
                                     FN_GETUSER_NM (C.AO_ID) AS AO_NM, 
                                     B.CASE_SN, 
                                     C.APPLY_NM AS CUST_NM,
                                     A.CASE_KND_NM
                                        || FN_GETCODE ('037', C.PRDT_GRP, '')
                                        || FN_GETCODE ('012', C.APRV_CODE, '') AS CASE_KND,
                                     C.APPLY_AMT / 1000 AS APPLY_AMT,
                                     FN_GETUSER_NM (B.PREV_TAKER_ID) AS PREV_TAKER_NM, 
                                     B.RECV_DT, 
                                     B.FLOW_TYPE,
                                     B.STEP_ID, 
                                     C.APPLY_ID AS CUST_ID, 
                                     B.IDENTITY,
                                     C.CASE_KND AS CASE_KIND, 
                                     FN_GET_AUTH_KND (C.CASE_SN) AS AUTH_KND,
                                     FN_GETCODE ('368', DOSSIER, '') AS DOSSIER,
                                     FN_GET_REPAIR_STATUS (C.CASE_SN, B.STEP_ID || 'A') AS STATUS
                                FROM LMCM_CASE_MAIN A,
                                     LMCM_CASE_OPN B,
                                     LMPM_CASE_MAIN C,
                                     LMPM_CASE_REPAIR D
                               WHERE B.IDENTITY = D.OPN_IDENTITY(+)
                                 AND B.TRNS_DT_CHAR = '00000000000000'
                                 AND B.INSTANCE_TYPE = '1'
                                 AND B.RECV_TAKER_ID = :RECV_TAKER_ID
                                 AND B.CASE_SN = A.CASE_SN(+)
                                 AND B.FLOW_TYPE = A.FLOW_TYPE(+)
                                 AND B.CASE_SN = C.CASE_SN(+)
                                 AND B.FLOW_TYPE = C.FLOW_TYPE(+)
                            ORDER BY B.RECV_DT) ";

            parameters.Add("RECV_TAKER_ID", DbType.String).Value = userId;

            return base.QueryWithRowMapper<WorkListObject>(CommandType.Text, sql, new WorkListRowMapper(), parameters, objLogInfo);
        }

    }
}
