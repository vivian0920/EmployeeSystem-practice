using DataAccessLayer.Dao.Interface;
using System.Collections.Generic;
using DomainObject.DomainObject.TableDomainObject;
using System.Data;
using Spring.Data.Common;
using DomainObject.RowMapper.TableRowMapper;
using LogHandler.DomainObject;

namespace DataAccessLayer.Dao.Implement
{
    public class ClipboardDao : BaseDao, IClipboardDao
    {
        /// <summary>
        /// 取得檔案上傳清單
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <returns>所有資料列</returns>
        /// <history>
        /// 1. 2014/07/28   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        public IList<CUTPHOTOObject> GetFileList(LogInfoObject objLogInfo)
        {
            string sql = @" SELECT
                                ROWNUM AS DATA_ID
                                , DATANO
                                , FILENAME
                                , FILEDESC
                                , USERNAME
                                , CREATEDATE
                            FROM (
                                SELECT      
                                    DATANO
                                    , FILENAME
                                    , FILEDESC
                                    , USERNAME
                                    , CREATEDATE
                                FROM CUTPHOTO
                            ORDER BY CREATEDATE DESC) ";

            return base.QueryWithRowMapper<CUTPHOTOObject>(CommandType.Text, sql, new CUTPHOTORowMapper(), objLogInfo);

        }

        /// <summary>
        /// 新增檔案
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="dataObj">資料物件</param>
        /// <history>
        /// 1. 2014/07/29   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        public void InsertFile(LogInfoObject objLogInfo, CUTPHOTOObject dataObj)
        {
            IDbParameters parameters = CreateDbParameters();

            string sql = @" INSERT INTO CUTPHOTO
                            (
                                DATANO
                                , FILENAME
                                , FILEDESC
                                , USERNAME
                                , CREATEDATE
                            )
                            VALUES 
                            (
                                :DATANO
                                , :FILENAME
                                , :FILEDESC
                                , :USERNAME
                                , SYSDATE
                            ) ";

            parameters.Add("DATANO", DbType.String).Value = dataObj.DATANO;
            parameters.Add("FILENAME", DbType.String).Value = dataObj.FILENAME;
            parameters.Add("FILEDESC", DbType.String).Value = dataObj.FILEDESC;
            parameters.Add("USERNAME", DbType.String).Value = dataObj.USERNAME;

            base.ExecuteNonQuery(CommandType.Text, sql, parameters, objLogInfo);
        }

        /// <summary>
        /// 刪除檔案
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="DATANO">資料編號</param>
        /// <history>
        /// 1. 2014/07/29   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        public void DeleteFile(LogInfoObject objLogInfo, string DATANO)
        {
            IDbParameters parameters = CreateDbParameters();

            string sql = @" DELETE CUTPHOTO WHERE DATANO = :DATANO ";

            parameters.Add("DATANO", DbType.String).Value = DATANO;

            base.ExecuteNonQuery(CommandType.Text, sql, parameters, objLogInfo);
        }
    }
}
