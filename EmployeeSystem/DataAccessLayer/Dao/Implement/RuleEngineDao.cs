using System.Collections.Generic;
using DataAccessLayer.Dao.Interface;
using DomainObject.DomainObject.TableDomainObject;
using DomainObject.DomainObject.DefinedDomainObject;
using DomainObject.DomainEnum;
using Spring.Data.Common;
using System.Data;
using DomainObject.RowMapper.TableRowMapper;
using System.Text;
using System;
using LogHandler.DomainObject;

namespace DataAccessLayer.Dao.Implement
{
    public class RuleEngineDao : BaseDao, IRuleEngineDao
    {
        /// <summary>
        /// 取得資料集資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/18  Steven_Chen Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<ReDataSetObject> GetDataSet(LogInfoObject objLogInfo, ReDataSetObject obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();

            sql = GenerateSqlCommand.Query(DBProviderEnum.Oracle, obj);

            if (obj.DATASET_ID != null)
            {
                sql.AppendLine("    AND DATASET_ID=:DATASET_ID ");
            }

            if (obj.STATUS != null)
            {
                sql.AppendLine("    AND STATUS=:STATUS ");
            }

            return base.QueryWithRowMapper<ReDataSetObject>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<ReDataSetObject>(), parameters, objLogInfo);
        }

        /// <summary>
        /// 取得規則主檔資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/11/06  Steven_Chen Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<ReRuleObject> GetReRule(LogInfoObject objLogInfo, ReRuleObject obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();

            sql = GenerateSqlCommand.Query(DBProviderEnum.Oracle, obj);

            if (obj.RULE_ID != null)
            {
                sql.AppendLine("    AND RULE_ID=:RULE_ID ");
            }

            if (obj.RULE_VERSION != null)
            {
                sql.AppendLine("    AND RULE_VERSION=:RULE_VERSION ");
            }

            SetParameters(DBProviderEnum.Oracle, sql.ToString(), obj, ref parameters);

            return base.QueryWithRowMapper<ReRuleObject>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<ReRuleObject>(), parameters, objLogInfo);
        }

        /// <summary>
        /// 新增規則主檔資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <history>
        /// 1. 2014/09/19  Steven_Chen Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public void InsertReRule(LogInfoObject objLogInfo, ReRuleObject obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();

            sql = GenerateSqlCommand.Insert(DBProviderEnum.Oracle, obj);
            SetParameters(DBProviderEnum.Oracle, sql.ToString(), obj, ref parameters);
            base.ExecuteNonQuery(CommandType.Text, sql.ToString(), parameters, objLogInfo);
        }

        /// <summary>
        /// 更新規則主檔資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <history>
        /// 1. 2014/10/27  Steven_Chen Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public void UpdateReRule(LogInfoObject objLogInfo, ReRuleObject obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();
            StringBuilder strUpdateColumn = new StringBuilder();

            if (obj.RULE_NAME != null)
            {
                strUpdateColumn.AppendLine(", RULE_NAME = :RULE_NAME ");
            }

            if (obj.RULE_DESCRIPTION != null)
            {
                strUpdateColumn.AppendLine(", RULE_DESCRIPTION = :RULE_DESCRIPTION ");
            }

            if (obj.STATUS != null)
            {
                strUpdateColumn.AppendLine(", STATUS = :STATUS ");
            }

            if (obj.START_DATE != null)
            {
                strUpdateColumn.AppendLine(", START_DATE = :START_DATE ");
            }

            if (obj.END_DATE != null)
            {
                strUpdateColumn.AppendLine(", END_DATE = :END_DATE ");
            }

            if (obj.DATASET_ID != null)
            {
                strUpdateColumn.AppendLine(", DATASET_ID = :DATASET_ID ");
            }

            strUpdateColumn.AppendLine(", UPDATE_USER = :UPDATE_USER ");
            strUpdateColumn.AppendLine(", UPDATE_DATE = SYSDATE ");

            sql.AppendLine("UPDATE RE_RULE ");
            sql.AppendLine("    SET ");
            sql.AppendLine(strUpdateColumn.ToString().TrimStart(','));         
            sql.AppendLine("WHERE 1=1 ");

            if (obj.RULE_ID != null)
            {
                sql.AppendLine("    AND RULE_ID = :RULE_ID ");
            }

            if (obj.RULE_VERSION != null)
            {
                sql.AppendLine("    AND RULE_VERSION = :RULE_VERSION ");
            }

            SetParameters(DBProviderEnum.Oracle, sql.ToString(), obj, ref parameters);
            base.ExecuteNonQuery(CommandType.Text, sql.ToString(), parameters, objLogInfo);
        }

        /// <summary>
        /// 刪除規則主檔資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <history>
        /// 1. 2014/10/16  Steven_Chen Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public void DeleteReRule(LogInfoObject objLogInfo, ReRuleObject obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();

            sql = GenerateSqlCommand.Delete(DBProviderEnum.Oracle, obj);

            if (obj.RULE_ID != null)
            {
                sql.AppendLine("    AND RULE_ID = :RULE_ID ");
            }

            if (obj.RULE_VERSION != null)
            {
                sql.AppendLine("    AND RULE_VERSION = :RULE_VERSION ");
            }

            SetParameters(DBProviderEnum.Oracle, sql.ToString(), obj, ref parameters);
            base.ExecuteNonQuery(CommandType.Text, sql.ToString(), parameters, objLogInfo);
        }

        /// <summary>
        /// 取得規則清單
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/23  Steven_Chen Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<RuleEngineObject_RuleList> GetRuleList(LogInfoObject objLogInfo, RuleEngineObject_RuleQuery obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();
            string sqlIntervalDate = string.Empty;
            Array aryDatasetId = (Array)obj.DATASET_ID;
            Array aryStatus = (Array)obj.STATUS;

            sql.AppendLine("SELECT ");
            sql.AppendLine("    A.RULE_ID ");
            sql.AppendLine("    , A.RULE_VERSION ");
            sql.AppendLine("    , A.RULE_NAME ");
            sql.AppendLine("    , B.CODE_NAME AS STATUS_NAME ");
            sql.AppendLine("    , C.DATASET_NAME ");
            sql.AppendLine("    , DATE_FORMAT(A.START_DATE, '/') || '~' || DATE_FORMAT(A.END_DATE, '/') AS EFFECTIVE_DATE ");
            sql.AppendLine("    , A.STATUS AS STATUS_ID");
            sql.AppendLine("    , A.START_DATE");
            sql.AppendLine("    , A.END_DATE");
            sql.AppendLine("    , A.RULE_ID || '_' || A.RULE_VERSION AS MAIN_KEY");

            sql.AppendLine("FROM RE_RULE A ");

            sql.AppendLine("INNER JOIN RE_CODE B ");
            sql.AppendLine("    ON A.STATUS=B.CODE_ID AND B.CODE_KIND='RE001' ");

            sql.AppendLine("INNER JOIN RE_DATASET C ");
            sql.AppendLine("    ON A.DATASET_ID=C.DATASET_ID ");

            sql.AppendLine("WHERE 1=1 ");

            if (!string.IsNullOrEmpty(obj.RULE_ID))
            {
                sql.AppendLine("    AND A.RULE_ID = :RULE_ID");
            }

            if (!string.IsNullOrEmpty(obj.RULE_VERSION))
            {
                sql.AppendLine("    AND A.RULE_VERSION = :RULE_VERSION");
            }

            if (!string.IsNullOrEmpty(obj.RULE_NAME))
            {
                sql.AppendLine("    AND A.RULE_NAME LIKE '%' || :RULE_NAME || '%'");
            }

            if (aryDatasetId != null && aryDatasetId.Length > 0)
            {
                sql.AppendLine("    AND A.DATASET_ID IN (" + GenerateSqlCommand.ProcIn(DBProviderEnum.Oracle, obj.DATASET_ID, ref parameters) + ")");
            }

            if (!string.IsNullOrEmpty(obj.START_DATE))
            {
                sqlIntervalDate = "A.START_DATE <= :START_DATE";
            }

            if (!string.IsNullOrEmpty(obj.END_DATE))
            {
                if (sqlIntervalDate.Length == 0)
                {
                    sqlIntervalDate = "A.END_DATE >= :END_DATE";
                }
                else
                {
                    sqlIntervalDate += " AND A.END_DATE >= :END_DATE";
                }
            }

            if (sqlIntervalDate.Length > 0)
            {
                sql.AppendLine("    AND (" + sqlIntervalDate + ")");
            }

            if (aryStatus != null && aryStatus.Length > 0)
            {
                sql.AppendLine("    AND A.STATUS IN (" + GenerateSqlCommand.ProcIn(DBProviderEnum.Oracle, obj.STATUS, ref parameters) + ")");

            }

            SetParameters(DBProviderEnum.Oracle, sql.ToString(), obj, ref parameters);

            return base.QueryWithRowMapper<RuleEngineObject_RuleList>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<RuleEngineObject_RuleList>(), parameters, objLogInfo);
        }


        /// <summary>
        /// 取得規則步驟
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<RuleEngineObject_RuleStep> GetRuleStep(LogInfoObject objLogInfo, RuleEngineObject_RuleStep obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();

            sql.AppendLine("SELECT RR.RULE_ID,");
            sql.AppendLine("       RR.RULE_VERSION, ");
            sql.AppendLine("       RR.RULE_NAME, ");
            sql.AppendLine("       RRS.RULE_STEP_SEQ, ");
            sql.AppendLine("       RRS.RULE_STEP_KIND, ");
            sql.AppendLine("       RRS.RULE_STEP_NAME ");

            sql.AppendLine("FROM RE_RULE RR ");

            sql.AppendLine("INNER JOIN RE_RULE_STEP RRS ");
            sql.AppendLine("ON RR.RULE_ID = RRS.RULE_ID ");
            sql.AppendLine("AND RR.RULE_VERSION = RRS.RULE_VERSION ");

            sql.AppendLine("WHERE 1=1 ");
            sql.AppendLine("AND RR.RULE_ID = :RULE_ID ");
            sql.AppendLine("AND RR.RULE_VERSION = :RULE_VERSION ");
            sql.AppendLine("AND RRS.RULE_STEP_SEQ = :RULE_STEP_SEQ ");

            parameters = SetParameters(obj);

            return base.QueryWithRowMapper<RuleEngineObject_RuleStep>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<RuleEngineObject_RuleStep>(), parameters, objLogInfo);
        }

        /// <summary>
        /// 更新規則步驟主檔資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <history>
        /// 1. 2014/10/30  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public void UpdateReRuleStep(LogInfoObject objLogInfo, ReRuleStepObject obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();
            StringBuilder strUpdateColumn = new StringBuilder();

            if (obj.RULE_STEP_KIND != null)
            {
                strUpdateColumn.AppendLine(", RULE_STEP_KIND = :RULE_STEP_KIND ");
            }

            sql.AppendLine("UPDATE RE_RULE_STEP ");
            sql.AppendLine("    SET ");
            sql.AppendLine(strUpdateColumn.ToString().TrimStart(','));
            sql.AppendLine("WHERE 1=1 ");

            if (obj.RULE_STEP_SEQ != null)
            {
                sql.AppendLine("    AND RULE_STEP_SEQ = :RULE_STEP_SEQ ");
            }

            SetParameters(DBProviderEnum.Oracle, sql.ToString(), obj, ref parameters);
            base.ExecuteNonQuery(CommandType.Text, sql.ToString(), parameters, objLogInfo);
        }

        /// <summary>
        /// 取得規則步驟明細
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<RuleEngineObject_RuleList> GetRuleStepDetail(LogInfoObject objLogInfo, ReRuleObject obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();

            sql.AppendLine("SELECT RRSD.UPPER_STEP_DETAIL_SEQ, ");
            sql.AppendLine("       RRSD.STEP_DETAIL_LEVEL, ");
            sql.AppendLine("       RRSD.PARTY_ID, ");
            sql.AppendLine("       RRSD.ATTRIBUTE_ID, ");
            sql.AppendLine("       RRSD.ACTION_TYPE, ");
            sql.AppendLine("       RRSD.OPERATOR, ");
            sql.AppendLine("       RRSD.VALUE, ");
            sql.AppendLine("       RDPA.OPERATOR_CODE_KIND, ");
            sql.AppendLine("       RDPA.VALUE_KIND ");
            sql.AppendLine("FROM RE_RULE_STEP_DETAIL RRSD ");
            sql.AppendLine("LEFT JOIN RE_DATASET_PARTY RDP ");
            sql.AppendLine("ON RRSD.PARTY_ID = RDP.PARTY_ID ");
            sql.AppendLine("LEFT JOIN RE_DATASET_PARTY_ATTRIBUTE RDPA ");
            sql.AppendLine("ON RDP.PARTY_ID = RDPA.PARTY_ID ");
            sql.AppendLine("AND RRSD.ATTRIBUTE_ID = RDPA.ATTRIBUTE_ID ");
            sql.AppendLine("WHERE 1=1 ");
            sql.AppendLine("AND RRSD.RULE_STEP_SEQ = :RULE_STEP_SEQ ");
            sql.AppendLine("ORDER BY RRSD.RULE_STEP_DETAIL_SEQ ");

            parameters = SetParameters(obj);

            return base.QueryWithRowMapper<RuleEngineObject_RuleList>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<RuleEngineObject_RuleList>(), parameters, objLogInfo);
        }

        /// <summary>
        /// 取得規則步驟對象
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<ReDatasetParty> GetRuleStepParty(LogInfoObject objLogInfo, ReDatasetParty obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();

            //根據Object來自動產生SQL Comman Script
            sql = GenerateSqlCommand.Query(DBProviderEnum.Oracle, obj);

            if (obj.DATA_ROW != null)
            {
                sql.AppendLine("    AND DATA_ROW=:DATA_ROW");
            }

            parameters = SetParameters(obj);

            return base.QueryWithRowMapper<ReDatasetParty>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<ReDatasetParty>(), parameters, objLogInfo);
        }

        /// <summary>
        /// 取得規則步驟屬性
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<ReDataSetPartyAttribute> GetRuleStepActionSetAttribute(LogInfoObject objLogInfo, ReDataSetPartyAttribute_Query obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();

            sql.AppendLine("SELECT PARTY_ID,");
            sql.AppendLine("       ATTRIBUTE_ID,");
            sql.AppendLine("       ATTRIBUTE_NAME,");
            sql.AppendLine("       OPERATOR_CODE_KIND,");
            sql.AppendLine("       DATA_TYPE,");
            sql.AppendLine("       VALUE_KIND");
            sql.AppendLine("FROM RE_DATASET_PARTY_ATTRIBUTE");
            sql.AppendLine("WHERE 1=1");
            sql.AppendLine("AND ATTRIBUTE_LEVEL = 'M' ");
            sql.AppendLine("AND DATA_TYPE <> 'Enum' ");
            sql.AppendLine("AND ATTRIBUTE_IO_KIND IN ('O','IO')");
            sql.AppendLine("UNION");
            sql.AppendLine("SELECT PARTY_ID,");
            sql.AppendLine("       ATTRIBUTE_ID,");
            sql.AppendLine("       ATTRIBUTE_NAME,");
            sql.AppendLine("       OPERATOR_CODE_KIND,");
            sql.AppendLine("       DATA_TYPE,");
            sql.AppendLine("       VALUE_KIND");
            sql.AppendLine("FROM RE_RULE_VARIABLE RRV");
            sql.AppendLine("WHERE 1=1");
            sql.AppendLine("AND ENABLE = 'Y'");

            return base.QueryWithRowMapper<ReDataSetPartyAttribute>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<ReDataSetPartyAttribute>(), parameters, objLogInfo);

        }
        /// <summary>
        /// 取得規則步驟屬性
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/09/29  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<ReDataSetPartyAttribute> GetRuleStepAttribute(LogInfoObject objLogInfo, ReDataSetPartyAttribute_Query obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();
            ReDataSetPartyAttribute objTable = new ReDataSetPartyAttribute();
            sql = GenerateSqlCommand.Query(DBProviderEnum.Oracle, objTable);

            if (obj.ATTRIBUTE_LEVEL != null)
            {
                sql.AppendLine("    AND ATTRIBUTE_LEVEL=:ATTRIBUTE_LEVEL");
                parameters.Add("ATTRIBUTE_LEVEL", DbType.String).Value = obj.ATTRIBUTE_LEVEL;
            }

            if (obj.DATA_TYPE != null)
            {
                if (obj.DATA_TYPE_MODE == "IN")
                {
                    sql.AppendLine("    AND DATA_TYPE NOT IN ('Enum','Date')");
                }
                else if (obj.DATA_TYPE_MODE == "NOT")
                {
                    sql.AppendLine("    AND DATA_TYPE<>:DATA_TYPE");
                    parameters.Add("DATA_TYPE", DbType.String).Value = obj.DATA_TYPE;
                }
                else
                {
                    sql.AppendLine("    AND DATA_TYPE=:DATA_TYPE");
                    parameters.Add("DATA_TYPE", DbType.String).Value = obj.DATA_TYPE;
                }
            }

            if (obj.ATTRIBUTE_IO_KIND != null)
            {
                sql.AppendLine("    AND ATTRIBUTE_IO_KIND IN (" + GenerateSqlCommand.ProcIn(DBProviderEnum.Oracle, obj.ATTRIBUTE_IO_KIND, ref parameters) + ")");
            }

            if (obj.UPPER_ATTRIBUTE_ID != null)
            {
                sql.AppendLine("    AND UPPER_ATTRIBUTE_ID=:UPPER_ATTRIBUTE_ID");
                parameters.Add("UPPER_ATTRIBUTE_ID", DbType.String).Value = obj.UPPER_ATTRIBUTE_ID;
            }

            if (obj.PARTY_ID != null)
            {
                sql.AppendLine("    AND PARTY_ID=:PARTY_ID");
                parameters.Add("PARTY_ID", DbType.String).Value = obj.PARTY_ID;
            }


            return base.QueryWithRowMapper<ReDataSetPartyAttribute>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<ReDataSetPartyAttribute>(), parameters, objLogInfo);
        }

        /// <summary>
        /// 取得規則步驟ActionSet屬性
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/07  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<RuleEngineObject_ActionSet> GetRuleStepActionSetEnumAttribute(LogInfoObject objLogInfo, RuleEngineObject_ActionSet obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();

            sql.AppendLine("SELECT PARTY_ID,");
            sql.AppendLine("       ATTRIBUTE_ID,");
            sql.AppendLine("       ATTRIBUTE_NAME,");
            sql.AppendLine("       OPERATOR_CODE_KIND,");
            sql.AppendLine("       DATA_TYPE,");
            sql.AppendLine("       VALUE_KIND");
            sql.AppendLine("FROM RE_DATASET_PARTY_ATTRIBUTE");
            sql.AppendLine("WHERE 1=1");
            sql.AppendLine("AND PARTY_ID <> 'Rule'");
            sql.AppendLine("AND (DATA_TYPE = :DATA_TYPE OR DATA_TYPE = 'Enum')");
            sql.AppendLine("UNION");
            sql.AppendLine("SELECT PARTY_ID,");
            sql.AppendLine("       ATTRIBUTE_ID,");
            sql.AppendLine("       ATTRIBUTE_NAME,");
            sql.AppendLine("       OPERATOR_CODE_KIND,");
            sql.AppendLine("       DATA_TYPE,");
            sql.AppendLine("       VALUE_KIND");
            sql.AppendLine("FROM RE_RULE_VARIABLE RRV");
            sql.AppendLine("WHERE 1=1");
            sql.AppendLine("AND ENABLE = 'Y'");
            sql.AppendLine("AND (DATA_TYPE = :DATA_TYPE OR DATA_TYPE = 'Enum')");

            parameters = SetParameters(obj);

            return base.QueryWithRowMapper<RuleEngineObject_ActionSet>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<RuleEngineObject_ActionSet>(), parameters, objLogInfo);
        }

        /// <summary>
        /// 取得規則步驟ActionSet EnumFunction
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/07  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<RuleEngineObject_ActionSetEnumFunction> GetRuleStepActionSetEnumFunction(LogInfoObject objLogInfo, RuleEngineObject_ActionSetEnumFunction obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();
            string sqlIntervalDate = string.Empty;

            sql.AppendLine("SELECT DISTINCT RC.CODE_KIND ");
            sql.AppendLine("    , RC.CODE_ID ");
            sql.AppendLine("    , RC.CODE_NAME ");
            sql.AppendLine("    , RC.SORT_ORDER ");
            sql.AppendLine("    , RDPA.DATA_TYPE ");
            sql.AppendLine("    , RDPA.ATTRIBUTE_ID ");
            sql.AppendLine("    , RDPA.VALUE_KIND ");
            sql.AppendLine("    , RDPA.BASE_CODE_KIND ");
            sql.AppendLine("    , RDPA.UNIT_CODE_KIND ");
            sql.AppendLine("    , RDPA.SUFFIX ");
            sql.AppendLine("FROM RE_CODE RC ");
            sql.AppendLine("INNER JOIN RE_DATASET_PARTY_ATTRIBUTE RDPA ");
            sql.AppendLine("ON RC.CODE_KIND = RDPA.OPERATOR_CODE_KIND ");
            sql.AppendLine("WHERE 1=1 ");
            sql.AppendLine("AND RC.PARENT_CODE_ID = 'E' ");
            sql.AppendLine("AND RDPA.UPPER_ATTRIBUTE_ID = :UPPER_ATTRIBUTE_ID ");

            if (obj.DATA_TYPE != null)
            {
                sql.AppendLine("AND RDPA.DATA_TYPE = :DATA_TYPE ");
            }

            sql.AppendLine("ORDER BY RC.SORT_ORDER ");

            SetParameters(DBProviderEnum.Oracle, sql.ToString(), obj, ref parameters);

            return base.QueryWithRowMapper<RuleEngineObject_ActionSetEnumFunction>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<RuleEngineObject_ActionSetEnumFunction>(), parameters, objLogInfo);
        }

        /// <summary>
        /// 取得RuleStep
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/08  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<ReRuleStepObject> GetRuleStepObject(LogInfoObject objLogInfo, ReRuleStepObject obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();

            sql = GenerateSqlCommand.Query(DBProviderEnum.Oracle, obj);

            if (obj.RULE_STEP_SEQ != null)
            {
                sql.AppendLine("    AND RULE_STEP_SEQ <> :RULE_STEP_SEQ");
            }

            if (obj.RULE_ID != null)
            {
                sql.AppendLine("    AND RULE_ID=:RULE_ID");
            }

            if (obj.RULE_STEP_SEQ != null)
            {
                sql.AppendLine("    AND RULE_VERSION=:RULE_VERSION");
            }

            SetParameters(DBProviderEnum.Oracle, sql.ToString(), obj, ref parameters);

            return base.QueryWithRowMapper<ReRuleStepObject>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<ReRuleStepObject>(), parameters, objLogInfo);
        }

        /// <summary>
        /// 取得資料集明細資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/10/29  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<ReRuleStepDetailObject> GetDataSetDetail(LogInfoObject objLogInfo, ReRuleStepDetailObject obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();

            sql = GenerateSqlCommand.Query(DBProviderEnum.Oracle, obj);

            if (obj.RULE_ID != null)
            {
                sql.AppendLine("    AND RULE_ID = :RULE_ID ");
            }

            if (obj.RULE_STEP_SEQ != null)
            {
                sql.AppendLine("    AND RULE_STEP_SEQ = :RULE_STEP_SEQ ");
            }

            if (obj.RULE_VERSION != null)
            {
                sql.AppendLine("    AND RULE_VERSION = :RULE_VERSION ");
            }

            SetParameters(DBProviderEnum.Oracle, sql.ToString(), obj, ref parameters);

            return base.QueryWithRowMapper<ReRuleStepDetailObject>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<ReRuleStepDetailObject>(), parameters, objLogInfo);
        }

        /// <summary>
        /// 新增規則明細資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <history>
        /// 1. 2014/10/24  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public void InsertReRuleDetail(LogInfoObject objLogInfo, ReRuleStepDetailObject[] obj)
        {
            foreach (ReRuleStepDetailObject RRSDObj in obj)
            {
                IDbParameters parameters = CreateDbParameters();
                StringBuilder sql = new StringBuilder();

                sql = GenerateSqlCommand.Insert(DBProviderEnum.Oracle, RRSDObj);
                SetParameters(DBProviderEnum.Oracle, sql.ToString(), RRSDObj, ref parameters);
                base.ExecuteNonQuery(CommandType.Text, sql.ToString(), parameters, objLogInfo);
            }
        }

        /// <summary>
        /// 取得最大值序號
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <history>
        /// 1. 2014/10/27  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public int GetMaxRuleStepSeq(LogInfoObject objLogInfo)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();
            string sqlIntervalDate = string.Empty;

            sql.AppendLine("SELECT MAX(RULE_STEP_DETAIL_SEQ) AS RULE_STEP_DETAIL_SEQ ");
            sql.AppendLine("FROM RE_RULE_STEP_DETAIL ");

            IList<ReRuleStepDetailObject> objRRSD = base.QueryWithRowMapper<ReRuleStepDetailObject>(CommandType.Text, Convert.ToString(sql), new GenerateRowMapper<ReRuleStepDetailObject>(), parameters, objLogInfo);

            return Convert.ToInt16(objRRSD[0].RULE_STEP_DETAIL_SEQ);
        }

        /// <summary>
        /// 刪除規則明細資料
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <history>
        /// 1. 2014/10/24  Daniel Lee Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public void DeleteReRuleDetail(LogInfoObject objLogInfo, ReRuleStepDetailObject obj)
        {
                IDbParameters parameters = CreateDbParameters();
                StringBuilder sql = new StringBuilder();

                sql = GenerateSqlCommand.Delete(DBProviderEnum.Oracle, obj);

                if (obj.RULE_ID != null)
                {
                    sql.AppendLine("    AND RULE_ID = :RULE_ID ");
                }

                if (obj.RULE_STEP_SEQ != null)
                {
                    sql.AppendLine("    AND RULE_STEP_SEQ = :RULE_STEP_SEQ ");
                }

                if (obj.RULE_VERSION != null)
                {
                    sql.AppendLine("    AND RULE_VERSION = :RULE_VERSION ");
                }

                SetParameters(DBProviderEnum.Oracle, sql.ToString(), obj, ref parameters);
                base.ExecuteNonQuery(CommandType.Text, sql.ToString(), parameters, objLogInfo);
        }

        /// <summary>
        /// 判斷規則是否有維護中的版本
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="obj">資料物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/11/05  Steven_Chen Create
        /// 2. 2014/11/10  Ben_Tsai    Modify 增加傳遞Log訊息物件
        /// </history>
        public bool IsHaveMaintainVersion(LogInfoObject objLogInfo, ReRuleObject obj)
        {
            IDbParameters parameters = CreateDbParameters();
            StringBuilder sql = new StringBuilder();

            sql.AppendLine("SELECT COUNT(1) AS DATA_COUNT ");
            sql.AppendLine("FROM RE_RULE ");
            sql.AppendLine("WHERE 1=1 ");
            sql.AppendLine("    AND RULE_ID = :RULE_ID ");
            sql.AppendLine("    AND STATUS NOT IN ('ACT', 'INA') ");

            SetParameters(DBProviderEnum.Oracle, sql.ToString(), obj, ref parameters);

            DataTable dt = base.DataTableCreateWithParams(CommandType.Text, Convert.ToString(sql), parameters, objLogInfo);

            return (Convert.ToInt16(dt.Rows[0]["DATA_COUNT"])>0 ? true : false);
        }
    }
}
