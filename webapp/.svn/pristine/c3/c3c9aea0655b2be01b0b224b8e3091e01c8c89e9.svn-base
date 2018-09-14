$(function () {
    var app = new Vue({
        el: '#app',
        data: {
            scheduleid: 0,
            shareuser: 'xxx',
            localuserdata11:  [],//对于每一次助力，记录 分享者、抽奖码、是否已抽奖、是否中奖、是否领奖 {shareuser:'xxxx', code:'xxx',iscj:0,iswin:0,isget:0,initpwd:''}
            userdata: {
                usertoken: null,
                helpcount: 0,  //本期助力次数
                ishelped: 0, //是否助力过当前分享者
                iscj: 0,  //是否已抽奖
                iswin: 0,  //是否抽中
                isget: 0,   //是否已领取抽奖
                code:''   //抽奖码
            },
            errormessage:'',
            ScheduleInfo: null,
            shutdownstatus: 0,     //0:无   1：显示结束倒计时   2： 显示开奖倒计时   3：显示开奖中
            CountDown: null,  //倒计时
            LottoryTime: 0,
            EndTime: 0
        },
        methods: {
            init: function () {
                var _self = this;
                _self.scheduleid = getUrlParam("ScheduleId");//URL获取期数和分享者标识
                _self.shareuser = getUrlParam("shareuser");
                _self.inituserdata();
                //获取本期活动信息
                callapi("Promotion/GetCurrentSchedule_WorldCup", { scheduleId: _self.scheduleid }, "", function (data) {
                    _self.ScheduleInfo = data.Data;

                    _self.$nextTick(function () {
                        if (_self.ScheduleInfo != null) {
                            _self.LottoryTime = _self.ScheduleInfo.LottorySecondCountDown - _self.ScheduleInfo.EndSecondCountDown;
                            _self.EndTime = _self.ScheduleInfo.EndSecondCountDown - _self.ScheduleInfo.StartSecondCountDown;
                            if (_self.ScheduleInfo.StartSecondCountDown > 0) {
                                _self.shutdownstatus = 4;
                                _self.ShowStartCountDown();
                            }
                            else if (_self.ScheduleInfo.EndSecondCountDown > 0) {
                                _self.shutdownstatus = 1;
                                _self.ShowEndCountDown();
                            }
                            else if (_self.ScheduleInfo.LottorySecondCountDown > 0) {
                                _self.shutdownstatus = 2;
                                _self.ShowLottoryCountDown();
                            }
                            else {
                                _self.shutdownstatus = 3;
                            }
                        }
                    });
                });
            },
            inituserdata: function () {
                var _self = this;
                //初始化抽奖助力信息
                _self.userdata.usertoken = GetLocalToken();
                var localuserdata = JSON.parse(localStorage.getItem(constWord.LocalUserDataPrefix + _self.scheduleid));
                if (localuserdata == null) return;
                _self.userdata.helpcount = localuserdata.length;
                var index = findElem(localuserdata, "shareuser", _self.shareuser);
                if (index > -1) {
                    var r = localuserdata[index];
                    _self.userdata.ishelped = 1;
                    _self.userdata.iscj = r.iscj;
                    _self.userdata.iswin = r.iswin;
                    _self.userdata.isget = r.isget;
                    _self.userdata.code = r.code;
                }
            },
            ShowStartCountDown: function () {
                var _self = this;
                var timerStart = setInterval(function () {
                    _self.CountDown = ShowCountDown(_self.ScheduleInfo.StartSecondCountDown);
                    _self.ScheduleInfo.StartSecondCountDown--;
                    if (_self.ScheduleInfo.StartSecondCountDown <= 0) {
                        clearInterval(timerStart);
                        if (_self.shutdownstatus == 4) {
                            _self.shutdownstatus = 1;
                            _self.ShowEndCountDown();
                        }
                    }
                }, 1000);
            },
            ShowEndCountDown: function () {
                var _self = this;
                var timerEnd = setInterval(function () {
                    _self.CountDown = ShowCountDown(_self.ScheduleInfo.EndSecondCountDown);
                    _self.ScheduleInfo.EndSecondCountDown--;
                    if (_self.ScheduleInfo.EndSecondCountDown <= 0) {
                        clearInterval(timerEnd);
                        if (_self.shutdownstatus == 1) {
                            _self.shutdownstatus = 2;
                            _self.ShowLottoryCountDown();
                        }
                    }
                }, 1000);
            },
            ShowLottoryCountDown: function () {
                var _self = this;
                var timerLottery = setInterval(function () {
                    _self.CountDown = ShowCountDown(_self.LottoryTime);
                    _self.LottoryTime--;
                    if (_self.LottoryTime <= 0) {
                        clearInterval(timerLottery);
                        if (_self.shutdownstatus == 2) {
                            _self.shutdownstatus = 3;
                        }
                    }
                }, 1000);
            },
            //助力
            help: function () {
                _self = this;

                var _self = this;
                var d = { RecommandCode: _self.shareuser, helperUserToken: _self.userdata.usertoken, scheduleId: _self.scheduleid };
                callapi("Promotion/CreateLottoryCode_WorldCup", d, "", function (data) {
                    var d1 = data.Data;                    
                    var code = d1.LottoryCode;

                    //shareuser: 'xxxx', code:'xxx', iscj:0, iswin:0, isget:0
                    var localuserdata = JSON.parse(localStorage.getItem(constWord.LocalUserDataPrefix + _self.scheduleid));
                    if (localuserdata == null) {
                        localuserdata = [];
                    };
                    var index = findElem(localuserdata, "shareuser", _self.shareuser);
                    if (index == -1) {
                        //只有在不存在的情况才去添加
                        var m = {};
                        m.shareuser = _self.shareuser;
                        m.code = code;
                        m.iscj = 0;
                        m.iswin = 0;
                        m.isget = 0;
                        m.initpwd = '';
                        localuserdata.push(m);

                        var str = JSON.stringify(localuserdata);
                        localStorage.setItem(constWord.LocalUserDataPrefix + _self.scheduleid, str);
                    }

                    _self.inituserdata();

                    messagebox("boxlottery");

                }, function (data) {
                    _self.errormessage = data.Message;
                    var errorcode = data.ErrorCode;
                    if (errorcode == 2005) {
                        messagebox("boxhelpover");
                    }
                    else if (errorcode == 2006) {
                        messagebox("boxcodeenough");
                    }
                    else {
                        messagebox("boxerror");
                    }
                    
                    });
            },
            //抽奖
            getprize: function () {
                _self = this;

                var _self = this;
                var d = { RecommandCode: _self.shareuser, helperUserToken: _self.userdata.usertoken, scheduleId: _self.scheduleid };
                callapi("Promotion/GrabRedPacket_WorldCup", d, "", function (data) {
                    var d1 = data.Data;

                    var IsLottory = d1.IsLottory;

                    //shareuser: 'xxxx', code:'xxx', iscj:0, iswin:0, isget:0
                    var localuserdata = JSON.parse(localStorage.getItem(constWord.LocalUserDataPrefix + _self.scheduleid));
                    if (localuserdata == null) {
                        localuserdata = [];
                    };
                    var index = findElem(localuserdata, "shareuser", _self.shareuser);
                    if (index > -1) {
                        //只有存在的情况才去添加
                        localuserdata[index].iscj = 1;
                        localuserdata[index].iswin = IsLottory ? 1 : 0;
                        localuserdata[index].isget = 0;

                        var str = JSON.stringify(localuserdata);
                        localStorage.setItem(constWord.LocalUserDataPrefix + _self.scheduleid, str);
                    }

                    _self.inituserdata();

                    //_self.scheduleid = getUrlParam("ScheduleId");//URL获取期数和分享者标识
                    //_self.shareuser = getUrlParam("shareuser");

                    var url = IsLottory ? "result_win.html" : "result_lose.html";
                    url = url + "?ScheduleId=" + _self.scheduleid + "&shareuser=" + _self.shareuser;
                    gotourl(url);

                }, function (data) {
                    _self.errormessage = data.Message;
                    messagebox("boxerror");
                });
            },
            managercache: function () {
                _self = this;
                var url = window.location.host;
                if (url.indexOf("123.206.174.209") == -1) {
                    return;
                }
                localStorage.removeItem(constWord.LocalUserDataPrefix + _self.scheduleid);
                localStorage.removeItem(constWord.LocalUserToken);
                alert("清除缓存成功");
            }
        },
        compiled: function () {
            this.init();
        }
    });
});
