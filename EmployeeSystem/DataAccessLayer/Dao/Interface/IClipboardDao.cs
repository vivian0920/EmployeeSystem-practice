using DomainObject.DomainObject.TableDomainObject;
using LogHandler.DomainObject;
using System.Collections.Generic;

namespace DataAccessLayer.Dao.Interface
{
    public interface IClipboardDao
    {
        /// <summary>
        /// 取得檔案上傳清單
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/07/28   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        IList<CUTPHOTOObject> GetFileList(LogInfoObject objLogInfo);

        /// <summary>
        /// 新增檔案
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="dataObj">資料物件</param>
        /// <history>
        /// 1. 2014/07/29   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        void InsertFile(LogInfoObject objLogInfo, CUTPHOTOObject dataObj);

        /// <summary>
        /// 刪除檔案
        /// </summary>
        /// <param name="objLogInfo">LOG訊息物件</param>
        /// <param name="DATANO">資料編號</param>
        /// <history>
        /// 1. 2014/07/29   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        void DeleteFile(LogInfoObject objLogInfo, string DATANO);
    }
}
