/* 需要先引用linkedme的js sdk*
 *  <script src="https://lkme.cc/js/linkedme.min.js"></script>
 */
function InitOpenApp(OpenAppParams) {
    linkedme.init("aba94fb36c84e4e5a293d8653c6c529a", { type: "live" }, null);
    var data = {};
    data.ios_custom_url = "";
    data.android_custom_url = "";
    data.params = '{"ActionType":"' + OpenAppParams.ActionType + '","ActionValue":"' + OpenAppParams.ActionValue + '","Parameters":' + OpenAppParams.Parameters + '}';
    var appdlurl = "http://a.app.qq.com/o/simple.jsp?pkgname=com.gudi.weicai";//app微下载地址
    linkedme.link(data, function (err, data) {
        if (err) {
            $(".linkedme").attr("href", appdlurl);
        } else {
            $(".linkedme").attr("href", data.url);
        }
    }, false);
}
