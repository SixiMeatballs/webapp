$(function () {
    var pageTimer = {};
    new Vue({
        el: '#shopMall',
        data: {
            shopList: null,
            recommendList: [],
            countDownList: [],
            CountDown: null,
            CountDowns: null,
            resultList:[],
        },
        created() {
            document.body.removeChild(document.getElementById('Loading'));
        },
        methods: {
            getShopList: function () {
                var _self = this;
                var d = { tagId: 0, keyword: '', pageCount: 5000, lastOrderindex: 0, lastModifyTime: '', promotion: 'promotionA', };
                callapi('/mall/GetGoodsList', d, '', function (data) {
                    _self.shopList = data.Data;
                    _self.countDownList = [];
                    for (var i = 0; i < _self.shopList.length; i++) {

                        var r = _self.shopList[i];

                        var m = {};
                        m.GoodsId = r.GoodsId;
                        m.StartBuyCountDownSecond = r.StartBuyCountDownSecond;
                        m.EndBuyCountDownSecond = r.EndBuyCountDownSecond - r.StartBuyCountDownSecond;
                        if (m.EndBuyCountDownSecond < 0) {
                            m.EndBuyCountDownSecond = 0;
                        }
                        m.time = {};
                        _self.countDownList.push(m);

                    }
                    _self.ShowCountDown();
                    //Statue
                    //1未开始;2进行中;3已结束;4已卖完;

                })
            },
            getRecommend: function () {
                var _self = this;
                var d = { tagId: 0, keyword: '', pageCount: 5000, lastOrderindex: 0, lastModifyTime: '', promotion: 'promotionB', };
                callapi('/mall/GetGoodsList', d, '', function (data) {
                    var ranNum = 4;
                    if (data.Data.length < ranNum) {
                        ranNum = data.Data.length;
                    }
                    for (var i = 0; i < ranNum; i++) {
                        var ran = Math.floor(Math.random() * (data.Data.length - i));
                        _self.resultList.push(data.Data[ran]);
                        data.Data[ran] = data.Data[data.Data.length - i - 1];
                    };
                })
            },
            ShowCountDown: function () {
                var _self = this;
                for (var each in pageTimer) {
                    clearInterval(pageTimer[each]);
                }
                

                var name = "timer";
                pageTimer[name] = setInterval(function () {
                    for (var i = 0; i < _self.countDownList.length; i++) {
                        if (_self.countDownList[i].StartBuyCountDownSecond > 0) {
                            _self.countDownList[i].time = ShowCountDown(_self.countDownList[i].StartBuyCountDownSecond);
                            _self.countDownList[i].StartBuyCountDownSecond--;
                        }
                        else if (_self.countDownList[i].EndBuyCountDownSecond > 0) {
                            _self.countDownList[i].time = ShowCountDown(_self.countDownList[i].EndBuyCountDownSecond);
                            _self.countDownList[i].EndBuyCountDownSecond--;
                        }
                        else {
                            _self.countDownList[i].time = ShowCountDown(0);
                        }
                        //else {
                        //    clearInterval(pageTimer[name]);
                        //}
                        
                    }
                }, 1000);

        },
    },
        compiled: function () {
            var _self = this;
            _self.getShopList();
            _self.getRecommend();
        },
        
    })
});




