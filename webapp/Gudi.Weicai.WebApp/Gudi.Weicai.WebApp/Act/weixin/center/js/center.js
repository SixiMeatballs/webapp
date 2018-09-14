$(function(){
    new Vue({
        el:'#center',
        data:{
            userInfo:null,
            userToken:'15E0CB08-D857-4761-A8AF-887627FF4C9C',
        },
        methods:{
            //获取用户信息
            getUserInfo: function(){
                let _self = this;
                callapi('/Account/GetAccountSummary','',_self.userToken,function(data){
                    _self.userInfo = data.Data; 
                })
            },
        },
        compiled:function(){
            let _self = this;
            _self.getUserInfo();
        }
    })
})