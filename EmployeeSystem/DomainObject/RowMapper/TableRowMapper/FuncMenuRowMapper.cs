using System;
using Spring.Data.Generic;
using DomainObject.DomainObject.TableDomainObject;
using System.Data;

namespace DomainObject.RowMapper.TableRowMapper
{
    public class FuncMenuRowMapper : IRowMapper<FuncMenuObject>
    {
        /// <summary>
        /// Maps the row.
        /// </summary>
        /// <param name="dataReader">The data reader.</param>
        /// <param name="rowNum">The row num.</param>
        /// <returns></returns>
        public FuncMenuObject MapRow(IDataReader dataReader, int rowNum)
        {
            FuncMenuObject obj = new FuncMenuObject();

            if (!Convert.IsDBNull(dataReader["FUN_ID"]))
            {
                obj.FUN_ID = Convert.ToString(dataReader["FUN_ID"]);
            }

            if (!Convert.IsDBNull(dataReader["FUN_NAME"]))
            {
                obj.FUN_NAME = Convert.ToString(dataReader["FUN_NAME"]);
            }

            if (!Convert.IsDBNull(dataReader["PRG_PATH"]))
            {
                obj.PRG_PATH = Convert.ToString(dataReader["PRG_PATH"]);
            }

            if (!Convert.IsDBNull(dataReader["PARENT_FUN_ID"]))
            {
                obj.PARENT_FUN_ID = Convert.ToString(dataReader["PARENT_FUN_ID"]);
            }

            if (!Convert.IsDBNull(dataReader["SORT_ORDER"]))
            {
                obj.SORT_ORDER = Convert.ToString(dataReader["SORT_ORDER"]);
            }

            return obj;
        }	
    }
}
