$(document).ready(function () {
    var pageTimer = {};
    new Vue({
        el: '#football_match',
        data: {
            GameId: 0,//4532
            ScheduleId: 0,
            LineupRes: null,
            ScheduleStats: null,
            PlayerStats: null,
            curtype: 0,
            curtypename: '全部',
            control: null,
            controllist: {
                options: null,
                value: null,
                text: null,
                opened: null
            }
        },
        methods: {
            init: function () {
                var _self = this;
                _self.GameId = getUrlParam("GameId");
                _self.ScheduleId = getUrlParam("ScheduleId");
                _self.initControl();


                //?GameId = 23 & ScheduleId=3457
            },
            initControl: function () {
                var _self = this;
               // _self.controllist = new Object();
                var options = new Array();
                options.push({ value: 1, text: '进攻数据' });
                options.push({ value: 2, text: '防守数据' });
                options.push({ value: 4, text: '常规数据' });
                options.push({ value: 8, text: '传球数据' });
                _self.controllist.options = options;
                _self.controllist.value = "1";
                _self.controllist.text = "进攻数据";
                _self.controllist.opened = 0;
            },
            getLineupRes: function () {
                var _self = this;
                var d = { sourceType: 1, gameId: _self.GameId, scheduleId: _self.ScheduleId };
                callapi("DataCenter/GetDC_ScheduleLineup", d, "", function (data) {
                    _self.LineupRes = data.Data;
                });
            },
            getScheduleStats: function () {
                var _self = this;
                var d = { sourceType: 1, gameId: _self.GameId, scheduleId: _self.ScheduleId };
                callapi("DataCenter/GetDC_ScheduleStats", d, "", function (data) {
                    _self.ScheduleStats = data.Data;
                });
            },
            gotoPlayerDetail: function (PlayerId) {
                var url = "football_player.html?id=" + PlayerId;
                gotourl(url);
            },
            getPlayerStats: function (dataType) {
                //数据类型0.全部 1.进攻 2.防守 4.常规 8.传球
                var _self = this;
                var d = { sourceType: 1, gameId: _self.GameId, scheduleId: _self.ScheduleId, dataType: dataType };
                callapi("DataCenter/GetDC_SchedulePlayerStats", d, "", function (data) {
                    _self.PlayerStats = data.Data;
                });
            },
            changeSelect: function (item) {
                var _self = this;
                if (_self.controllist == null) {
                    _self.initControl();
                }
                if (_self.controllist.opened == 0) {
                    _self.controllist.opened = 1;
                    return;
                }
                _self.controllist.opened = 0;
                if (_self.controllist.value == item.value) {
                    return;
                }
                _self.controllist.value = item.value;
                _self.controllist.text = item.text;
                _self.getPlayerStats(item.value);
            },
            TypeSelectOpen: function () {
                var _self = this;
                if (_self.control == null) {
                    _self.control = new mui.PopPicker();
                    var yearoptions = new Array();
                    yearoptions.push({ value: 0, text: '全部' });
                    yearoptions.push({ value: 1, text: '进攻数据' });
                    yearoptions.push({ value: 2, text: '防守数据' });
                    yearoptions.push({ value: 4, text: '常规数据' });
                    yearoptions.push({ value: 8, text: '传球数据' });
                    _self.control.setData(yearoptions);

                }
                _self.control.show(function (selectItems) {
                    if (_self.curtype == selectItems[0].value) {
                        return;
                    }
                    _self.curtype = selectItems[0].value;
                    _self.curtypename = selectItems[0].text;
                    _self.getPlayerStats(_self.curtype);
                })
            }
        },
        compiled: function () {
            this.init();
            this.getLineupRes();
            this.getScheduleStats();
            this.getPlayerStats(0);
        }
    })
});

