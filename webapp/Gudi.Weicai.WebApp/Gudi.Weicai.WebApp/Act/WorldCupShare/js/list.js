$(document).ready(function () {
    var pageTimer = {};
    new Vue({
        el: 'body',
        data: {
            ScheduleId:0,
            LottoryPerson: null
        },
        methods: {
            getLottoryPerson: function () {
                var _self = this;
                _self.ScheduleId = getUrlParam("ScheduleId");
                var d = { scheduleId: _self.ScheduleId};
                callapi("Promotion/GetLottoryPerson_WorldCup", d, "", function (data) {
                    _self.LottoryPerson = data.Data;
                });
            }
        },
        compiled: function () {
            this.getLottoryPerson();
        }
    })
});

