$(function () {
    var app = new Vue({
        el: 'html',
        data: {
            gamename: 0
        },
        methods: {
            init: function () {
                var _self = this;
                _self.gamename = getUrlParam("gamename");
            }
        },
        compiled: function () {
            this.init();
        }
    });
});
