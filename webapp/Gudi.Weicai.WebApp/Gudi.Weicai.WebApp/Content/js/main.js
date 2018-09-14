function callapi(url, param, usertoken, fnsuccess, fnfailed, fnerror) {
    if (usertoken == "") {
        usertoken = $("#hiddenusertoken").val();
    }

    $.ajax({
        type: 'get',
        url: '/api?postUrl=' + encodeURIComponent(url) + '&paramData=' + encodeURIComponent(JSON.stringify(param)) + '&usertoken=' + usertoken,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.ErrorCode != 0) {
                if (fnfailed != undefined) {
                    fnfailed(data);
                }
                else {
                    MessageAlert(data.Message);
                }
            }
            else {
                if (fnsuccess != undefined) {
                    fnsuccess(data);
                }

            }
        },
        error: function () {
            if (fnerror != undefined) {
                fnerror();
            }
        }
    });
}

//获取URL参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}

//获取URL参数
function getUrlParamFromHref(href, name) {
    var fdStart = href.indexOf("?");
    if (fdStart == -1) {
        return null;
    }
    href = href.substr(fdStart + 1);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = href.match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}

//弹出框
function MessageAlert(content) {
    var alertid = "errorid1";
    if ($("#" + alertid).length > 0) {
        $("#" + alertid).remove();
    }

    var s = '<div class="info_alert" style="display: none;" id="' + alertid + '">';
    s += '<div class="boxmessage">';
    s += '<div class="boxmessage_con">' + content + '</div>';
    s += '<div class="button full_width boxclose">确定</div>';
    s += '</div>';
    s += '</div>';

    $('.root_container').append(s);
    messagebox(alertid);
}

///没有按钮的弹出框，如果 seconds>0,表示 几秒后自动关闭
function MessageAlertNoButton(content, seconds, fnconfirm) {
    var alertid = "errorid2";
    if ($("#" + alertid).length > 0) {
        $("#" + alertid).remove();
    }

    var s = '<div class="info_alert" style="display: none;" id="' + alertid + '">';
    s += '<div class="boxmessage">';
    s += '<div class="boxmessage_con">' + content + '</div>';
    s += '<div class="boxclose"></div>';
    s += '</div>';
    s += '</div>';

    $('.root_container').append(s);
    messagebox(alertid);

    if (seconds != undefined && seconds > 0) {
        setTimeout(function () {
            if (fnconfirm == undefined) {
                $(".info_alert .boxclose").click();
            }
            else {
                fnconfirm();
            }
        }, seconds * 1000);
    }
}

//弹出框,自己定义确定函数
function MessageOk(content, fnconfirm) {
    var alertid = "errorid3";
    if ($("#" + alertid).length > 0) {
        $("#" + alertid).remove();
    }

    var s = '<div class="info_alert" style="display: none;" id="' + alertid + '">';
    s += '<div class="boxmessage">';
    s += '<div class="boxmessage_con">' + content + '</div>';
    s += '<div class="button full_width boxconfirm">确定</div>';
    s += '</div>';
    s += '</div>';

    $('.root_container').append(s);
    messagebox(alertid, fnconfirm);
}

//弹出框,确认框，有确定  和 关闭
function MessageConfirm(content, fnconfirm) {
    var alertid = "errorid4";
    if ($("#" + alertid).length > 0) {
        $("#" + alertid).remove();
    }

    var s = '<div class="info_alert" style="display: none;" id="' + alertid + '">';
    s += '<div class="boxmessage">';
    s += '<div class="boxmessage_con">' + content + '</div>';

    s += '<div class="button  full_width">';
    s += '<div class="boxclose"><a href="#">取消</a></div >';
    s += '<div class="line"></div>';
    s += '<div class="boxconfirm"><a>确定</a></div >';
    s += '</div>';



    s += '</div>';
    s += '</div>';

    $('.root_container').append(s);
    messagebox(alertid, fnconfirm);
}


function MessageAlertWebapp(content, seconds) {
    var alertid = "erroridwebapp";
    if ($("#" + alertid).length > 0) {
        $("#" + alertid).remove();
    }

    var s = '<div class="webappalert" style="display:none;" id="' + alertid + '">';
    s += '<div class="contents">' + content + '</div>';
    s += '<div class="boxclose"></div>';
    s += '</div>';

    $('body').append(s);
    messagebox(alertid);

    if (seconds != undefined && seconds > 0) {
        setTimeout(function () {
            $(".boxclose").click();
        }, seconds * 1000);
    }
}


