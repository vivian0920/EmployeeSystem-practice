<%@ WebHandler Language="C#" Class="upload" %>

using System;
using System.Web;
using System.IO;
using System.Net;

public class upload : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        try
        {
            //上傳檔案
            if (!string.IsNullOrEmpty(context.Request["upload"]))
            {
                string filepath = context.Server.MapPath("~/Upload/Date/");

                if (!Directory.Exists(filepath))
                {
                    Directory.CreateDirectory(filepath);
                }

                //檢核檔案大小
                if (!string.IsNullOrEmpty(context.Request["maximum_upload_limit"]))
                {
                    int limitSize = Convert.ToInt16(context.Request["maximum_upload_limit"]);
                    for (int i = 0; i < context.Request.Files.Count; i++)
                    {
                        HttpPostedFile file = context.Request.Files[i];
                        string filename = file.FileName;
                        //單一檔案不得超過設定大小
                        if (file.ContentLength > limitSize)
                        {
                            //丟回sizeFlag表示檔案超過設定大小
                            System.Web.Script.Serialization.JavaScriptSerializer j = new System.Web.Script.Serialization.JavaScriptSerializer();
                            context.Response.Write(@"{""sizeFlag"":""true""}");
                            context.Response.StatusCode = (int)HttpStatusCode.OK;
                            return;
                        }
                    }
                }

                //執行上傳動作
                for (int i = 0; i < context.Request.Files.Count; i++)
                {
                    HttpPostedFile file = context.Request.Files[i];
                    string fileName = file.FileName.Split('.')[0];
                    string fileExtension = file.FileName.Split('.')[1];
                    string dupFileName = string.Empty;
                    int j = 0;
                    fileName = fileName.Substring(fileName.LastIndexOf("\\") + 1, fileName.Length - (fileName.LastIndexOf("\\") + 1));

                    while (File.Exists(filepath + fileName + dupFileName + "." + fileExtension))
                    {
                        j++;
                        dupFileName = "(" + j.ToString() + ")";
                    };

                    file.SaveAs(Path.Combine(filepath, fileName + dupFileName + "." + fileExtension));
                    context.Response.StatusCode = (int)HttpStatusCode.OK;
                }
            }

            //刪除檔案
            if (!string.IsNullOrEmpty(context.Request.QueryString["remove"]))
            {
                string filepath = context.Server.MapPath("~/Upload/Date/");
                string filename = context.Request.Form["fileNames"];
                FileInfo file = new FileInfo(Path.Combine(filepath, filename));
                file.Delete();
                context.Response.StatusCode = (int)HttpStatusCode.OK;
            }
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}