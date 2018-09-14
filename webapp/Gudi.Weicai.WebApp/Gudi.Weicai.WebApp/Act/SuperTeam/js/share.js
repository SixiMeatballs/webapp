$(document).ready(function () {
    var usertoken = getUrlParam("usertoken");
    //usertoken = '7814B654-0972-48FC-A0B0-18DAD87CF39B';
    $("#hiddenusertoken").val(usertoken);
    var randomNum = Math.random();

    $('a').each(function () {
        var Ahref = $(this).attr("href");
        if (Ahref == undefined) return;
        if (Ahref == "") return;
        if (Ahref == "#") return;
        Ahref = changeURLArg(Ahref, "usertoken", usertoken);
        Ahref = changeURLArg(Ahref, "asdferfdd", randomNum);
        $(this).attr("href", Ahref);
    });

    $("a").click(function () {
        var Ahref = $(this).attr("href");
        var location = window.location.pathname.toLowerCase();

        //如果是外部链接，则直接跳转
        if (Ahref != undefined && Ahref.indexOf("http") > -1 && !(Ahref.toLowerCase().indexOf(window.location.host) > -1)) {
            return true;
        }
       
        var fdStart = location.indexOf("/act/");
        if (fdStart == -1 || location.indexOf("/worldcupshare/") > -1) {
            return true;
        }

        if (Ahref == undefined) return false;
        if (Ahref == "") return false;
        if (Ahref == "#") return false;
        var usertoken = getUrlParamFromHref(Ahref, "usertoken");
        if ((usertoken == null || usertoken == "null")) {
            return false;
        }
    })

    $("div.btn_back img,img.wcs").click(function () {      
        if (document.referrer == null || document.referrer == "" || document.referrer == undefined) {
            NativeClose();
        } else {
            window.history.go(-1);
        }
    });
});