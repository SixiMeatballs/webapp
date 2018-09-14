$(document).ready(function () {
    var pageTimer = {};
    new Vue({
        el: '#football_player',
        data: {
            id: 0,//4532
            player: null,
            yearlist: null,
            curyear: 0,
            curyearname: '全部',
            schedulelist: null,
            control: null
        },
        methods: {
            init: function () {
                var _self = this;
                _self.id = getUrlParam("id");
            },
            getPlayer: function () {
                var _self = this;
                var d = { sourceType: 1, playerId: _self.id };
                callapi("DataCenter/GetDC_PlayerIntroduce", d, "", function (data) {
                    _self.player = data.Data;
                    if (_self.player != null) {
                        document.title = _self.player.PlayerName + " - 足球球员详情";
                    }
                });
            },
            getYearList: function () {
                var _self = this;
                var d = { playerId: _self.id };
                callapi("DataCenter/GetDC_PlayerGameYear", d, "", function (data) {
                    _self.yearlist = data.Data;
                });
            },
            getScheduleList: function () {
                var _self = this;
                var d = { playerId: _self.id, year: _self.curyear };
                callapi("DataCenter/GetDC_FootballPlayerStats", d, "", function (data) {
                    _self.schedulelist = data.Data;
                });
            },
            YearSelectOpen: function () {
                _self = this;
                if (_self.control == null) {
                    _self.control = new mui.PopPicker();
                    var yearoptions = new Array();
                    yearoptions.push({ value: 0, text: '全部' });
                    $.each(_self.yearlist, function (index, item) {
                        yearoptions.push({ value: item.Year, text: item.Year });
                    });
                    _self.control.setData(yearoptions);

                }
                _self.control.show(function (selectItems) {
                    if (_self.curyear == selectItems[0].value) {
                        return;
                    }
                    _self.curyear = selectItems[0].value;
                    _self.curyearname = selectItems[0].text;
                    _self.getScheduleList();
                })
            },

        },
        compiled: function () {
            this.init();
            this.getPlayer();
            this.getYearList();
            this.getScheduleList();
        }
    })
});

