$(function () {
    new Vue({
        el: '#page_basketball_stat',
        data: {
            gameid: 0,//赛事ID
            gamename: null,//赛事名称
            seasonlist: null,//赛季列表
            currentseason: null,//当前赛季
            ranklist: null,//球队排行
            playerstat: null
        },
        methods: {
            init: function () {
                var _self = this;
                _self.gameid = getUrlParam("gameid");
                _self.gamename = getUrlParam("gamename");
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
            //获取排行列表
            GetRankList: function () {
                var _self = this;
                if (_self.ranklist == null) {
                    callapi("DataCenter/GetDC_BasketballRank", { GameId: _self.gameid, Season: _self.currentseason }, "", function (data) {
                        _self.ranklist = data.Data;
                    });
                }
            },
            //获取球员数据排行
            GetPlayerData: function () {
                var _self = this;
                if (_self.playerstat == null) {
                    callapi("DataCenter/GetDC_StatsOrderPlayer2", { GameId: _self.gameid, sourceType: 2, Season: _self.currentseason }, "", function (data) {
                        _self.playerstat = data.Data;
                    });
                }
            },
            //展开球员数据排行列表
            OpenList: function (optionId) {
                $("li[tag='listitem_" + optionId + "']").show();
                $("div[tag='listheader_" + optionId + "']").show();
                $("div[tag='listfooter_" + optionId + "']").hide();
                mockscroll();
            },
            //收起球员数据排行列表
            CloseList: function (optionId) {
                $("li[tag='listitem_" + optionId + "']:gt(4)").hide();
                $("div[tag='listheader_" + optionId + "']").hide();
                $("div[tag='listfooter_" + optionId + "']").show();
                mockscroll();
            }
        },
        compiled: function () {
            this.init();
            this.GetSeasonList();
            this.GetRankList();
        }
    })
});