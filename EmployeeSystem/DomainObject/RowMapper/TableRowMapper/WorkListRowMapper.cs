using System;
using DomainObject.DomainObject.TableDomainObject;
using Spring.Data.Generic;
using System.Data;

namespace DomainObject.RowMapper.TableRowMapper
{
    public class WorkListRowMapper : IRowMapper<WorkListObject>
    {
        /// <summary>
        /// Maps the row.
        /// </summary>
        /// <param name="dataReader">The data reader.</param>
        /// <param name="rowNum">The row num.</param>
        /// <returns></returns>
        public WorkListObject MapRow(IDataReader dataReader, int rowNum)
        {
            WorkListObject obj = new WorkListObject();

            if (!Convert.IsDBNull(dataReader["DATA_ID"]))
            {
                obj.DATA_ID = Convert.ToInt32(dataReader["DATA_ID"]);
            }

            if (!Convert.IsDBNull(dataReader["APPLY_FLAG"]))
            {
                obj.APPLY_FLAG = Convert.ToString(dataReader["APPLY_FLAG"]);
            }

            if (!Convert.IsDBNull(dataReader["FLOW_NM"]))
            {
                obj.FLOW_NM = Convert.ToString(dataReader["FLOW_NM"]);
            }

            if (!Convert.IsDBNull(dataReader["STEP_NM"]))
            {
                obj.STEP_NM = Convert.ToString(dataReader["STEP_NM"]);
            }

            if (!Convert.IsDBNull(dataReader["BRCH_NM"]))
            {
                obj.BRCH_NM = Convert.ToString(dataReader["BRCH_NM"]);
            }

            if (!Convert.IsDBNull(dataReader["AO_NM"]))
            {
                obj.AO_NM = Convert.ToString(dataReader["AO_NM"]);
            }

            if (!Convert.IsDBNull(dataReader["CASE_SN"]))
            {
                obj.CASE_SN = Convert.ToString(dataReader["CASE_SN"]);
            }

            if (!Convert.IsDBNull(dataReader["CUST_NM"]))
            {
                obj.CUST_NM = Convert.ToString(dataReader["CUST_NM"]);
            }

            if (!Convert.IsDBNull(dataReader["CASE_KND"]))
            {
                obj.CASE_KND = Convert.ToString(dataReader["CASE_KND"]);
            }

            if (!Convert.IsDBNull(dataReader["APPLY_AMT"]))
            {
                obj.APPLY_AMT = Convert.ToString(dataReader["APPLY_AMT"]);
            }

            if (!Convert.IsDBNull(dataReader["PREV_TAKER_NM"]))
            {
                obj.PREV_TAKER_NM = Convert.ToString(dataReader["PREV_TAKER_NM"]);
            }

            if (!Convert.IsDBNull(dataReader["RECV_DT"]))
            {
                obj.RECV_DT = Convert.ToDateTime(dataReader["RECV_DT"]);
            }

            return obj;
        }
    }
}
