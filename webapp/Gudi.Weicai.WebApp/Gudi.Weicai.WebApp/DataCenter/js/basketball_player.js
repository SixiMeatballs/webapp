$(document).ready(function () {
    var pageTimer = {};
    new Vue({
        el: '#basketball_player',
        data: {
            id: 0,//4532
            player: null,
            statlist: null
        },
        methods: {
            init: function () {
                var _self = this;
                _self.id = getUrlParam("id");
            },
            getPlayer: function () {
                var _self = this;
                var d = { sourceType: 2, playerId: _self.id };
                callapi("DataCenter/GetDC_PlayerIntroduce", d, "", function (data) {
                    _self.player = data.Data;
                    if (_self.player != null) {
                        document.title = _self.player.PlayerName + " - 篮球球员详情";
                    }
                });
            },
            getStatList: function () {
                var _self = this;
                var d = { playerId: _self.id };
                callapi("DataCenter/GetDC_BasketballPlayerStats", d, "", function (data) {
                    _self.statlist = data.Data;
                });
            }

        },
        compiled: function () {
            this.init();
            this.getPlayer();
            this.getStatList();
        }
    })
});

