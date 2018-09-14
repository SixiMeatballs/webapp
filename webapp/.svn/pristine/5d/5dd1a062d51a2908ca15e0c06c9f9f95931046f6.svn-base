$(function () {
    new Vue({
        el: '#page_prize',
        data: {
            roundtype: null,//轮次类型（day：日排行，total：总排行）
            roundlist: null,//轮次列表
            currentroundid: null,//当前轮次id（总排行则为0）
            prizelist: null//奖品列表
        },
        methods: {
            //获取轮次列表
            getRoundList: function () {
                var _self = this;
                callapi("WorldCup/GetRound", "", "", function (data) {
                    _self.roundtype = 'day';
                    _self.roundlist = data.Data;
                    if (_self.roundlist != null && _self.roundlist.length > 0) {
                        _self.currentroundid = data.Data[0].RoundId;
                    }
                });
            },
            //获取指定轮次奖品列表
            getPrizeList: function (roundId) {
                var _self = this;
                if (roundId > 0) {
                    _self.currentroundid = roundId;
                }
                if (_self.currentroundid != null || roundId == 0) {
                    callapi("WorldCup/GetWorldCupActPrize", { roundId: roundId }, "", function (data) {
                        _self.prizelist = data.Data;
                    });
                } else {
                    _self.prizelist = null;
                }
            },
            //切换日排行奖品和总排行奖品
            changeRoundType: function (roundType) {
                var _self = this;
                _self.roundtype = roundType;
                if (roundType == 'total') {
                    _self.getPrizeList(0);
                } else {
                    _self.getPrizeList(_self.currentroundid);
                }
            }
        },
        compiled: function () {
            this.getRoundList();
            this.getPrizeList(this.currentroundid);
        }
    })
});