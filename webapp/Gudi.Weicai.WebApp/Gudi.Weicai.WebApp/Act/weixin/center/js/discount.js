$(function () {
    new Vue({
        el: '#beans',
        data: {
            beansNum: null,
            historyList: null,
            userToken: '15E0CB08-D857-4761-A8AF-887627FF4C9C',
        },
        methods: {
            //获取用户信息
            getBeans: function () {
                let _self = this;
                let d = {
                    starttime: 0,
                    endtime: 0,
                    timetype: '',
                    moneytype: 'gold',
                    pageCount: 30
                }
                callapi('/Account/GetMoneyDeatils', d, _self.userToken, function (data) {
                    _self.historyList = data.Data;
                })
            },
        },
        compiled: function () {
            let _self = this;
            _self.beansNum = getUrlParam('id');
            _self.getBeans();
        }
    })
})