function changeURLArg(url, arg, arg_val) {
    if (url == undefined) return "";
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
    return url + '\n' + arg + '\n' + arg_val;
}


function isPoneAvailable(str) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}  


function gotourl(url) {
    if (url == undefined) return;

    var randomNum = Math.random();
    url = changeURLArg(url, "usertoken", $("#hiddenusertoken").val());
    url = changeURLArg(url, "asdferfdd", randomNum);
    window.location.href = url;
}



/*按照属性值，查找对象*/
function findElem(arrayToSearch, attr, val) {
    if (arrayToSearch == undefined) return -1;
    for (var i = 0; i < arrayToSearch.length; i++) {
        if (arrayToSearch[i][attr] == val) {
            return i;
        }
    }
    return -1;
}


/*按照属性值，查找对象的数量*/
function findElemNum(arrayToSearch, attr, val) {
    if (arrayToSearch == undefined) return 0;
    var n = 0;
    for (var i = 0; i < arrayToSearch.length; i++) {
        if (arrayToSearch[i][attr] == val) {
            n++;
        }
    }
    return n;
}

/*查找第几个对象的对应属性*/
function findElemAttr(arrayToSearch, index, attr, defaultval) {
    if (arrayToSearch == undefined) return defaultval;
    if (index < 0 || index >= arrayToSearch.length) {
        return defaultval;
    }
    return arrayToSearch[index][attr];
}

