$(document).ready(function () {
    var pageTimer = {};
    new Vue({
        el: 'body',
        data: {
            ScheduleInfo: null,
            LottoryCode: null,
            shutdownstatus: 0,     //0:无   1：显示结束倒计时   2： 显示开奖倒计时   3：显示开奖中  4:显示开始倒计时
            CountDown: null,  //倒计时
            LottoryTime: 0,
            EndTime: 0,
            IsBandPhone: false,
            errormessage:''
        },
        methods: {
            getScheduleInfo: function () {
                var _self = this;
                callapi("Promotion/GetCurrentSchedule_WorldCup", "", "", function (data) {
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

                            _self.GetLottoryCodelist();
                        }
                    });
                });
            },     
            ShowStartCountDown: function () {
                var _self = this;
                var timerStart = setInterval(function () {
                    _self.CountDown = ShowCountDown(_self.ScheduleInfo.StartSecondCountDown);
                    _self.ScheduleInfo.StartSecondCountDown--;
                    if (_self.ScheduleInfo.StartSecondCountDown <= 0) {
                        clearInterval(timerStart);
                        if (_self.shutdownstatus == 4) {
                            _self.shutdownstatus =1;
                            _self.ShowEndCountDown();
                        }
                    }
                }, 1000);
            },
            ShowEndCountDown: function () {
                var _self = this;
                var timerEnd = setInterval(function () {
                    _self.CountDown = ShowCountDown(_self.EndTime);
                    _self.EndTime--;
                    if (_self.EndTime <= 0) {
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
            GetLottoryCodelist: function () {
                var _self = this;
                var d = { scheduleId: _self.ScheduleInfo.ScheduleId };
                callapi("Promotion/GetMyLottoryCode_WorldCup", d, "", function (data) {
                    _self.LottoryCode = data.Data;

                    _self.$nextTick(function () {
                        changeimg();
                        _self.IsBandPhone = _self.LottoryCode.IsBandPhone;
                    });
                });
            },
            Share: function () {
                var _self = this;
                //if (_self.shutdownstatus != 1) {
                //    return;
                //}
                if (!_self.IsBandPhone) {
                    messagebox("boxbindphone");
                    return;
                }
                var scheduleId = _self.ScheduleInfo.ScheduleId;
                var pagecode = "worldcup_actived";
                NativeShare(pagecode, scheduleId);
                
            }
        },
        compiled: function () {
            this.getScheduleInfo();
        }
    })
});

