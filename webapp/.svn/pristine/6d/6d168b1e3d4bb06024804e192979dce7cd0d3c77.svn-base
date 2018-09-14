$(function () {
    var playerId = getUrlParam("id");
    new Vue({
        el: '#page_playerdetails',
        data: { player: null },
        methods: {
            //获取球员详情
            getPlayerDetails: function () {
                var _self = this;
                callapi("WorldCup/GetPlayerInfo", { playerId: playerId }, "", function (data) {
                    _self.player = data.Data;
                });
            }
        },
        compiled: function () {
            this.getPlayerDetails();
        }
    });
})