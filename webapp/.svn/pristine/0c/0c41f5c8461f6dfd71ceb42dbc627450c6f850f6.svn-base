$(function () {
    new Vue({
        el: '#page_football_stat',
        data: {
            gameid: 0,//赛事ID
            gamename: null,//赛事名称
            havescore: null,//是否有积分排行
            seasonlist: null,//赛季列表
            currentseason: null,//当前赛季
            scorelist: null,//积分排行
            playerstat: {
                options: null,//球员数据统计项
                currentoptionid: null,//当前选中统计项ID
                currentdatalist: null//当前统计项数据列表
            },
            teamstat: {
                options: null,//球队数据统计项
                currentoptionid: null,//当前选中统计项ID
                currentdatalist: null//当前统计项数据列表
            },
            control: null,
            currentab: null
        },
        methods: {
            init: function () {
                var _self = this;
                _self.gameid = getUrlParam("gameid");
                _self.gamename = getUrlParam("gamename");
                _self.havescore = getUrlParam("havescore");
                _self.GetSeasonList();
                if (_self.havescore == 1) {
                    _self.GetScoreList();
                } else {
                    _self.GetPlayerOptions();
                }
            },
            //获取赛季列表
            GetSeasonList: function () {
                var _self = this;
                callapi("DataCenter/GetDC_SeasonList", { GameId: _self.gameid }, "", function (data) {
                    _self.seasonlist = data.Data;
                    if (_self.seasonlist != null && _self.seasonlist.length > 0) {
                        _self.currentseason = _self.seasonlist[0];
                    }
                });
            },
            //获取积分列表
            GetScoreList: function () {
                var _self = this;
                _self.tab = "rank";
                if (_self.currentseason != null) {
                    callapi("DataCenter/GetDC_GameScoreList", { GameId: _self.gameid, Season: _self.currentseason }, "", function (data) {
                        _self.scorelist = data.Data;
                    });
                }
            },
            //获取球员统计项列表
            GetPlayerOptions: function () {
                var _self = this;
                _self.tab = "player";
                if (_self.playerstat.options == null && _self.currentseason != null) {
                    callapi("DataCenter/GetDC_StatsSetting", { sourceType: 1, StatsType: 1, dataType: 0 }, "", function (data) {
                        _self.playerstat.options = data.Data;
                        _self.playerstat.currentoptionid = _self.playerstat.options[0].StatsId;
                        _self.GetPlayerData(_self.playerstat.currentoptionid);
                        
                        _self.$nextTick(function () {
                           changeimg();
                        });
                    });
                }
                
            },
            //获取球员统计数据列表
            GetPlayerData: function (optionId) {
                var _self = this;
                _self.tab = "player";
                if (_self.currentseason != null) {
                    _self.playerstat.currentoptionid = optionId;
                    callapi("DataCenter/GetDC_StatsOrderPlayer", { GameId: _self.gameid, sourceType: 1, Season: _self.currentseason, StatsId: _self.playerstat.currentoptionid }, "", function (data) {
                        _self.playerstat.currentdatalist = data.Data;
                    });
                }
            },
            //获取球队统计项列表
            GetTeamOptions: function () {
                var _self = this;
                _self.tab = "team";
                if (_self.teamstat.options == null && _self.currentseason != null) {
                    callapi("DataCenter/GetDC_StatsSetting", { sourceType: 1, StatsType: 2, dataType: 0 }, "", function (data) {
                        _self.teamstat.options = data.Data;
                        _self.teamstat.currentoptionid = _self.teamstat.options[0].StatsId;
                        _self.GetTeamData(_self.teamstat.currentoptionid);
                    });
                }
            },
            //获取球队统计数据列表
            GetTeamData: function (optionId) {
                var _self = this;
                _self.tab = "team";
                if (_self.currentseason != null) {
                    _self.teamstat.currentoptionid = optionId;
                    callapi("DataCenter/GetDC_StatsOrderTeam", { GameId: _self.gameid, sourceType: 1, Season: _self.currentseason, StatsId: _self.teamstat.currentoptionid }, "", function (data) {
                        _self.teamstat.currentdatalist = data.Data;
                    });
                }
            },
            //弹出赛季下拉
            SeasonSelectOpen: function () {
                _self = this;
                if (_self.control == null) {
                    _self.control = new mui.PopPicker();
                    var seasonoptions = new Array();
                    $.each(_self.seasonlist, function (index, item) {
                        seasonoptions.push({ value: item, text: item });
                    });
                    _self.control.setData(seasonoptions);
                }
                _self.control.show(function (selectItems) {
                    if (_self.currentseason != selectItems[0].value) {
                        _self.currentseason = selectItems[0].value;//当前选中赛季                        
                        //刷新当前界面（切换赛季时的界面）
                        _self.RefreshData();
                    }
                })
            },
            //刷新数据（切换赛季后）
            RefreshData: function () {
                _self = this;
                if (_self.currentab == "rank") {
                    _self.GetScoreList();
                } else if (_self.currentab == "player") {
                    _self.GetPlayerData();
                } else {
                    _self.GetTeamData();
                }
            }
        },
        compiled: function () {
            this.init();
        }
    })
});