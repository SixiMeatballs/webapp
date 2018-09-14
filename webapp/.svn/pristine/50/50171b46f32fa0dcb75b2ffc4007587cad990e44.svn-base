$(function () {
    new Vue({
        el: '#page_getmyprize',
        data: {
            id: 0
        },
        methods: {
            init: function () {
                var _self = this;
                _self.id = getUrlParam("id");
            },
            //领取奖品（虚拟/实物）
            receivePrize: function () {
                var _self = this;
                var d = {
                    id: _self.id,
                    province: $("#hiddprov").val(),
                    city: $("#hiddcity").val(),
                    district: $("#hiddarea").val(),
                    address: $("#address").val(),
                    telephone: $("#txtphone").val(),
                    contact: $("#txtname").val()
                };

                if (d.province == "" || d.city == "" || d.district == "" || d.address == "") {
                    MessageAlertNoButton("请填写地址再提交", 2);
                    return;
                }

                callapi("WorldCup/ReceivePrize", d, "", function (data) {
                    gotourl("myprize.html");
                });
            }
        },
        compiled: function () {
            this.init();
        }
    })
});