$(document).ready(function () {
    var pageTimer = {};
    new Vue({
        el: '#actionsheetdemo',
        data: {
            yearlist: null,
            control: null
        },
        methods: {
            init: function () {
                var _self = this;
                _self.id = getUrlParam("id");
            },            
            getYearList: function () {
                var _self = this;
                var d = {playerId: 4372 };
                callapi("DataCenter/GetDC_PlayerGameYear", d, "", function (data) {
                    _self.yearlist = data.Data;
                });
            },
            actionSheetOpen: function () {
                var _self = this;

                var yearoptions = new Array();
                yearoptions.push({ value: 0, text: '全部' });
                //yearoptions.push({ value: 2017, text: '2017' });
                //yearoptions.push({ value: 2018, text: '2018' });
                //yearoptions.push({ value: 2019, text: '2019' });
                yearoptions=yearoptions.concat(actionsheetoptions(_self.yearlist,"Year","Year"));
             
                //_self.control = new Object();
                _self.control = actionsheet(_self.control, yearoptions, 0, function (item) {
                    console.log(item.value);
                    console.log(item.text);
                });
            }

        },
        compiled: function () {
            this.init();
            this.getYearList();
            this.actionSheetOpen();
        }
    })
});

