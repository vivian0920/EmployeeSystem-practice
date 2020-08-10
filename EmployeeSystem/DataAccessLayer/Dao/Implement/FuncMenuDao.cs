using System.Collections.Generic;
using DataAccessLayer.Dao.Interface;
using DomainObject.DomainObject.TableDomainObject;
using Spring.Data.Common;
using System.Data;
using DomainObject.RowMapper.TableRowMapper;
using LogHandler.DomainObject;

namespace DataAccessLayer.Dao.Implement
{
    public class FuncMenuDao : BaseDao, IFuncMenuDao
    {
        /// <summary>
        /// 依據使用者代碼取得其功能列
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="userId">使用者代碼</param>
        /// <param name="apId">系統代碼</param>
        /// <returns></returns>
        /// <histor>
        /// 1. 2014/02/21   1.00   Ben_Tsai   Create
        /// </histor>
        public IList<FuncMenuObject> GetFuncMenu(LogInfoObject objLogInfo, string userId, string apId)
        {
            IDbParameters parameters = CreateDbParameters();

            string sql = @" SELECT DISTINCT
                                        FUNC.FUN_ID
                                        , FUNC.FUN_NAME
                                        , FUNC.PRG_PATH
                                        , FUNC.PARENT_FUN_ID
                                        , FUNC.SORT_ORDER
                                    FROM SCREL_ROL_USRM SRU
                                    INNER JOIN SCREL_ROL_RGTM SRR
                                        ON SRU.ROL_ID = SRR.ROL_ID
                                    INNER JOIN SCREL_RGT_FUNM SRF
                                        ON SRR.RGT_AP_ID = SRF.RGT_AP_ID
                                        AND SRR.RGT_ID = SRF.RGT_ID   
                                    INNER JOIN SCFUNCTIONM FUNC
                                        ON SRF.FUN_AP_ID = FUNC.AP_ID
                                        AND SRF.FUN_ID = FUNC.FUN_ID     
                                    WHERE SRU.USR_ID = :USR_ID
                                        AND SRR.RGT_AP_ID = :RGT_AP_ID
                                    ORDER BY FUNC.SORT_ORDER ";

            parameters.Add("USR_ID", DbType.String).Value = userId;
            parameters.Add("RGT_AP_ID", DbType.String).Value = apId;

            return base.QueryWithRowMapper<FuncMenuObject>(CommandType.Text, sql, new FuncMenuRowMapper(), parameters, objLogInfo);
        }
    }
}
