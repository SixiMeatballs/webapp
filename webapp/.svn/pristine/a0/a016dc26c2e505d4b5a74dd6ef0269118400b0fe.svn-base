$(function(){
    new Vue({
        el:'#recharge',
        data:{
            rechargeList:null,
            panelList:null,
            userToken:'15E0CB08-D857-4761-A8AF-887627FF4C9C',
        },
        methods:{
            //获取用户信息
            getRecharge: function(){
                let _self = this;
                // http://123.206.174.209:81/VoucherCenter/GetRechargePage_New?userToken=1&pageCode=&Parameters=&source=android
                let d = {pageCode:'vouchercenter',Parameters:'cd_zc',source:'weixin'}
                callapi('/VoucherCenter/GetRechargePage_New',d,_self.userToken,function(data){
                    _self.rechargeList = data.Data; 
                    console.log(_self.rechargeList);
                    _self.panelList= _self.rechargeList.Model_List
                })
            },
        },
        compiled:function(){
            let _self = this;
            _self.getRecharge();
        }
    })
})