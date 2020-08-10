using System;
using Spring.Data.Generic;
using DomainObject.DomainObject.TableDomainObject;
using System.Data;

namespace DomainObject.RowMapper.TableRowMapper
{
    public class CaseQueryRowMapper : IRowMapper<CaseQueryObject>
    {
        /// <summary>
        /// Maps the row.
        /// </summary>
        /// <param name="dataReader">The data reader.</param>
        /// <param name="rowNum">The row num.</param>
        /// <returns></returns>
        public CaseQueryObject MapRow(IDataReader dataReader, int rowNum)
        {
            CaseQueryObject obj = new CaseQueryObject();

            if (!Convert.IsDBNull(dataReader["CASE_SN"]))
            {
                obj.CASE_SN = Convert.ToString(dataReader["CASE_SN"]);
            }

            if (!Convert.IsDBNull(dataReader["CASE_COUNT"]))
            {
                obj.CASE_COUNT = Convert.ToInt32(dataReader["CASE_COUNT"]);
            }

            if (!Convert.IsDBNull(dataReader["CASE_AO_NM"]))
            {
                obj.CASE_AO_NM = Convert.ToString(dataReader["CASE_AO_NM"]);
            }

            if (!Convert.IsDBNull(dataReader["CASE_OU_NM"]))
            {
                obj.CASE_OU_NM = Convert.ToString(dataReader["CASE_OU_NM"]);
            }

            if (!Convert.IsDBNull(dataReader["CASE_KIND"]))
            {
                obj.CASE_KIND = Convert.ToString(dataReader["CASE_KIND"]);
            }

            if (!Convert.IsDBNull(dataReader["CASE_STEP"]))
            {
                obj.CASE_STEP = Convert.ToString(dataReader["CASE_STEP"]);
            }

            if (!Convert.IsDBNull(dataReader["APRV_LEVEL_NM"]))
            {
                obj.APRV_LEVEL_NM = Convert.ToString(dataReader["APRV_LEVEL_NM"]);
            }

            if (!Convert.IsDBNull(dataReader["CUST_NM"]))
            {
                obj.CUST_NM = Convert.ToString(dataReader["CUST_NM"]);
            }

            if (!Convert.IsDBNull(dataReader["APPLY_DT"]))
            {
                obj.APPLY_DT = Convert.ToString(dataReader["APPLY_DT"]);
            }

            if (!Convert.IsDBNull(dataReader["APPLY_DT_Y"]))
            {
                obj.APPLY_DT_Y = Convert.ToString(dataReader["APPLY_DT_Y"]);
            }

            if (!Convert.IsDBNull(dataReader["APPLY_DT_M"]))
            {
                obj.APPLY_DT_M = Convert.ToString(dataReader["APPLY_DT_M"]);
            }

            if (!Convert.IsDBNull(dataReader["LINE_AMT_CASE"]))
            {
                obj.LINE_AMT_CASE = Convert.ToDecimal(dataReader["LINE_AMT_CASE"]);
            }

            return obj;
        }
    }
}
