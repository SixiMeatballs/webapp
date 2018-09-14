$(function () {
    var app = new Vue({
        el: '#app',
        data: {
            scheduleid: 0,
            shareuser: 'xxx',
            cachelist: [],
            usertoken:''
        },
        methods: {
            init: function () {
                var _self = this;
                _self.scheduleid = getUrlParam("ScheduleId");//URL获取期数和分享者标识
                _self.shareuser = getUrlParam("shareuser");
                _self.inituserdata();               
            },
            inituserdata: function () {
                var _self = this;
                //初始化抽奖助力信息
                _self.userdata.usertoken = GetLocalToken();
                _self.cachelist = JSON.parse(localStorage.getItem(constWord.LocalUserDataPrefix + _self.scheduleid));
                //if (localuserdata == null) return;
                //_self.userdata.helpcount = localuserdata.length;
                //var index = findElem(localuserdata, "shareuser", _self.shareuser);
                //if (index > -1) {
                //    var r = localuserdata[index];
                //    _self.userdata.ishelped = 1;
                //    _self.userdata.iscj = r.iscj;
                //    _self.userdata.iswin = r.iswin;
                //    _self.userdata.isget = r.isget;
                //    _self.userdata.code = r.code;
                //}
            }
        },
        compiled: function () {
            this.init();
        }
    });
});
