$(function () {
    new Vue({
        el: '#page_myprize',
        data: {
            prizelist: null
        },
        methods: {
            //获取奖品列表
            getPrizeList: function () {
                var _self = this;
                callapi("WorldCup/GetMyPrize", "", "", function (data) {
                    _self.prizelist = data.Data;
                });
            },
            //领取奖品（虚拟/实物）
            receivePrize: function (id, isvirtual) {
                var _self = this;
                if (isvirtual) {
                    //虚拟奖品，直接发放
                    callapi("WorldCup/ReceivePrize", { id: id }, "", function (data) {
                        //领取成功后，更新领取状态
                        console.log("领取成功！");
                        _self.getPrizeList();
                    });
                } else {
                    //实物奖品，填写收货信息
                    gotourl("getmyprize.html?id=" + id);
                }
            }
        },
        compiled: function () {
            this.getPrizeList();
        }
    })
});