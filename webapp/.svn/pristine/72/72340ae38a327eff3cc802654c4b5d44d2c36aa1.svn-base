$(function () {
    new Vue({
        el: '#page_ranking',
        data: {
            roundtype: null,//轮次类型（round：轮次排行，total：总排行）
            roundlist: null,//轮次列表
            currentroundid: null,//当前轮次id（总排行则为0）
            ranklist: null//排名列表
        },
        methods: {
            //获取轮次列表
            getRoundList: function () {
                var _self = this;
                callapi("WorldCup/GetGuessRound", "", "", function (data) {
                    _self.roundtype = 'round';
                    _self.roundlist = data.Data;
                    if (_self.roundlist != null && _self.roundlist.length > 0) {
                        _self.currentroundid = data.Data[0].Id;
                    }
                });
            },
            //获取指定轮次奖品列表
            getRankList: function (roundId) {
                var _self = this;
                if (roundId > 0) {
                    _self.currentroundid = roundId;
                }
                if (_self.currentroundid != null || roundId == 0) {
                    callapi("WorldCup/GetGuessRankInfoList", { roundId: roundId }, "", function (data) {
                        _self.ranklist = data.Data;
                    });
                } else {
                    _self.ranklist = null;
                }
            },
            //切换轮次排行和总排行
            changeRoundType: function (roundType) {
                var _self = this;
                _self.roundtype = roundType;
                if (roundType == 'total') {
                    _self.getRankList(0);
                } else {
                    _self.getRankList(_self.currentroundid);
                }
            }
        },
        compiled: function () {
            this.getRoundList();
            this.getRankList(this.currentroundid);
        }
    })
});