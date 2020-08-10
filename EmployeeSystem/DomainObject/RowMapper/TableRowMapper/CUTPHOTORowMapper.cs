using DomainObject.DomainObject.TableDomainObject;
using Spring.Data.Generic;
using System;
using System.Data;

namespace DomainObject.RowMapper.TableRowMapper
{
    public class CUTPHOTORowMapper : IRowMapper<CUTPHOTOObject>
    {
        /// <summary>
        /// Maps the row.
        /// </summary>
        /// <param name="dataReader">The data reader.</param>
        /// <param name="rowNum">The row num.</param>
        /// <returns></returns>
        public CUTPHOTOObject MapRow(IDataReader dataReader, int rowNum)
        {
            CUTPHOTOObject obj = new CUTPHOTOObject();

            if (!Convert.IsDBNull(dataReader["DATA_ID"]))
            {
                obj.DATA_ID = Convert.ToInt32(dataReader["DATA_ID"]);
            }

            if (!Convert.IsDBNull(dataReader["DATANO"]))
            {
                obj.DATANO = Convert.ToString(dataReader["DATANO"]);
            }

            if (!Convert.IsDBNull(dataReader["FILENAME"]))
            {
                obj.FILENAME = Convert.ToString(dataReader["FILENAME"]);
            }

            if (!Convert.IsDBNull(dataReader["FILEDESC"]))
            {
                obj.FILEDESC = Convert.ToString(dataReader["FILEDESC"]);
            }

            if (!Convert.IsDBNull(dataReader["USERNAME"]))
            {
                obj.USERNAME = Convert.ToString(dataReader["USERNAME"]);
            }

            if (!Convert.IsDBNull(dataReader["CREATEDATE"]))
            {
                obj.CREATEDATE = Convert.ToDateTime(dataReader["CREATEDATE"]);
            }

            return obj;
        }
    }
}
