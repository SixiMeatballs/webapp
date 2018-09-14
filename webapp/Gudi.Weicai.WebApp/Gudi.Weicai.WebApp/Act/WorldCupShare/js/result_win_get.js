$(function () {
    var app = new Vue({
        el: 'body',
        data: {
            scheduleid: 0,
            shareuser: '',
            imgcodeurl:'',
            errormessage: '',
            CountDown: null,  //倒计时
            SendTime: 0,
            actionCode:'', //行为码
            userdata: {
                usertoken: null,
                helpcount: 0,  //本期助力次数
                ishelped: 0, //是否助力过当前分享者
                iscj: 0,  //是否已抽奖
                iswin: 0,  //是否抽中
                isget: 0,   //是否已领取抽奖
                code: ''   //抽奖码
            }
        },
        methods: {
            init: function () {
                var _self = this;
                _self.scheduleid = getUrlParam("ScheduleId");//URL获取期数和分享者标识
                _self.shareuser = getUrlParam("shareuser");
                
                _self.inituserdata();
            },
            inituserdata: function () {
                var _self = this;

                var param = "?ScheduleId=" + _self.scheduleid + "&shareuser=" + _self.shareuser;
                //初始化抽奖助力信息
                _self.userdata.usertoken = GetLocalToken();
                var localuserdata = JSON.parse(localStorage.getItem(constWord.LocalUserDataPrefix + _self.scheduleid));
                if (localuserdata == null) {
                    gotourl("index.html" + param);
                }
                _self.userdata.helpcount = localuserdata.length;
                var index = findElem(localuserdata, "shareuser", _self.shareuser);
                if (index == -1) {
                    gotourl("index.html" + param);
                }
                if (index > -1) {
                    var r = localuserdata[index];
                    if (r.iscj == 0) {
                        gotourl("index.html" + param);
                    }
                    if (r.iswin == 0) {
                        gotourl("index.html" + param);
                    }
                    if (r.isget == 1) {
                        gotourl("index.html" + param);
                    }
                    _self.userdata.ishelped = 1;
                    _self.userdata.iscj = r.iscj;
                    _self.userdata.iswin = r.iswin;
                    _self.userdata.isget = r.isget;
                    _self.userdata.code = r.code;
                }                
            },
            getimgcode: function () {
                var phone = $("#txtphone").val();
                if (!isPoneAvailable(phone)) {
                    $("#txtphone").val("");
                    $("#txtphone").focus();
                    return;
                }                

                $("#txtimgcode").val("");
                var _self = this;
                var d = { phone: phone, verifyCodeType: 'RECEIVEREDPACKET' };
                callapi("Account/GetPicVerifyCode", d, "", function (data) {
                    _self.imgcodeurl = data.Data;
                    $("#txtimgcode").focus();
                    messagebox("boximgcode");

                }, function (data) {
                    _self.errormessage = data.Message;
                    messagebox("boxerror");
                });
            },
            inputimgcode: function () {
                var _self = this;
                var phone = $("#txtphone").val();
                var imgcode = $("#txtimgcode").val();
                var d = { phone: phone, verifyCodeType: 'RECEIVEREDPACKET', picVerifyCode: imgcode };
                callapi("Account/CheckPicVerifyCode", d, "", function (data) {
                    var d1 = data.Data;
                    if (d1) {
                        //正确
                        $("#boximgcode").css("display", "none");
                        _self.sendphoneverifycode();
                    }
                    else {
                        _self.getimgcode();
                    }

                }, function (data) {
                    _self.errormessage = data.Message;
                    messagebox("boxerror");
                });
            },
            sendphoneverifycode: function () {
                var _self = this;
                var phone = $("#txtphone").val();

                var imgcode = $("#txtimgcode").val();
                var d = { phone: phone, picVerifyCode: imgcode };
                callapi("Promotion/SendReceiveRedPacketVerifyCode_WorldCup", d, "", function (data) {
                    _self.actionCode = data.Data;
                    console.log(_self.actionCode);
                    _self.SendTime = 60;
                    _self.ShowEndCountDown();

                }, function (data) {
                    _self.errormessage = data.Message;
                    messagebox("boxerror");
                });
            },
            ShowEndCountDown: function () {
                var _self = this;
                var timerEnd = setInterval(function () {
                    _self.CountDown = ShowCountDown(_self.SendTime);
                    _self.SendTime--;
                    if (_self.SendTime <= 0) {
                        clearInterval(timerEnd);
                    }
                }, 1000);
            },
            //抽奖
            getprize: function () {
                var _self = this;
                var phone = $("#txtphone").val();
                if (!isPoneAvailable(phone)) {
                    $("#txtphone").val("");
                    $("#txtphone").focus();
                    return;
                }     
                var code = $("#txtcode").val();
                if (code == "") {
                    $("#code").focus();
                    return;
                }
                var d = { phone: phone, verifyCode: code, actionCode: _self.actionCode,RecommandCode: _self.shareuser,helperUserToken: _self.userdata.usertoken,scheduleId: _self.scheduleid };
                
                callapi("Promotion/ReceiveRedPacket_WorldCup", d, "", function (data) {
                    var initpwd = data.Data;

                    var localuserdata = JSON.parse(localStorage.getItem(constWord.LocalUserDataPrefix + _self.scheduleid));
                    if (localuserdata == null) {
                        localuserdata = [];
                    };
                    var index = findElem(localuserdata, "shareuser", _self.shareuser);
                    if (index > -1) {
                        //只有存在的情况才去添加
                        localuserdata[index].initpwd = initpwd;
                        localuserdata[index].isget = 1;

                        var str = JSON.stringify(localuserdata);
                        localStorage.setItem(constWord.LocalUserDataPrefix + _self.scheduleid, str);
                    }

                    var param = "?ScheduleId=" + _self.scheduleid + "&shareuser=" + _self.shareuser;
                    gotourl("result_win_use.html" + param);
                }, function (data) {
                    _self.errormessage = data.Message;
                    messagebox("boxerror");
                });
            }
        },
        compiled: function () {
            this.init();
        }
    });
});