//对象的深度复制
function coppyArray(obj) {
    var result;
    var oClass = isClass(obj);
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (var key in obj) {
        var copy = obj[key];
        if (isClass(copy) == "Object") {
            result[key] = arguments.callee(copy);//递归调用
        } else if (isClass(copy) == "Array") {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}

//判断对象的数据类型
function isClass(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
}

function ShowCountDown(leftTime) {
    if (leftTime <= 0) {
        return { dd: 0, hh: 0, mm: 0, ss: 0, lt: 0 };
    }
    var dd = parseInt(leftTime / 60 / 60 / 24, 10);//计算剩余的天数
    var hh = parseInt(leftTime / 60 / 60 % 24, 10);//计算剩余的小时数
    var mm = parseInt(leftTime / 60 % 60, 10);//计算剩余的分钟数
    var ss = parseInt(leftTime % 60, 10);//计算剩余的秒数
    dd = checkTime(dd);
    hh = checkTime(hh);
    mm = checkTime(mm);
    ss = checkTime(ss);//小于10的话加0

    return { dd: dd, hh: hh, mm: mm, ss: ss, lt: leftTime };
}

function getTime(time) {
    var myDate = time;
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
        var t = new Date(time.replace(/-/g, '/')).getTime();
    } else {
        var t = myDate.getTime();
    }
    return t;
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


function Copy() {
    var clipboard = new ClipboardJS('.copybtn');

    clipboard.on('success', function (e) {
        MessageAlertWebapp("复制成功", 2);
    });

    clipboard.on('error', function (e) {
        MessageAlertWebapp("复制失败", 2);
    });
}


function messagebox(objid, confirmfunction) {
    $("#" + objid).css("display", "");
    $("#" + objid + " .boxclose").click(function () {
        $("#" + objid).css("display", "none");
    })

    if (confirmfunction != undefined) {
        $("#" + objid + " .boxconfirm").click(function () {
            confirmfunction();
            $("#" + objid).css("display", "none");
        })
    }
}


function calprogress(salary, maxSalary, freeSalary, maxLen, freeLen) {
    var rev = { width: 0, left: 0, type: 0, css: 'progresswarn', word: '', wordleft: 0 };   //type:   0:  <freelen,   1:   freelen和maxlen 之间，  2：>mexlen
    rev.word = getSalary(salary);
    if (maxLen == undefined) {
        maxLen = 6.5;
    }
    if (maxLen == 0) {
        maxLen = 6.5;
    }

    if (freeLen == undefined) {
        freeLen = 5;
    }
    if (freeLen == 0) {
        freeLen = 5;
    }

    var dis = 0.05;
    if (salary > maxSalary) {
        rev.left = maxLen + dis;
        rev.wordleft = rev.left / 2;
        rev.type = 2;
        rev.css = "progresserror";
        return rev;
    }

    if (salary < freeSalary) {
        var l = (salary / freeSalary) * freeLen;
        rev.width = maxLen - l;
        rev.left = l + dis;
        if (rev.left < dis) { rev.left = 0; }
        if (rev.left < 1.6) {
            rev.wordleft = rev.left + 0.6;
        }
        else {
            rev.wordleft = rev.left / 2;
        }
        return rev;
    }

    var l1 = freeLen + ((salary - freeSalary) / (maxSalary - freeSalary)) * (maxLen - freeLen);
    rev.width = maxLen - l1;
    rev.left = l1 + dis;
    rev.wordleft = rev.left / 2;
    return rev;

}

function getSalary(salary) {
    if (salary >= 10000) {
        return (salary / 10000).toFixed(1) + "亿";
    }
    return salary + "万";
}


function NativeClose() {
    try {
        Native.close();
    }
    catch (err) { }

}

function NativeJump(action) {
    try {
        Native.jump(action);
    }
    catch (err) { }

}


function NativeJumpDetail(action) {
    var s = '{ "ActionType": "activity", "ActionValue": "' + action + '","Parameters":null }';
    NativeJump(s);

}

function NativeShare(pagecode,detailid) {
    try {
        var s = '{ "pageCode": "' + pagecode + '", "DetailId": "' + detailid + '"}';
        Native.share(s);
    }
    catch (err) { }
 }


function actionsheet(controlobj, options, defaultValue, fnselect) {
    var show = 1;
    if (controlobj == null) {
        show = 0;
    }
    if (controlobj == null || controlobj.control == null) {
        if (options == undefined) {
            return;
        }
        if (options.length == 0) {
            return;
        }
        var m = options[0];
        if (defaultValue != undefined) {
            var index = findElem(options, "value", defaultValue);
            if (index > -1) {
                m = options[index];
            }
        }
        controlobj = new Object();
        controlobj.control = new mui.PopPicker();
        controlobj.control.setData(options);

        controlobj.control.pickers[0].setSelectedValue(m.value);

        controlobj.value = m.value;
        controlobj.text = m.text;
    }

    if (show == 1) {
        controlobj.control.show(function (selectItems) {
            if (controlobj.value == selectItems[0].value) {
                return;
            }
            controlobj.value = selectItems[0].value;
            controlobj.text = selectItems[0].text;
            if (fnselect != undefined) {
                fnselect(selectItems[0]);
            }
        })
    }


    return controlobj;
}


function actionsheetoptions(array, Text, Value) {
    var options = new Array();
    $.each(array, function (index, item) {
        options.push({ value: item[Value], text: item[Text] });
    });
    return options;
}

function GetlocalStorageItem(name, defaultvalue) {
    var o = localStorage.getItem(name);
    if (o == null && defaultvalue != undefined) {
        return defaultvalue;
    }
    return o;
}



var constWord = {
    ActivedGuessRoundId: "ActivedGuessRoundId",
    FootTeamTabId: "FootTeamTabId",
    LocalUserToken: "localusertoken1",
    LocalUserDataPrefix: "localuserdata1_"
}

function GetLocalToken() {
    var token = localStorage.getItem(constWord.LocalUserToken);
    if (token == null || token == undefined || token == "") {
        if (isWeiXin()) {
            var unionid = getUrlParam("unionid");
            if (unionid == null || unionid == undefined || unionid == "") {
                var url = escape(window.location.href);
                url = "http://wx.guditech.com/home/gotourl?url=" + url;
                //alert(url);
                window.location.href = url;
            }
            else {
                token = unionid;
                localStorage.setItem(constWord.LocalUserToken, token);
                return token;
            }
        } else {
            var date = new Date();
            token = date.getFullYear() + '' + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() + Math.random();
            localStorage.setItem(constWord.LocalUserToken, token);
        }        
    }
    return token;
}

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

function changeimg() {
    //设置默认图片
    $("img").each(function () {
        var s = $(this).attr("src");
        if (s == undefined || s == "") {
            $(this).attr("src", "images/blank_img.png");
        }
    });
    $('img').on('error', function () {
        $(this).prop('src', 'img/1.png');
        if (!$(this).hasClass('broken-image')) {
            $(this).prop('src', 'images/blank_img.png').addClass('broken-image');
        }
    });
}


