$(function () {
    var app = new Vue({
        el: 'body',
        data: {
            scheduleid: 0,
            shareuser: '',
            userdata: {
                usertoken: null,
                helpcount: 0,  //本期助力次数
                ishelped: 0, //是否助力过当前分享者
                iscj: 0,  //是否已抽奖
                iswin: 0,  //是否抽中
                isget: 0,   //是否已领取抽奖
                code: '',   //抽奖码
                initpwd:''
            }
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

                var param = "?ScheduleId=" + _self.scheduleid + "&shareuser=" + _self.shareuser;
                //初始化抽奖助力信息
                _self.userdata.usertoken = GetLocalToken();
                var localuserdata = JSON.parse(localStorage.getItem(constWord.LocalUserDataPrefix + _self.scheduleid));
                if (localuserdata == null) {
                    gotourl("index.html" + param);
                }
                _self.userdata.helpcount = localuserdata.length;
                var index = findElem(localuserdata, "shareuser", _self.shareuser);
                if (index == -1) {
                    gotourl("index.html" + param);
                }
                if (index > -1) {
                    var r = localuserdata[index];
                    if (r.iscj == 0) {
                        gotourl("index.html" + param);
                    }
                    if (r.iswin == 0) {
                        gotourl("index.html" + param);
                    }
                    if (r.isget == 0) {
                        gotourl("index.html" + param);
                    }
                    _self.userdata.ishelped = 1;
                    _self.userdata.iscj = r.iscj;
                    _self.userdata.iswin = r.iswin;
                    _self.userdata.isget = r.isget;
                    _self.userdata.code = r.code;
                    _self.userdata.initpwd = r.initpwd;
                }
            },
            copy: function () {
                var _self = this;
                const input = document.createElement('input');
                    document.body.appendChild(input);
                    input.setAttribute('value', _self.userdata.initpwd);
                    input.select();
                    if (document.execCommand('copy')) {
                            document.execCommand('copy');
                            console.log('复制成功');
                    }
                 document.body.removeChild(input);
            }
        },
        compiled: function () {
            this.init();
        }
    });
});
