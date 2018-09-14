$(function () {
    var app = new Vue({
        el: 'body',
        data: {
            roomindex: 0
        },
        methods: {
            init: function () {
                var _self = this;
                _self.roomindex = getUrlParam("roomindex");
            },
            copy: function () {
                var _self = this;
                const input = document.createElement('input');
                document.body.appendChild(input);
                input.setAttribute('value', _self.roomindex);
                input.select();
                if (document.execCommand('copy')) {
                    document.execCommand('copy');
                    //console.log('复制成功');
                    MessageAlertNoButton("复制成功", 4);
                }
                document.body.removeChild(input);
            }
        },
        compiled: function () {
            this.init();
        }
    });
});
