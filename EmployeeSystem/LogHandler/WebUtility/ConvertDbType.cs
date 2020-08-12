using System;
using System.Data;

namespace WebUtility
{
    public static class ConvertDbType
    {
        public static DbType GetDbType(string strPropertyTypeName)
        {
            DbType objType = new DbType();

            switch (strPropertyTypeName)
            {
                case "String":
                    objType=DbType.String;
                    break;
                case "int":
                    objType=DbType.Int32;
                    break;
                case "DateTime":
                    objType = DbType.Date;
                    break;
                default:
                    break;
            }
            return objType;
        }
    }
}
