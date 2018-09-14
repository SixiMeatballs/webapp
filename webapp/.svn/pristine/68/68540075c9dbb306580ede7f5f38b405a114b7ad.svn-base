$(function () {
    new Vue({
        el: '#page_basketball_team',
        data: {
            id: 0,//球队ID
            teamtype: null,//球队类型（1：国家；2：俱乐部）
            intro: null,//简介
            schedule: null,//赛程
            stat: null,//数据统计
            player: null//球员
        },
        methods: {
            init: function () {
                var _self = this;
                _self.id = getUrlParam("id");
                var type = getUrlParam("teamtype");
                if (type == 1) {
                    _self.teamtype = "国家";
                } else {
                    _self.teamtype = "俱乐部";
                }
                _self.GetTeamIntro();
            },
            //获取球队详情
            GetTeamIntro: function () {
                var _self = this;
                callapi("DataCenter/GetDC_TeamIntroduce", { sourceType: 2, teamId: _self.id }, "", function (data) {
                    _self.intro = data.Data;
                    if (_self.intro != null) {
                        document.title = _self.intro.TeamName + " - 篮球球队详情";
                    }
                });
            },
            //获取球队赛程
            GetTeamSchedule: function () {
                var _self = this;
                if (_self.schedule == null) {
                    callapi("DataCenter/GetDC_TeamSchedule", { sourceType: 2, teamId: _self.id }, "", function (data) {
                        _self.schedule = data.Data;
                    });
                }
            },
            //获取球队统计
            GetTeamStat: function (dataType) {
                //统计类型（0.全部 1.进攻 2.防守 4.常规 8.传球）
                var _self = this;
                callapi("DataCenter/GetDC_TeamStats", { sourceType: 2, teamId: _self.id, dataType: dataType }, "", function (data) {
                    _self.stat = data.Data;
                });
            },
            //获取球队球员
            GetTeamPlayer: function () {
                var _self = this;
                if (_self.player == null) {
                    callapi("DataCenter/GetDC_TeamPlayer", { sourceType: 2, teamId: _self.id }, "", function (data) {
                        _self.player = data.Data;

                        _self.$nextTick(function () {
                            changeimg();
                        });
                    });
                }
            }
        },
        compiled: function () {
            this.init();
        }
    })
});