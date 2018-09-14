$(function () {
    new Vue({
        el: '#couponCenter',
        data: {
            CouponListData: [], //卡券列表
            couponNum: null,//卡券领取百分比
            receiveNum: null,
            receiveAlertShow: false,
            currentCoupon: null, //当前领取的卡券
            currentCouponId: null,//当前卡券id
            phoneNum: null,//手机号
            commonAlert: null,  //通用黑白弹框
            commonAlertShow: false,
            successAlertShow: false,//领取成功弹框
            successAlertShowed: false,//已领取
            userData: {
                phone: null,
                getNum: null,
            },
            buttonState: null,
        },
        created() {
            document.body.removeChild(document.getElementById('Loading'));
        },
        methods: {
            getCouponList: function () {
                var _self = this;
                var d = { promotionType: 2 }
                callapi('/Promotion/GetPromotionCoupon', d, '', function (data) {
                    //  _self.CouponListData = data.Data;
                    var datalist = data.Data;
                    for (var i = 0; i < datalist.length; i++) {
                        var item = datalist[i];
                        item.Received = 0;
                        _self.CouponListData.push(item);
                        // _self.CouponListData[i].Received = 0;
                    }
                    _self.verifyPhone();
                });
            },
            receiveCoupon: function (id) {
                var _self = this;
                //领取弹框展示的当前券
                _self.currentCouponId = id;
                for (var i in _self.CouponListData) {
                    if (_self.CouponListData[i].RefId == id) {
                        _self.currentCoupon = _self.CouponListData[i];
                    }
                }
                _self.receiveAlertShow = true;
            },
            verifyPhone: function () {
                var _self = this;
                var currentId = _self.currentCouponId;
                var phoneNum = _self.phoneNum;
                var d = { refId: currentId, phone: phoneNum };
                
                callapi('/Promotion/ReceiveCoupon', d, '', function (data) {
                    _self.successAlertShow = true;
                    //判断是否领取
                    for (var i in _self.CouponListData) {
                        if (_self.CouponListData[i].RefId == currentId) {
                            _self.CouponListData[i].Received = 1;
                            //Vue.set(_self.CouponListData, i, { Received: 1 });
                            console.log(_self.CouponListData);
                        }
                    }
                  
                }, function (data) {
                    _self.buttonState = data.Message;
                    
                    if (data.Message == '已领取') {

                        for (var i in _self.CouponListData) {
                            if (_self.CouponListData[i].RefId == currentId) {
                                _self.CouponListData[i].Received = 2;
                                Vue.set(_self.CouponListData, i, { Received: 2 });
                            }
                        }

                        _self.receiveAlertShow = false;
                        _self.successAlertShowed = true;
                    }
                    if (data.ErrorCode == 4001 && data.State == 'failed' && data.Message != '已领取') {
                        _self.commonAlert = data.Message;
                        _self.commonAlertShow = true;
                        setTimeout(function () {
                            _self.commonAlertShow = false;
                        }, 1500);
                    }
                })
            },
            handleClose: function () {
                var _self = this;
                _self.receiveAlertShow = false;
                _self.successAlertShow = false;
                _self.successAlertShowed = false;
            },

        },
        filters: {
            formatNum: function (num) {
                return parseFloat(num).toFixed(0);
            }
        },
        compiled: function () {
            var _self = this;
            _self.getCouponList();
            InitOpenApp(
                {
                    ActionType: 'Activity',
                    ActionValue: 'INDEX',
                    Parameters: null
                }
            );
            $(function () {
                var percentNum = document.querySelectorAll('.nums');
                var cricleRight = document.querySelectorAll('.circle-bar-right');
                var cricleLeft = document.querySelectorAll('.circle-bar-left');
                var baseColor = $('.circle-bar').css('background-color');
                for (var i = 0; i < percentNum.length; i++) {
                    if (parseFloat(percentNum[i].innerText) <= 50) {
                        cricleRight[i].style.transform = 'rotate(' + (parseFloat(percentNum[i].innerText) * 3.6) + 'deg)';
                    } else {
                        cricleRight[i].style.transform = 'rotate(0deg)';
                        cricleRight[i].style.backgroundColor = baseColor;
                        cricleLeft[i].style.transform = 'rotate(' + ((parseFloat(percentNum[i].innerText) - 50) * 3.6) + 'deg)';
                    }
                }
            });
        }
    })
});
