$(document).ready(function () {
    var pageTimer = {};
    new Vue({
        el: 'body',
        data: {
            LottoryNotice: null,
            shutdownstatus: 0,     //0:无   1：显示结束倒计时   2： 显示开奖倒计时   3：显示开奖中
            CountDown: null,  //倒计时
            LottoryTime:0
        },
        methods: {
            getScheduleInfo: function () {
                var _self = this;
                callapi("Promotion/GetLottoryNotice_WorldCup", "", "", function (data) {
                    _self.LottoryNotice = data.Data;

                    _self.$nextTick(function () {
                        if (_self.LottoryNotice != null && _self.LottoryNotice.ScheduleInfo != null) {
                            if (_self.LottoryNotice.ScheduleInfo.Status == 0) {
                                _self.LottoryTime = _self.LottoryNotice.ScheduleInfo.LottorySecondCountDown - _self.LottoryNotice.ScheduleInfo.EndSecondCountDown;
                                if (_self.LottoryNotice.ScheduleInfo.EndSecondCountDown > 0) {
                                    _self.shutdownstatus = 1;
                                    _self.ShowEndCountDown();
                                }
                                else if (_self.LottoryNotice.ScheduleInfo.LottorySecondCountDown > 0) {
                                    _self.shutdownstatus = 2;
                                    _self.ShowLottoryCountDown();
                                }
                                else {
                                    _self.shutdownstatus = 3;
                                }
                            }
                            
                        }
                    });
                });
            },            
            ShowEndCountDown: function () {
                var _self = this;
                var timerEnd = setInterval(function () {
                    _self.CountDown = ShowCountDown(_self.LottoryNotice.ScheduleInfo.EndSecondCountDown);
                    _self.LottoryNotice.ScheduleInfo.EndSecondCountDown--;
                    if (_self.LottoryNotice.ScheduleInfo.EndSecondCountDown <= 0) {
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
            }
        },
        compiled: function () {
            this.getScheduleInfo();
        }
    })
});

