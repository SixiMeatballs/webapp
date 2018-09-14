using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Gudi.Weicai.WebApp.Controllers
{
    public class ApiController : Controller
    {
        // GET: Api
        public ActionResult Index(string postUrl, string paramData, string ContentType, string usertoken)
        {
            string ret = string.Empty;
            try
            {
                var rooturl = ConfigurationManager.AppSettings["ApiRootUrl"];
                postUrl = string.Format("{0}{1}?userToken={2}", rooturl, postUrl,usertoken);
                if (!postUrl.StartsWith("http"))
                    return Content("");

                byte[] byteArray = Encoding.UTF8.GetBytes(paramData); //转化
                HttpWebRequest webReq = (HttpWebRequest)WebRequest.Create(new Uri(postUrl));
                webReq.Method = "POST";
                if (string.IsNullOrEmpty(ContentType))
                {
                    ContentType = "application/json";
                }
                webReq.ContentType = ContentType;

                webReq.Headers.Add("deviceNo", "webapp");
                webReq.Headers.Add("application", "webapp");
                webReq.Headers.Add("userToken", usertoken);

                webReq.ContentLength = byteArray.Length;
                Stream newStream = webReq.GetRequestStream();
                newStream.Write(byteArray, 0, byteArray.Length);//写入参数
                newStream.Close();
                HttpWebResponse response = (HttpWebResponse)webReq.GetResponse();
                StreamReader sr = new StreamReader(response.GetResponseStream(), Encoding.UTF8);
                ret = sr.ReadToEnd();
                sr.Close();
                response.Close();
                newStream.Close();
            }
            catch (Exception ex)
            {
                return Content("");
            }
            return Content(ret);
        }
    }
}