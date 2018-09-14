$(function () {
    var app = new Vue({
        el: 'body',
        data: {
            scheduleid: 0,
            shareuser: ''
        },
        methods: {
            init: function () {
                var _self = this;
                _self.scheduleid = getUrlParam("ScheduleId");//URL获取期数和分享者标识
                _self.shareuser = getUrlParam("shareuser");
               
            },
            getprize: function () {
                var _self = this;
                var url =  "result_win_get.html";
                url = url + "?ScheduleId=" + _self.scheduleid + "&shareuser=" + _self.shareuser;
                gotourl(url);
            }
        },
        compiled: function () {
            this.init();
        }
    });
});
