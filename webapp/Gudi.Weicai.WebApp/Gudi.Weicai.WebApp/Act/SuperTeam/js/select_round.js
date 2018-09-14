$(document).ready(function () {
    var pageTimer = {};
    new Vue({
        el: '#page_createteam',
        data: {
            roundlist: null,
            schedulelist: null,
            activatedround: null,
            CountDown: null
        },
        methods: {
            getRoundList: function () {
                var _self = this;
                callapi("WorldCup/GetRound", "", "", function (data) {
                    _self.roundlist = data.Data;

                    for (j = 0, len = _self.roundlist.length; j < len; j++) {
                        var r = _self.roundlist[j];
                        if (r.Activated) {
                            _self.activatedround = r;
                            _self.getScheduleList();


                            _self.ShowCountDown();
                        }
                    }
                });
            },
            ShowCountDown: function () {
                var _self = this;
                for (var each in pageTimer) {
                    clearInterval(pageTimer[each]);
                }
                var name = "timer" + _self.activatedround.RoundId;
                pageTimer[name] = setInterval(function () {
                    _self.CountDown = ShowCountDown(_self.activatedround.SelingTotalSeconds);
                    _self.activatedround.SelingTotalSeconds--;
                    if (_self.activatedround.SelingTotalSeconds <= 0) {
                        clearInterval(pageTimer[name]);
                    }
                }, 1000);
            },
            changeActivedRound: function (item) {
                var _self = this;
                _self.activatedround = item;
                _self.getScheduleList();
                _self.ShowCountDown();
            },
            getScheduleList: function () {
                var _self = this;

                var d = { roundId: _self.activatedround.RoundId };
                callapi("WorldCup/GetRoundMatch", d, "", function (data) {
                    _self.schedulelist = data.Data;
                })
            },
            writeteamname: function () {
                var s = $("#txtTeamName").val();
                if (s == "") {
                    return;
                }
                var _self = this;
                var url = "select_player.html?roundid=" + _self.activatedround.RoundId+"&teamname="+s;

                gotourl(url)
            },
            nextstep: function () {
                var _self = this;
                if (_self.schedulelist.length ==0) {
                    MessageAlertNoButton("该轮次暂无数据，不能进行下一步",2);                    
                    return;
                }
                var s = $("#select").css("display");
                if (s == "none") {
                    $("#select").css("display", "");
                }
                else {
                    $("#select").css("display","none");
                }
            }

        },
        compiled: function () {
            this.getRoundList();
        }
    })
});

