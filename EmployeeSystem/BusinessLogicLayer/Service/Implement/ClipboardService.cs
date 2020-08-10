using BusinessLogicLayer.Service.Interface;
using DataAccessLayer.Dao.Interface;
using System.Collections.Generic;
using System.Linq;
using DomainObject.DomainObject.TableDomainObject;
using DomainObject.DomainObject.DefinedDomainObject;
using System.IO;
using System.Configuration;
using LogHandler.DomainObject;

namespace BusinessLogicLayer.Service.Implement
{
    public class ClipboardService : BaseService, IClipboardService
    {
        private IClipboardDao ClipboardDao { get; set; }

        /// <summary>
        /// 取得檔案上傳清單
        /// </summary>
        /// <returns></returns>
        /// <history>
        /// 1. 2014/07/28   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        public KendoGridObject<CUTPHOTOObject> GetFileUploadList(int pageNum, int pageSize)
        {
            KendoGridObject<CUTPHOTOObject> kendoGridFileList = new KendoGridObject<CUTPHOTOObject>();

            //計算 開始/結束資料列編號
            int startRowNum = 0;
            int endRowNum = 0;

            startRowNum = (pageNum - 1) * pageSize + 1;
            endRowNum = pageNum * pageSize;

            IList<CUTPHOTOObject> fileList = this.ClipboardDao.GetFileList(new LogInfoObject());
            kendoGridFileList.total = fileList.Count;

            //依據當前頁面所需的筆數, 取得資料
            var dataList = from dataItem in fileList
                           where dataItem.DATA_ID >= startRowNum
                               && dataItem.DATA_ID <= endRowNum
                           select dataItem;

            kendoGridFileList.data = dataList.ToList();

            return kendoGridFileList;
        }

        /// <summary>
        /// 新增檔案
        /// </summary>
        /// <param name="dataObj">資料物件</param>
        /// <history>
        /// 1. 2014/07/29   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        public void InsertFile(CUTPHOTOObject dataObj)
        {
            this.ClipboardDao.InsertFile(new LogInfoObject(), dataObj);
        }

        /// <summary>
        /// 刪除檔案
        /// </summary>
        /// <param name="dataObj">資料物件</param>
        /// <history>
        /// 1. 2014/07/29   1.00   Ben_Tsai   Create
        /// 2. 2014/11/10   1.01   Ben_Tsai   Modify 增加傳遞Log訊息物件
        /// </history>
        public void DeleteFile(CUTPHOTOObject dataObj)
        {            
            this.ClipboardDao.DeleteFile(new LogInfoObject(), dataObj.DATANO);

            //刪除實體檔案
            string fileName = dataObj.FILENAME + ".jpg";
            FileInfo file = new FileInfo(Path.Combine(ConfigurationManager.AppSettings["PHOTO_UPLOAD_PATH"], fileName));
            file.Delete();
        }
    }
}
