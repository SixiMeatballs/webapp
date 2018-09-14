$(document).ready(function () {
    var pageTimer = {};
    new Vue({
        el: '#basketball_match',
        data: {
            GameId: 0,//4532
            ScheduleId:0,
            LineupRes: null,
            ScheduleStats: null,
            PlayerStats: null
        },
        methods: {
            init: function () {
                var _self = this;
                _self.GameId = getUrlParam("GameId");
                _self.ScheduleId = getUrlParam("ScheduleId");
                //?GameId=10&ScheduleId=750
            },
            getLineupRes: function () {
                var _self = this;
                var d = { sourceType: 2, gameId: _self.GameId, scheduleId: _self.ScheduleId };
                callapi("DataCenter/GetDC_ScheduleLineup", d, "", function (data) {
                    _self.LineupRes = data.Data;
                });
            },
            getScheduleStats: function () {
                var _self = this;
                var d = { sourceType:2, gameId: _self.GameId, scheduleId: _self.ScheduleId };
                callapi("DataCenter/GetDC_ScheduleStats", d, "", function (data) {
                    _self.ScheduleStats = data.Data;
                });
            },
            gotoPlayerDetail: function (PlayerId) {
                var url = "basketball_player.html?id=" + PlayerId;
                gotourl(url);
            },
            getPlayerStats: function (dataType) {
                //数据类型0.全部 1.进攻 2.防守 4.常规 8.传球
                var _self = this;
                var d = { sourceType: 2, gameId: _self.GameId, scheduleId: _self.ScheduleId, dataType: dataType};
                callapi("DataCenter/GetDC_SchedulePlayerStats", d, "", function (data) {
                    _self.PlayerStats = data.Data;
                });
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

